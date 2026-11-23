// components/CommentsSkeleton.tsx
export default function CommentsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-16 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-16 animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
}