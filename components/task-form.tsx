"use client";

import { createTask } from "@/server/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function TaskForm() {
  const initialState = {
    isSuccess: false,
    message: "",
    data: undefined,
  };

  const [state, formAction] = useActionState(createTask, initialState);

  return (
    <form
      action={formAction}
      className="bg-gray-200/10 p-6 rounded-lg shadow-md mb-6"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-200"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter task title"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-200"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          className="mt-1 p-2 text-gray-200 bg-gray-800 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="todo" className="bg-gray-800 text-gray-200">
            To Do
          </option>
          <option value="in_progress" className="bg-gray-800 text-gray-200">
            In Progress
          </option>
          <option value="done" className="bg-gray-800 text-gray-200">
            Done
          </option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-200"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="attachment" className="block text-sm font-medium text-gray-200">
          Upload File
        </label>
        <div className="mt-1 flex items-center space-x-2">
          <input
            id="attachment"
            name="attachment"
            type="file"
            className="hidden"
            onChange={(e) => {
              const nameEl = document.getElementById("attachment-name");
              if (nameEl) nameEl.textContent = e.currentTarget.files?.[0]?.name ?? "No file chosen";
            }}
          />
          <button
            type="button"
            onClick={() => (document.getElementById("attachment") as HTMLInputElement | null)?.click()}
            className="px-3 py-2 bg-gray-700 text-white rounded-md"
          >
            Choose File
          </button>
          <span id="attachment-name" className="text-sm text-gray-300">
            No file chosen
          </span>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-all ${
        pending
          ? "bg-gray-600 cursor-not-allowed opacity-75"
          : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      }`}
    >
      {pending ? "Creating..." : "Create Task"}
    </button>
  );
}
