import { Agent } from '../data/types';
import { ApiWorker } from '../services/api';
import AgentDesk from './AgentDesk';
import OfficeDecorations from './OfficeDecorations';

interface OfficeFloorProps {
  agents: Agent[];
  workers: ApiWorker[];
}

export default function OfficeFloor({ agents, workers }: OfficeFloorProps) {
  const activeWorkers = workers.filter(
    (w) => w.status === 'running' || w.status === 'active' || w.status === 'busy'
  );

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Floor header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          🏢 Office Floor
        </h2>
        <p className="text-sm text-gray-500">
          {agents.filter((a) => a.status === 'working').length} of{' '}
          {agents.length} agents currently working
        </p>
      </div>

      {/* Active workers banner */}
      {activeWorkers.length > 0 && (
        <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <h3 className="mb-2 text-sm font-semibold text-blue-800">
            ⚡ Active Workers ({activeWorkers.length})
          </h3>
          <div className="space-y-2">
            {activeWorkers.map((w) => (
              <div
                key={w.worker_id}
                className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-medium text-gray-800">{w.agent_name}</span>
                </div>
                <span className="text-gray-500 truncate ml-2 max-w-[200px]">{w.repo}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Office grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
        {/* Agent desks */}
        {agents.map((agent) => (
          <AgentDesk key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Office decorations */}
      <div className="mt-8">
        <h3 className="mb-4 text-sm font-medium text-gray-400 uppercase tracking-wider">
          Office Amenities
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <OfficeDecorations />
        </div>
      </div>
    </div>
  );
}
