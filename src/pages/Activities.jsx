import { useState } from 'react'
import { Plus, X, CheckCircle2, Circle } from 'lucide-react'

const priorityColors = {
  Alta: 'bg-red-100 text-red-700',
  Media: 'bg-yellow-100 text-yellow-700',
  Baja: 'bg-green-100 text-green-700',
}

const initialTasks = [
  { id: 1, titulo: 'Llamada de seguimiento con Empresa ABC', descripcion: 'Revisar propuesta enviada la semana pasada', fecha: '2024-01-16', prioridad: 'Alta', completada: false },
  { id: 2, titulo: 'Preparar propuesta para Tech Solutions', descripcion: 'Incluir detalles técnicos y precio final', fecha: '2024-01-17', prioridad: 'Alta', completada: false },
  { id: 3, titulo: 'Actualizar datos de Global Corp', descripcion: 'Verificar información de contacto', fecha: '2024-01-18', prioridad: 'Baja', completada: true },
  { id: 4, titulo: 'Reunión con equipo de ventas', descripcion: 'Revisión de metas del mes', fecha: '2024-01-19', prioridad: 'Media', completada: false },
  { id: 5, titulo: 'Enviar contrato a Innova SAS', descripcion: 'Contrato firmado y aprobado por legal', fecha: '2024-01-20', prioridad: 'Alta', completada: false },
  { id: 6, titulo: 'Capacitación CRM nuevo módulo', descripcion: 'Asistir a la sesión de capacitación interna', fecha: '2024-01-21', prioridad: 'Baja', completada: true },
  { id: 7, titulo: 'Informe semanal de ventas', descripcion: 'Compilar datos y enviar a gerencia', fecha: '2024-01-22', prioridad: 'Media', completada: false },
]

const emptyForm = { titulo: '', descripcion: '', fecha: '', prioridad: 'Media' }

export default function Activities() {
  const [tasks, setTasks] = useState(initialTasks)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [filter, setFilter] = useState('todas')

  function toggleTask(id) {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, completada: !t.completada } : t))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTasks(ts => [...ts, { ...form, id: Date.now(), completada: false }])
    setShowModal(false)
    setForm(emptyForm)
  }

  const filtered = tasks.filter(t => {
    if (filter === 'pendientes') return !t.completada
    if (filter === 'completadas') return t.completada
    return true
  })

  const pendientes = tasks.filter(t => !t.completada).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          {[['todas', 'Todas'], ['pendientes', 'Pendientes'], ['completadas', 'Completadas']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === val ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{pendientes} tareas pendientes</span>
          <button
            onClick={() => { setForm(emptyForm); setShowModal(true) }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            <Plus size={16} /> Nueva Actividad
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(task => (
          <div key={task.id} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 transition-opacity ${task.completada ? 'opacity-60' : ''}`}>
            <button onClick={() => toggleTask(task.id)} className="mt-0.5 flex-shrink-0">
              {task.completada
                ? <CheckCircle2 className="text-emerald-500" size={22} />
                : <Circle className="text-gray-300 hover:text-indigo-400" size={22} />
              }
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`font-medium text-gray-800 ${task.completada ? 'line-through text-gray-400' : ''}`}>
                  {task.titulo}
                </p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${priorityColors[task.prioridad]}`}>
                  {task.prioridad}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{task.descripcion}</p>
              <p className="text-xs text-gray-400 mt-2">Vence: {task.fecha}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">
            No hay actividades en esta categoría
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Nueva Actividad</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  required
                  value={form.titulo}
                  onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento</label>
                <input
                  type="date"
                  required
                  value={form.fecha}
                  onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <select
                  value={form.prioridad}
                  onChange={e => setForm(f => ({ ...f, prioridad: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                >
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                  Crear Actividad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
