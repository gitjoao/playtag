import { notFound } from 'next/navigation';
import LinkEditor from './link-client';

export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  user_id: string;
}

export default async function Link({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/link/${id}`);

  if (!response.ok) return notFound();

  const link: Link = await response.json();

  if (!link) return notFound();

  return <LinkEditor link={link} />;
}
