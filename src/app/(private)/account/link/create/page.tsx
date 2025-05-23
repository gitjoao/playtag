'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  user_id: string;
}

interface Icon {
  name: string;
  displayName: string;
}

const icones: Icon[] = [
  { name: 'youtube', displayName: 'YouTube' },
  { name: 'twitch', displayName: 'Twitch' },
  { name: 'instagram', displayName: 'Instagram' },
  { name: 'tiktok', displayName: 'Tiktok' },
  { name: 'facebook', displayName: 'Facebook' },
  { name: 'twitter', displayName: 'Twitter (X)' },
  { name: 'telegram', displayName: 'Telegram' },
  { name: 'discord', displayName: 'Discord' },
  { name: 'steam', displayName: 'Steam' },
  { name: 'whatsapp', displayName: 'WhatsApp' },
];

export default function LinkEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIcon(e.target.value);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url, icon: selectedIcon }),
    });

    if (response.ok) {
      router.push('/account');
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="p-4">criar link</h2>
        </div>
        <form className="">
          <div className="mb-2 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              titulo
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                name="title"
                id="title"
                type="text"
                placeholder="informe o titulo do link"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              url
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                name="title"
                id="title"
                type="text"
                placeholder="informe a url"
                defaultValue={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              icone
            </label>
            <div className="col-sm-7">
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue={selectedIcon}
                onChange={handleChange}
              >
                <option disabled value="">
                  selecione o icone
                </option>
                {icones.map((icon: Icon) => (
                  <option key={icon.name} value={icon.name}>
                    {icon.displayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-3 d-flex justify-content-center align-items-center">
              {selectedIcon && (
                <img
                  src={`https://cdn.simpleicons.org/${selectedIcon}`}
                  alt={selectedIcon}
                  className=""
                  height={32}
                  width={32}
                />
              )}
            </div>
          </div>
          <div className="mb-2 row mt-5"></div>
          <div className="d-flex justify-content-end">
            <Link href="/account" className="btn btn-danger" style={{ marginRight: '10px' }}>
              voltar
            </Link>
            <button className="btn btn-success" onClick={handleSave}>
              salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
