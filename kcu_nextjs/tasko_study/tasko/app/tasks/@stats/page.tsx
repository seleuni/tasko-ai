// app/tasks/@stats/page.tsx
import { getStatusCounts } from "@/lib/data";
import { STATUS_LABEL, TASK_STATUSES } from "@/lib/types";

export default async function StatsPage() {
  const counts = await getStatusCounts();

  return (
    <div className="mb-8 grid grid-cols-3 gap-4">
      {TASK_STATUSES.map((status) => (
        <div key={status} className="rounded-xl bg-white p-4 text-center shadow-sm">
          <p className="text-sm text-gray-500">{STATUS_LABEL[status]}</p>
          <p className="text-2xl font-bold">{counts[status]}</p>
        </div>
      ))}
    </div>
  );
}