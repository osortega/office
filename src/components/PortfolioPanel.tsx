import { Project, Agent } from '../data/types';

interface PortfolioPanelProps {
  projects: Project[];
  agents: Agent[];
}

const statusColors: Record<string, { bg: string; text: string; bar: string; label: string }> = {
  active: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    bar: 'bg-blue-500',
    label: 'Active',
  },
  improving: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    bar: 'bg-amber-500',
    label: 'Improving',
  },
  completed: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    bar: 'bg-green-500',
    label: 'Completed',
  },
};

export default function PortfolioPanel({ projects, agents }: PortfolioPanelProps) {
  const getAgent = (id: string) => agents.find((a) => a.id === id);

  return (
    <div className="w-full border-t border-gray-200 bg-white lg:w-96 lg:border-l lg:border-t-0">
      <div className="p-5">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-800">Portfolio</h2>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {projects.filter((p) => p.status === 'active').length} active projects
        </p>
      </div>

      <div className="space-y-3 px-5 pb-5">
        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-10">
            <span className="text-3xl">📋</span>
            <p className="mt-2 text-sm font-medium text-gray-500">No projects yet</p>
            <p className="mt-1 text-xs text-gray-400">Projects will appear when loaded from the API</p>
          </div>
        )}
        {projects.map((project) => {
          const colors = statusColors[project.status];
          return (
            <div
              key={project.id}
              className="rounded-xl border border-gray-100 p-4 transition-shadow hover:shadow-md"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  {project.name}
                </h3>
                <span
                  className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}
                >
                  {colors.label}
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                {project.description}
              </p>

              {(project.repo || project.url) && (
                <a
                  href={project.url || `https://github.com/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[11px] text-indigo-500 hover:text-indigo-700"
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  {project.repo || 'View project'}
                </a>
              )}

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-700">
                    {project.progress}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${colors.bar}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Assigned agents */}
              <div className="mt-3 flex items-center gap-1">
                <span className="text-xs text-gray-400 mr-1">Team:</span>
                <div className="flex -space-x-2">
                  {project.assignedAgentIds.map((agentId) => {
                    const agent = getAgent(agentId);
                    if (!agent) return null;
                    const initials = agent.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('');
                    return (
                      <div
                        key={agent.id}
                        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
                        style={{ backgroundColor: agent.avatarColor }}
                        title={agent.name}
                      >
                        {initials}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
