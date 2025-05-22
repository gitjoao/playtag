'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ModalCreateLink() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleSave = async () => {
    const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url: link }),
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div
      className="modal fade"
      id="meuModal"
      tabIndex={-1}
      aria-labelledby="meuModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="meuModalLabel">
              Novo Link
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fechar"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                  Título
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  id="titulo"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="link" className="form-label">
                  Link
                </label>
                <input
                  onChange={(e) => setLink(e.target.value)}
                  type="url"
                  className="form-control"
                  id="link"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => alert('asdasd')}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
