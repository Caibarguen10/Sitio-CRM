import { NavLink } from 'react-router-dom'
import { Building2, LayoutDashboard, Users, Briefcase, CheckSquare, BarChart3 } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/contacts', icon: Users, label: 'Contactos' },
  { to: '/deals', icon: Briefcase, label: 'Negocios' },
  { to: '/activities', icon: CheckSquare, label: 'Actividades' },
  { to: '/reports', icon: BarChart3, label: 'Reportes' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-indigo-900 text-white flex flex-col z-10">
      <div className="flex items-center gap-3 p-6 border-b border-indigo-700">
        <Building2 className="text-indigo-300" size={28} />
        <span className="text-xl font-bold tracking-wide">SitioCRM</span>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-indigo-700 text-xs text-indigo-400 text-center">
        v1.0.0
      </div>
    </aside>
  )
}
