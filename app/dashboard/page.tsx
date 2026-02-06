import TaskList from "@/components/task-list";

export default async function DashboardPage() {

  const tasks = [
    {
      id: "1",
      title: "Design dashboard layout",
      status: "in_progress" as const,
      dueDate: "2026-01-15",
    },
    {
      id: "2",
      title: "Implement authentication",
      status: "todo" as const,
      dueDate: "2026-01-20",
    },
    {
      id: "3",
      title: "Setup database schema",
      status: "done" as const,
      dueDate: "2026-01-10",
    },
    {
      id: "4",
      title: "Create API endpoints",
      status: "todo" as const,
      dueDate: "2026-01-25",
    },
    {
      id: "5",
      title: "Write unit tests",
      status: "todo" as const,
      dueDate: "2026-02-01",
    },
  ];

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm">
          Your current tasks
        </p>
      </header>

      <TaskList tasks={tasks} />
    </main>
  );
}
