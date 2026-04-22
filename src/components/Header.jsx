import { useLocation } from 'react-router-dom'
import { Bell, Search, User } from 'lucide-react'

const titles = {
  '/dashboard': 'Dashboard',
  '/contacts': 'Contactos',
  '/deals': 'Negocios',
  '/activities': 'Actividades',
  '/reports': 'Reportes',
}

export default function Header() {
  const { pathname } = useLocation()
  const title = titles[pathname] || 'CRM'

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-lg border border-transparent focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors w-48"
          />
        </div>
        <button className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-800">Admin</div>
            <div className="text-gray-500 text-xs">admin@crm.com</div>
          </div>
        </div>
      </div>
    </header>
  )
}
