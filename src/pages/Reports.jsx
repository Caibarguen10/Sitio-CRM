const monthlyRevenue = [
  { mes: 'Ago', valor: 82000 },
  { mes: 'Sep', valor: 95000 },
  { mes: 'Oct', valor: 88000 },
  { mes: 'Nov', valor: 110000 },
  { mes: 'Dic', valor: 98000 },
  { mes: 'Ene', valor: 125400 },
]

const dealsByStage = [
  { etapa: 'Prospecto', count: 2, color: 'bg-gray-400' },
  { etapa: 'Calificado', count: 2, color: 'bg-blue-500' },
  { etapa: 'Propuesta', count: 1, color: 'bg-yellow-500' },
  { etapa: 'Negociación', count: 2, color: 'bg-orange-500' },
  { etapa: 'Cerrado', count: 2, color: 'bg-green-500' },
]

const team = [
  { nombre: 'María García', negocios: 12, ingresos: '$45,200', tasa: '78%' },
  { nombre: 'Carlos López', negocios: 9, ingresos: '$38,100', tasa: '66%' },
  { nombre: 'Ana Martínez', negocios: 7, ingresos: '$28,500', tasa: '71%' },
  { nombre: 'Pedro Rodríguez', negocios: 6, ingresos: '$13,600', tasa: '50%' },
]

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.valor))

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Ingresos Totales', value: '$125,400', sub: 'Este mes', color: 'text-emerald-600' },
          { label: 'Tasa de Cierre', value: '68%', sub: 'Promedio del equipo', color: 'text-indigo-600' },
          { label: 'Ticket Promedio', value: '$14,377', sub: 'Por negocio cerrado', color: 'text-amber-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Ingresos Mensuales</h2>
          <div className="flex items-end gap-3 h-48">
            {monthlyRevenue.map(({ mes, valor }) => {
              const height = (valor / maxRevenue) * 100
              return (
                <div key={mes} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">${(valor / 1000).toFixed(0)}k</span>
                  <div className="w-full relative" style={{ height: '140px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition-colors"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{mes}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Negocios por Etapa</h2>
          <div className="space-y-4">
            {dealsByStage.map(({ etapa, count, color }) => {
              const pct = (count / 9) * 100
              return (
                <div key={etapa}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-gray-700 font-medium">{etapa}</span>
                    <span className="text-gray-500">{count} negocios</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className={`${color} h-3 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Rendimiento del Equipo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Vendedor</th>
                <th className="px-4 py-3 font-medium">Negocios</th>
                <th className="px-4 py-3 font-medium">Ingresos</th>
                <th className="px-4 py-3 font-medium">Tasa de Cierre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {team.map((member, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{member.nombre}</td>
                  <td className="px-4 py-3 text-gray-600">{member.negocios}</td>
                  <td className="px-4 py-3 text-gray-600">{member.ingresos}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-24">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: member.tasa }} />
                      </div>
                      <span className="text-gray-700 font-medium">{member.tasa}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
