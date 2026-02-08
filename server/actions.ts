"use server";

import { StateType } from "@/types/task";
import { revalidatePath } from "next/cache";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`;

export async function createTask(prevState: StateType, data: FormData) {
  const title = data.get("title") as string;
  const status = data.get("status") as "todo" | "in_progress" | "done";
  const dueDate = data.get("dueDate") as string;

  console.log("Creating task:", { title, status, dueDate });

  // Uploading the file beforehand
  const file = data.get("attachment");
  if (!file || !(file instanceof File)) {
    throw new Error("No attachment file provided");
  }

  // 2) Upload to UploadThing backend (localhost:4000/api/uploadthing)
  const uploadFormData = new FormData();
  uploadFormData.append("file", file);

  const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploadthing`, {
    method: "POST",
    body: uploadFormData,
  });

  if (!uploadRes.ok) {
    throw new Error("Upload failed");
  }

  const uploaded = await uploadRes.json();
  // `uploaded` is typically an array; take the first result
  console.log("Upload response:", uploaded);

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
        attachmentUrl: uploaded.file.url,
        attachmentKey: uploaded.file.key,
      }),
  });

  revalidatePath("/dashboard");

  if (!response.status || response.status !== 201) {
    return { isSuccess: false, message: "Failed to create task" };
  } else {
    return {
      isSuccess: true,
      message: "Task created successfully",
      data: response.body,
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
      data: response.body,
    };
  }
}
