'use client'

import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { Link } from './account-client'


type Props = {
  open: boolean
  onClose: () => void
  onSave: (link: Link) => void
  initialData?: Link
}

export function LinkModal({ open, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<Link>({
    title: '',
    url: '',
    icon: '',
    id: '',
    user_id: ''
  })

  useEffect(() => {
    if (initialData) setForm(initialData)
    else setForm({ title: '', url: '', icon: '', id: '',  user_id: '' })
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSave(form)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-bold">
              {initialData ? 'Editar Link' : 'Novo Link'}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X />
            </button>
          </div>

          <div className="space-y-3">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título"
              className="w-full border rounded px-3 py-2"
            />
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="URL"
              className="w-full border rounded px-3 py-2"
            />
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="Ícone (ex: youtube)"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}