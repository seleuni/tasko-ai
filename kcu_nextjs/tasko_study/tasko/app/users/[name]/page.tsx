interface UserPageProps {
  params: Promise<{ name: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { name } = await params;
  return <h1>안녕하세요, {name}님</h1>;
}
