interface HeaderProps {
  agentCount: number;
  activeCount: number;
  connected: boolean;
  error: string | null;
  lastUpdated: Date | null;
  onRefresh: () => void;
  refreshing: boolean;
  goals: string[];
}

export default function Header({ agentCount, activeCount, connected, error, lastUpdated, onRefresh, refreshing, goals }: HeaderProps) {
  const timeAgo = lastUpdated
    ? `Updated ${lastUpdated.toLocaleTimeString()}`
    : '';

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
            <p className="text-xs text-gray-500">
              {timeAgo || 'Digital workspace overview'}
            </p>
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
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
            title="Refresh data"
          >
            <svg
              className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.183"
              />
            </svg>
          </button>
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
              connected ? 'bg-green-50' : 'bg-red-50'
            }`}
            title={error || undefined}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span
              className={`text-xs font-medium ${
                connected ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {connected ? 'API Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {goals.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {goals.map((goal, i) => (
            <span
              key={i}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
            >
              🎯 {goal}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
