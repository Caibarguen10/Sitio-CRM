import { Users, Briefcase, DollarSign, Clock, TrendingUp, ArrowUpRight } from 'lucide-react'

const kpis = [
  { title: 'Total Contactos', value: '248', icon: Users, color: 'bg-blue-500', change: '+12%' },
  { title: 'Negocios Activos', value: '34', icon: Briefcase, color: 'bg-indigo-500', change: '+5%' },
  { title: 'Ingresos del Mes', value: '$125,400', icon: DollarSign, color: 'bg-emerald-500', change: '+18%' },
  { title: 'Tareas Pendientes', value: '12', icon: Clock, color: 'bg-amber-500', change: '-3%' },
]

const recentDeals = [
  { cliente: 'Empresa ABC', etapa: 'Propuesta', valor: '$15,000', fecha: '2024-01-15' },
  { cliente: 'Tech Solutions', etapa: 'Negociación', valor: '$32,000', fecha: '2024-01-14' },
  { cliente: 'Global Corp', etapa: 'Calificado', valor: '$8,500', fecha: '2024-01-13' },
  { cliente: 'Innova SAS', etapa: 'Cerrado', valor: '$21,000', fecha: '2024-01-12' },
  { cliente: 'Mundo Digital', etapa: 'Prospecto', valor: '$5,200', fecha: '2024-01-11' },
]

const stageColors = {
  Prospecto: 'bg-gray-100 text-gray-700',
  Calificado: 'bg-blue-100 text-blue-700',
  Propuesta: 'bg-yellow-100 text-yellow-700',
  Negociación: 'bg-orange-100 text-orange-700',
  Cerrado: 'bg-green-100 text-green-700',
}

const activity = [
  { msg: 'Nuevo contacto agregado: María García', time: 'hace 5 min', type: 'contact' },
  { msg: 'Negocio "Tech Solutions" avanzó a Negociación', time: 'hace 20 min', type: 'deal' },
  { msg: 'Tarea completada: Llamada de seguimiento', time: 'hace 1 hora', type: 'task' },
  { msg: 'Nuevo comentario en Empresa ABC', time: 'hace 2 horas', type: 'comment' },
  { msg: 'Reporte mensual generado', time: 'hace 3 horas', type: 'report' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={22} />
                </div>
                <span className={`text-sm font-medium flex items-center gap-1 ${kpi.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  <TrendingUp size={14} />
                  {kpi.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{kpi.value}</div>
              <div className="text-sm text-gray-500 mt-1">{kpi.title}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Negocios Recientes</h2>
            <button className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline">
              Ver todos <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Etapa</th>
                  <th className="pb-3 font-medium">Valor</th>
                  <th className="pb-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentDeals.map((deal, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium text-gray-800">{deal.cliente}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[deal.etapa]}`}>
                        {deal.etapa}
                      </span>
                    </td>
                    <td className="py-3 text-gray-700">{deal.valor}</td>
                    <td className="py-3 text-gray-500">{deal.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-700">{item.msg}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
