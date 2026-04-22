import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react'

const initialContacts = [
  { id: 1, nombre: 'María García', empresa: 'Empresa ABC', email: 'maria@abc.com', telefono: '+57 300 123 4567', estado: 'Activo' },
  { id: 2, nombre: 'Carlos López', empresa: 'Tech Solutions', email: 'carlos@tech.com', telefono: '+57 310 987 6543', estado: 'Activo' },
  { id: 3, nombre: 'Ana Martínez', empresa: 'Global Corp', email: 'ana@global.com', telefono: '+57 320 456 7890', estado: 'Inactivo' },
  { id: 4, nombre: 'Pedro Rodríguez', empresa: 'Innova SAS', email: 'pedro@innova.com', telefono: '+57 315 234 5678', estado: 'Activo' },
  { id: 5, nombre: 'Laura Sánchez', empresa: 'Mundo Digital', email: 'laura@mundo.com', telefono: '+57 316 345 6789', estado: 'Prospecto' },
  { id: 6, nombre: 'Andrés Torres', empresa: 'Creativa Ltda', email: 'andres@creativa.com', telefono: '+57 312 567 8901', estado: 'Activo' },
  { id: 7, nombre: 'Sofía Ramírez', empresa: 'BizGroup', email: 'sofia@biz.com', telefono: '+57 318 678 9012', estado: 'Inactivo' },
  { id: 8, nombre: 'Diego Herrera', empresa: 'FutureNet', email: 'diego@future.com', telefono: '+57 317 789 0123', estado: 'Prospecto' },
]

const statusColors = {
  Activo: 'bg-green-100 text-green-700',
  Inactivo: 'bg-gray-100 text-gray-600',
  Prospecto: 'bg-blue-100 text-blue-700',
}

const emptyForm = { nombre: '', empresa: '', email: '', telefono: '', estado: 'Activo' }

export default function Contacts() {
  const [contacts, setContacts] = useState(initialContacts)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)

  const filtered = contacts.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase()) ||
    c.empresa.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (editId !== null) {
      setContacts(cs => cs.map(c => c.id === editId ? { ...form, id: editId } : c))
    } else {
      setContacts(cs => [...cs, { ...form, id: Date.now() }])
    }
    setShowModal(false)
    setForm(emptyForm)
    setEditId(null)
  }

  function handleEdit(contact) {
    setForm({ nombre: contact.nombre, empresa: contact.empresa, email: contact.email, telefono: contact.telefono, estado: contact.estado })
    setEditId(contact.id)
    setShowModal(true)
  }

  function handleDelete(id) {
    setContacts(cs => cs.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar contactos..."
            className="pl-9 pr-4 py-2 text-sm w-full border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400"
          />
        </div>
        <button
          onClick={() => { setForm(emptyForm); setEditId(null); setShowModal(true) }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} /> Nuevo Contacto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Empresa</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Teléfono</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(contact => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{contact.nombre}</td>
                  <td className="px-6 py-4 text-gray-600">{contact.empresa}</td>
                  <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                  <td className="px-6 py-4 text-gray-600">{contact.telefono}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[contact.estado]}`}>
                      {contact.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(contact)} className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(contact.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No se encontraron contactos</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {editId !== null ? 'Editar Contacto' : 'Nuevo Contacto'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {[
                { label: 'Nombre', field: 'nombre' },
                { label: 'Empresa', field: 'empresa' },
                { label: 'Email', field: 'email', type: 'email' },
                { label: 'Teléfono', field: 'telefono' },
              ].map(({ label, field, type = 'text' }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    required
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={form.estado}
                  onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                  <option>Prospecto</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                  {editId !== null ? 'Guardar Cambios' : 'Crear Contacto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
