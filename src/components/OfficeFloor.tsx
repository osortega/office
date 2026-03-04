import { Agent } from '../data/types';
import AgentDesk from './AgentDesk';
import OfficeDecorations from './OfficeDecorations';

interface OfficeFloorProps {
  agents: Agent[];
}

export default function OfficeFloor({ agents }: OfficeFloorProps) {
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
