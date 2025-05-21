'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export type Link = {
  id: string;
  url: string;
  icon: string;
  title: string;
  user_id: string;
};

type User = {
  id: string;
  username: string;
  avatar_url: string;
  bio: string;
  links: Link[];
};

export function AccountClient({ user }: { user: User }) {
  const router = useRouter();
  const links = user.links;

  const [showModal, setShowModal] = useState(false);

  const [valueBio, setValue] = useState(user.bio);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setIsModified(valueBio !== user.bio);
  }, [valueBio, user.bio]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const onImageUpload = (file: File) => {
    console.log(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const id = '0de7c8a9-675b-4f3c-a9f0-6fb0ac1677cc';
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';

  const handleSave = async () => {
    const response = await fetch(`${baseUrl}/api/users`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, bio: valueBio }),
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div className="mt-4">
      <div className="container">
        <div className="card p-4 shadow">
          <div className="">
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="position-relative"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
                style={{ width: 100, height: 100, cursor: 'pointer' }}
              >
                <Image
                  src={user.avatar_url}
                  alt={user.username}
                  width={100}
                  height={100}
                  className="rounded-circle"
                />
                {showModal && (
                  <div
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '50%',
                      padding: 8,
                      cursor: 'pointer',
                    }}
                    onClick={handleIconClick}
                  >
                    <Pencil size={20} color="#fff" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{user.username}</h5>
                  <textarea
                    className="form-control"
                    style={{ height: '100px' }}
                    onChange={handleChange}
                    defaultValue={valueBio}
                  ></textarea>
                  <div className="d-flex justify-content-md-end mt-3">
                    <button
                      onClick={handleSave}
                      disabled={!isModified}
                      className={`btn btn-sm ${isModified ? 'btn-success' : 'btn-secondary'}`}
                      style={{ color: 'white' }}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end p-1">
            <button className="btn btn-success btn-sm">Novo Link</button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr className="">
                <th className="">Ícone</th>
                <th className="">Título</th>
                <th className="">URL</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="">
                  <td className="">{link.icon}</td>
                  <td className="">{link.title}</td>
                  <td className="">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  </td>
                  <td className="d-flex justify-content-evenly">
                    <button className="btn btn-warning btn-sm" style={{ color: 'white' }}>
                      <Pencil size={18} />
                    </button>
                    <button className="btn btn-danger btn-sm">
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
  );
}
