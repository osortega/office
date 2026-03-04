interface HeaderProps {
  agentCount: number;
  activeCount: number;
}

export default function Header({ agentCount, activeCount }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm">
            <span className="text-lg font-bold text-white">O</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Office Dashboard
            </h1>
            <p className="text-xs text-gray-500">Digital workspace overview</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{agentCount}</p>
            <p className="text-xs text-gray-500">Total Agents</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-700">
              System Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
