"use server";

import { StateType } from "@/types/task";
import { revalidatePath } from "next/cache";
import TaskMarkedDoneEmail from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`;

export async function createTask(prevState: StateType, data: FormData) {
  const title = data.get("title") as string;
  const status = data.get("status") as "todo" | "in_progress" | "done";
  const dueDate = data.get("dueDate") as string;

  console.log("Creating task:", { title, status, dueDate });

  // Upload file if provided (optional)
  const file = data.get("attachment");
  let attachmentUrl: string | undefined;
  let attachmentKey: string | undefined;

  if (file && file instanceof File) {
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploadthing`,
        {
          method: "POST",
          body: uploadFormData,
        },
      );

      if (uploadRes.ok) {
        const uploaded = await uploadRes.json();
        console.log("Upload response:", uploaded);
        attachmentUrl = uploaded.file.url;
        attachmentKey = uploaded.file.key;
      } else {
        console.error("Upload failed with status:", uploadRes.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  // Sending the request
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      status,
      dueDate,
      ...(attachmentUrl && { attachmentUrl }),
      ...(attachmentKey && { attachmentKey }),
    }),
  });

  revalidatePath("/dashboard");

  if (!response.status || response.status !== 201) {
    return { isSuccess: false, message: "Failed to create task" };
  } else {
    return {
      isSuccess: true,
      message: "Task created successfully",
    };
  }
}

export async function deleteTask(prevState: StateType, data: FormData) {
  const id = data.get("id") as string;

  console.log("Deleting task:", { id });

  // Sending the request
  const response = await fetch(BASE_URL + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  revalidatePath("/dashboard");

  if (!response.status || response.status !== 200) {
    return { isSuccess: false, message: "Failed to delete task" };
  } else {
    return {
      isSuccess: true,
      message: "Task deleted successfully",
    };
  }
}
export async function updateTaskStatus(prevState: StateType, data: FormData) {
  const id = data.get("id") as string;
  const status = data.get("status") as "todo" | "in_progress" | "done";

  console.log("Updating task:", { id, status });

  const response = await fetch(BASE_URL + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok || response.status !== 200) {
    revalidatePath("/dashboard");
    return { isSuccess: false, message: "Failed to update task" };
  }

  const updatedTask = await response.json();

  // Send mail if task is marked as done
  try {
    if (status === "done") {
      const taskTitle = updatedTask?.title ?? "Untitled Task";
      await sendMail(taskTitle);
    }
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }

  revalidatePath("/dashboard");

  return {
    isSuccess: true,
    message: "Task updated successfully",
    data: updatedTask,
  };
}

async function sendMail(taskName: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "nipunbathiya1256@gmail.com",
      subject: `Task marked done: ${taskName}`,
      react: TaskMarkedDoneEmail({ taskName }),
    });

    return data;

  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
}