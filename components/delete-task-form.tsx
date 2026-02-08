"use client";

import { deleteTask } from "@/server/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function DeleteTaskForm({ id }: { id: string }) {
  const initialState = {
    isSuccess: false,
    message: "",
    data: undefined,
  };

  const [state, formAction] = useActionState(deleteTask, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-red-500 hover:text-red-700 focus:outline-none"
      aria-disabled={pending}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
