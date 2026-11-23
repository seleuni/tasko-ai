// components/TaskListSkeleton.tsx
export default function TaskListSkeleton() {
  const items = [1, 2, 3, 4, 5, 6];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 h-6 w-16 rounded-full bg-gray-200" />
          <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
          <div className="mb-4 h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-1/3 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}