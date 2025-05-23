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

export default function LinkEditor({ link }: { link: Link }) {
  const router = useRouter();
  const [linkEdit, setLink] = useState(link);
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/link`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(linkEdit),
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
          <h2 className="p-4">Editar link</h2>
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
                defaultValue={linkEdit.title}
                onChange={(e) => setLink({ ...linkEdit, title: e.target.value })}
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
                placeholder="informe o titulo do link"
                defaultValue={linkEdit.url}
                onChange={(e) => setLink({ ...linkEdit, url: e.target.value })}
              />
            </div>
          </div>
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
