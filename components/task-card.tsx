import { Task } from "@/types/task";
import DeleteTaskForm from "./delete-task-form";
import UpdateTaskForm from "./update-task-form";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="flex items-center justify-between border border-gray-200/10 rounded-lg p-4 bg-gray-300/10">
      <div>
        <h3 className="font-medium">{task.title}</h3>
        {task.dueDate && (
          <p className="text-sm">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <UpdateTaskForm id={task.id} currentStatus={task.status} />
      <div className="flex flex-col gap-2">
        <DeleteTaskForm id={task.id} />
        {task.attachmentUrl && (
          <a href={task.attachmentUrl} target="_blank">
            <button type="button" className="bg-blue-500 text-white p-2 rounded hover:cursor-pointer">OPEN FILE</button>
          </a>
        )}
      </div>
    </div>
  );
}
