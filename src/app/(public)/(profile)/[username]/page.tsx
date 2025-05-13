import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Link {
  id: string
  title: string
  url: string
  icon: string
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/users/${username}`);

  if (!response.ok) return notFound();
  const { user, links } = await response.json();

  if (!user) return notFound();

  return (
    <div>
      <div className="max-w-sm mx-auto m-10 bg-white rounded-2xl shadow-md p-6 text-center space-y-4">
        <Image
          src={user.avatar_url}
          alt="Avatar"
          width={24}
          height={24}
          className="w-24 h-24 mx-auto rounded-full border"
        />

        <h2 className="text-2xl text-gray-500 font-semibold">{user.username}</h2>
        <p className="text-gray-500">{user.bio}</p>

        <div className="flex justify-center gap-2">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">PC</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">PS5</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Xbox</span>
        </div>

        <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          {links.map((link: Link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
            >
              <img
                src={`https://cdn.simpleicons.org/${link.icon}`}
                alt={link.icon}
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">{link.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
