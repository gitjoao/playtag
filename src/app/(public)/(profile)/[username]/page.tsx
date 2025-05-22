import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ShareButton } from './shareButton';

export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/users/${username}`, { cache: 'force-cache' });

  if (!response.ok) return notFound();
  const { user, links } = await response.json();

  if (!user) return notFound();

  return (
    <div
      className="container d-flex flex-column align-items-center py-5"
      style={{ minHeight: '500px' }}
    >
      <div className="text-center mb-2">
        <Image
          src={user.avatar_url}
          alt="Avatar"
          width={80}
          height={80}
          className="rounded-circle"
        />
      </div>

      <div className="text-center mb-4">
        <span className="fw-bold">@{user.username}</span>
      </div>

      <div className="w-100 d-flex flex-column align-items-center gap-3">
        {links.map((link: Link) => (
          <a
            key={link.id}
            href={link.url}
            className="text-decoration-none text-dark w-100"
            style={{ maxWidth: '500px' }}
            target="_blank"
          >
            <div
              className="bg-white rounded-pill shadow px-4 py-3 d-flex justify-content-between align-items-center w-100"
              style={{ maxWidth: '500px' }}
            >
              {/* <Image
              src={user.avatar_url}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-circle me-3"
            /> */}
              <img
                src={`https://cdn.simpleicons.org/${link.icon}`}
                alt={link.icon}
                className=""
                height={32}
                width={32}
              />
              <span className="text-center flex-grow-1">{link.title}</span>
              <ShareButton link={link.url} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
