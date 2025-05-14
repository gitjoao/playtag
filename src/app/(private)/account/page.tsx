import { notFound } from 'next/navigation';

export default async function Account() {
  const id = '0de7c8a9-675b-4f3c-a9f0-6fb0ac1677cc';
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/users/by-id/${id}`);

  
  const user = await response.json()
  console.log(user)

  if (!response.ok) return notFound();
  return (
    <div>
      <h1>Meu perfil</h1>
    </div>
  );
}
