import { DashboardData } from '../services/api';

export const FALLBACK_DASHBOARD: DashboardData = {
  agents: [
    {
      name: 'Portfolio Analyst',
      role: 'Portfolio Analyst',
      description: 'Analyzes project portfolios and tracks performance metrics',
      skills: ['Data Analysis', 'Reporting', 'Strategy'],
      stats: { success_rate: 94 },
      status: 'working',
      current_task: 'Reviewing code quality across repositories',
    },
    {
      name: 'Frontend Engineer',
      role: 'Frontend Engineer',
      description: 'Builds and maintains user-facing applications',
      skills: ['TypeScript', 'React', 'CSS'],
      stats: { success_rate: 91 },
      status: 'working',
      current_task: 'Building new dashboard features',
    },
    {
      name: 'Backend Developer',
      role: 'Backend Developer',
      description: 'Designs and implements server-side services',
      skills: ['Python', 'Node.js', 'SQL'],
      stats: { success_rate: 89 },
      status: 'working',
      current_task: 'Optimizing API response times',
    },
  ],
  workers: [
    {
      worker_id: 'w-demo-1',
      repo: 'osortega/office',
      status: 'running',
      started_at: new Date().toISOString(),
      agent_name: 'Frontend Engineer',
    },
  ],
  projects: [
    {
      id: 'proj-demo-1',
      name: 'Office Dashboard',
      description: 'Real-time visualization of AI agent activity.',
      status: 'active',
      tasks: [
        { name: 'Setup', status: 'done' },
        { name: 'UI Components', status: 'done' },
        { name: 'API Integration', status: 'in_progress' },
      ],
      agents: ['Frontend Engineer', 'Portfolio Analyst'],
    },
    {
      id: 'proj-demo-2',
      name: 'API Gateway',
      description: 'Central API gateway for microservices.',
      status: 'improving',
      tasks: [
        { name: 'Design', status: 'done' },
        { name: 'Implementation', status: 'in_progress' },
      ],
      agents: ['Backend Developer'],
    },
    {
      id: 'proj-demo-3',
      name: 'Analytics Pipeline',
      description: 'Automated data collection and reporting pipeline.',
      status: 'completed',
      tasks: [
        { name: 'Pipeline Setup', status: 'done' },
        { name: 'Testing', status: 'done' },
      ],
      agents: ['Portfolio Analyst'],
    },
  ],
  goals: ['Demo mode — live data unavailable'],
};
