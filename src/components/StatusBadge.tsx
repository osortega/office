import { AgentStatus } from '../data/types';

interface StatusBadgeProps {
  status: AgentStatus;
}

const statusConfig: Record<AgentStatus, { label: string; classes: string }> = {
  working: {
    label: 'Working',
    classes: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  idle: {
    label: 'Idle',
    classes: 'bg-gray-100 text-gray-600 border-gray-200',
  },
  completed: {
    label: 'Completed',
    classes: 'bg-green-100 text-green-800 border-green-200',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.classes}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'working'
            ? 'animate-pulse bg-blue-500'
            : status === 'completed'
            ? 'bg-green-500'
            : 'bg-gray-400'
        }`}
      />
      {config.label}
    </span>
  );
}
