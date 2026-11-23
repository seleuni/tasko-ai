// app/lab/4-2-routing/search/page.tsx
interface SearchPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { status, page } = await searchParams;
  return (
    <div className="p-8">
      <p>status: {status ?? "(없음)"}</p>
      <p>page: {page ?? "(없음)"}</p>
    </div>
  );
}