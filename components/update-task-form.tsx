"use client";

import { updateTaskStatus } from "@/server/actions";
import { UpdateTaskRequest } from "@/types/task";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export default function UpdateTaskForm ({ id, currentStatus }: Readonly<UpdateTaskRequest>) {
  const initialState = {
    isSuccess: false,
    message: "",
    data: undefined,
  };

  const [state, formAction] = useActionState(updateTaskStatus, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <StatusSelect currentStatus={currentStatus} isSuccess={state.isSuccess} />
    </form>
  );
}

function StatusSelect({
  currentStatus,
  isSuccess,
}: Readonly<{
  currentStatus: "todo" | "in_progress" | "done";
  isSuccess: boolean;
}>) {
  const { pending } = useFormStatus();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const statusOptions = [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as "todo" | "in_progress" | "done");
    e.currentTarget.form?.requestSubmit();
  };

  return (
    <select
      name="status"
      value={selectedStatus}
      onChange={handleChange}
      disabled={pending}
      className={`px-2 py-1 rounded text-xs font-medium border transition-colors text-white`}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {pending ? "Updating..." : option.label}
        </option>
      ))}
    </select>
  );
}
