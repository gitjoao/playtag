'use client';

import { Pencil, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { LinkModal } from './linkModal';

export type Link = {
  id: string;
  url: string;
  icon: string;
  title: string;
  user_id: string
};

type User = {
  id: string;
  username: string;
  avatar_url: string;
  bio: string;
  links: Link[];
};

export function AccountClient({ user }: { user: User }) {
  const [links, setLinks] = useState(user.links);

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditingLink(null);
    setModalOpen(true);
  };

  const handleSave = (link: Link) => {

    const updatedLink: Link = {
        ...link,
        id: link.id ?? crypto.randomUUID(),
        user_id: user.id
      }

    if (link.id) {
      // Editando
      console.log('Editando', updatedLink)
    } else {
      // Criando
      console.log('Criando', updatedLink)
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = confirm('Deseja realmente excluir este link?');
    if (confirmed) {
      setLinks((prev) => prev.filter((link) => link.id !== id));
      // opcional: fetch para deletar no backend
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Image
            src={user.avatar_url}
            alt={user.username}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Seus links</h2>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleNew}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <Plus size={18} /> Novo Link
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Ícone</th>
                  <th className="p-2 text-left">Título</th>
                  <th className="p-2 text-left">URL</th>
                  <th className="p-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id} className="border-t">
                    <td className="p-2 capitalize">{link.icon}</td>
                    <td className="p-2">{link.title}</td>
                    <td className="p-2">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {link.url}
                      </a>
                    </td>
                    <td className="p-2 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(link)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {links.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      Nenhum link cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <LinkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingLink || undefined}
        onSave={handleSave}
      />
    </div>
  );
}
