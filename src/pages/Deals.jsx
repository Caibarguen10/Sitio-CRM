import { useState } from 'react'
import { Plus, DollarSign } from 'lucide-react'

const stages = ['Prospecto', 'Calificado', 'Propuesta', 'Negociación', 'Cerrado']

const stageColors = {
  Prospecto: 'border-t-gray-400',
  Calificado: 'border-t-blue-500',
  Propuesta: 'border-t-yellow-500',
  Negociación: 'border-t-orange-500',
  Cerrado: 'border-t-green-500',
}

const badgeColors = {
  Prospecto: 'bg-gray-100 text-gray-700',
  Calificado: 'bg-blue-100 text-blue-700',
  Propuesta: 'bg-yellow-100 text-yellow-700',
  Negociación: 'bg-orange-100 text-orange-700',
  Cerrado: 'bg-green-100 text-green-700',
}

const initialDeals = {
  Prospecto: [
    { id: 1, nombre: 'Proyecto Web App', cliente: 'Mundo Digital', valor: '$5,200' },
    { id: 2, nombre: 'Sistema ERP', cliente: 'BizGroup', valor: '$18,000' },
  ],
  Calificado: [
    { id: 3, nombre: 'Consultoría TI', cliente: 'FutureNet', valor: '$9,500' },
    { id: 4, nombre: 'Migración Cloud', cliente: 'Global Corp', valor: '$12,000' },
  ],
  Propuesta: [
    { id: 5, nombre: 'Desarrollo Mobile', cliente: 'Empresa ABC', valor: '$15,000' },
  ],
  Negociación: [
    { id: 6, nombre: 'Plataforma E-commerce', cliente: 'Tech Solutions', valor: '$32,000' },
    { id: 7, nombre: 'Automatización', cliente: 'Creativa Ltda', valor: '$7,800' },
  ],
  Cerrado: [
    { id: 8, nombre: 'Rediseño Marca', cliente: 'Innova SAS', valor: '$21,000' },
    { id: 9, nombre: 'SEO & Marketing', cliente: 'StartUp XYZ', valor: '$4,500' },
  ],
}

export default function Deals() {
  const [deals, setDeals] = useState(initialDeals)

  function stageTotal(stage) {
    return deals[stage].reduce((sum, d) => {
      const num = parseFloat(d.valor.replace(/[$,]/g, ''))
      return sum + num
    }, 0)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{Object.values(deals).flat().length} negocios en total</p>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Plus size={16} /> Nuevo Negocio
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div key={stage} className={`bg-gray-50 rounded-xl border-t-4 ${stageColors[stage]} min-w-[220px]`}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-700 text-sm">{stage}</h3>
                <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  {deals[stage].length}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <DollarSign size={12} />
                ${stageTotal(stage).toLocaleString()}
              </div>
            </div>
            <div className="p-3 space-y-3">
              {deals[stage].map(deal => (
                <div key={deal.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <p className="font-medium text-gray-800 text-sm">{deal.nombre}</p>
                  <p className="text-xs text-gray-500 mt-1">{deal.cliente}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-gray-700 text-sm">{deal.valor}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[stage]}`}>
                      {stage}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full border border-dashed border-gray-300 rounded-lg py-2 text-xs text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors flex items-center justify-center gap-1">
                <Plus size={12} /> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
