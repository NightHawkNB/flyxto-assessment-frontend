import TaskCard from "@/components/task-card";
import TaskForm from "@/components/task-form";
import { Task } from "@/types/task";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DashboardPage() {
  const tasks = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Failed to fetch tasks:", err);
      return [];
    });

  return (
    <Suspense fallback={<Loading />}>
      <main className="p-6 max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>

        <TaskForm />

        <h2 className="text-2xl font-semibold">List of Tasks</h2>
        <p className="text-sm mb-2">Your current tasks: {tasks.length} tasks</p>

        <section className="grid gap-4">
          {tasks.length === 0 ? (
            <p className="text-sm">No tasks yet.</p>
          ) : (
            tasks.map((task: Task) => <TaskCard key={task.id} task={task} />)
          )}
        </section>
      </main>
    </Suspense>
  );
}
