import { NavLink } from 'react-router-dom';

const links = [
  { to: '/watched', label: 'Просмотренные' },
  { to: '/to-watch', label: 'К просмотру' },
  { to: '/compare', label: 'Сравнение' },
];

export default function Navigation() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-8 h-16">
          <span className="text-violet-400 font-bold text-xl tracking-wide shrink-0">
            🎬 MovieTracker
          </span>
          <div className="flex gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
