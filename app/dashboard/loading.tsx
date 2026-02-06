export default function Loading() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

// Temporary loading component for dashboard page