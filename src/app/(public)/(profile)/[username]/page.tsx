import { notFound } from 'next/navigation';

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/users/${username}`);

  if (!response.ok) return notFound();
  const user = await response.json();

  if (!user) return notFound();

  return (
    <div>
      <h1>Usuário: {user.username}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
