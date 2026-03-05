import { Worker } from '../data/types';

interface WorkerActivityProps {
  workers: Worker[];
}

function statusIcon(status: string) {
  const s = status.toLowerCase();
  if (s === 'running' || s === 'active' || s === 'in_progress') return '🔄';
  if (s === 'completed' || s === 'done' || s === 'success') return '✅';
  if (s === 'failed' || s === 'error') return '❌';
  if (s === 'queued' || s === 'pending') return '⏳';
  return '⚙️';
}

function statusClasses(status: string) {
  const s = status.toLowerCase();
  if (s === 'running' || s === 'active' || s === 'in_progress')
    return 'bg-blue-50 text-blue-700 border-blue-200';
  if (s === 'completed' || s === 'done' || s === 'success')
    return 'bg-green-50 text-green-700 border-green-200';
  if (s === 'failed' || s === 'error')
    return 'bg-red-50 text-red-700 border-red-200';
  return 'bg-gray-50 text-gray-700 border-gray-200';
}

function timeAgo(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  } catch {
    return '';
  }
}

export default function WorkerActivity({ workers }: WorkerActivityProps) {
  if (workers.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        Worker Activity
      </h3>
      <div className="space-y-2">
        {workers.map((w) => (
          <div
            key={w.worker_id}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
          >
            <span className="text-base">{statusIcon(w.status)}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-gray-900">
                  {w.agent_name}
                </span>
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusClasses(w.status)}`}
                >
                  {w.status}
                </span>
              </div>
              <p className="truncate text-xs text-gray-500">{w.repo}</p>
            </div>
            {w.started_at && (
              <span className="flex-shrink-0 text-xs text-gray-400">
                {timeAgo(w.started_at)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
