// app/lab/4-2-routing/users/[name]/page.tsx
interface UserPageProps {
  params: Promise<{ name: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { name } = await params;
  return <h1 className="p-8 text-2xl">안녕하세요, {name}</h1>;
}