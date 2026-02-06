import { Task } from "@/types/task";

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

      <span
        className={`px-3 py-1 rounded-full text-xs font-medium`}
      >
        {task.status}
      </span>
    </div>
  );
}
