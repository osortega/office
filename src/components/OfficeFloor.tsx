import { Agent, Worker } from '../data/types';
import AgentDesk from './AgentDesk';
import OfficeDecorations from './OfficeDecorations';
import WorkerActivity from './WorkerActivity';

interface OfficeFloorProps {
  agents: Agent[];
  workers: Worker[];
}

export default function OfficeFloor({ agents, workers }: OfficeFloorProps) {
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

      {/* Office grid */}
      {agents.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
          {agents.map((agent) => (
            <AgentDesk key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-12">
          <span className="text-4xl">🏢</span>
          <p className="mt-3 text-sm font-medium text-gray-500">No agents at their desks</p>
          <p className="mt-1 text-xs text-gray-400">Agents will appear here when they come online</p>
        </div>
      )}

      {/* Worker activity */}
      <WorkerActivity workers={workers} />

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
