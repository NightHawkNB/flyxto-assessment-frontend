import TaskCard from "./task-card";
import { Task } from "@/types/task";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  if (!tasks.length) {
    return (
      <p className="text-sm">
        No tasks yet.
      </p>
    );
  }

  return (
    <section className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}
