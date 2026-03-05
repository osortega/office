import { Agent } from '../data/types';
import StatusBadge from './StatusBadge';
import TypingIndicator from './TypingIndicator';

interface AgentDeskProps {
  agent: Agent;
}

export default function AgentDesk({ agent }: AgentDeskProps) {
  const initials = agent.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const isWorking = agent.status === 'working';
  const isCompleted = agent.status === 'completed';

  return (
    <div
      className={`
        relative rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300
        ${isWorking ? 'border-blue-200 shadow-blue-100 shadow-md' : ''}
        ${isCompleted ? 'border-green-200 animate-fade-in' : ''}
        ${!isWorking && !isCompleted ? 'border-gray-100 hover:shadow-md' : ''}
        hover:translate-y-[-2px]
      `}
    >
      {/* Desk surface indicator */}
      <div className="absolute -top-1 left-4 right-4 h-1 rounded-t-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />

      {/* Agent avatar and info */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-inner ${
              isWorking ? 'animate-pulse-slow' : ''
            }`}
            style={{ backgroundColor: agent.avatarColor }}
          >
            {initials}
          </div>
          {/* Online indicator */}
          <div
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
              isWorking
                ? 'bg-blue-500'
                : isCompleted
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {agent.name}
            </h3>
            <span className="flex-shrink-0 rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-medium text-amber-700">
              {agent.successRate}%
            </span>
          </div>
          <p className="text-xs text-gray-500">{agent.role}</p>
        </div>
      </div>

      {/* Status and task */}
      <div className="mt-3 space-y-2">
        <StatusBadge status={agent.status} />

        {agent.currentTask && (
          <div className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <svg
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
            <p className="text-xs text-gray-600 leading-relaxed">
              {agent.currentTask}
            </p>
            {isWorking && (
              <div className="ml-auto flex-shrink-0">
                <TypingIndicator />
              </div>
            )}
          </div>
        )}

        {isCompleted && !agent.currentTask && (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
            <span className="text-sm">🎉</span>
            <p className="text-xs font-medium text-green-700">
              All tasks completed!
            </p>
          </div>
        )}

        {agent.skills && agent.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {agent.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500"
              >
                {skill}
              </span>
            ))}
            {agent.skills.length > 4 && (
              <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                +{agent.skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
