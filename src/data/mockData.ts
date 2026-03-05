import { DashboardData } from '../services/api';

export const FALLBACK_DASHBOARD: DashboardData = {
  agents: [
    {
      name: 'Devin',
      role: 'Full-Stack Engineer',
      description: 'Autonomous AI software engineer',
      skills: ['TypeScript', 'Python', 'React'],
      stats: { success_rate: 92 },
      status: 'idle',
      current_task: null,
    },
    {
      name: 'Cursor',
      role: 'Code Assistant',
      description: 'AI-powered code editor',
      skills: ['Code Review', 'Refactoring', 'Debugging'],
      stats: { success_rate: 88 },
      status: 'idle',
      current_task: null,
    },
    {
      name: 'Codex',
      role: 'Backend Engineer',
      description: 'Code generation and analysis',
      skills: ['Python', 'Node.js', 'SQL'],
      stats: { success_rate: 90 },
      status: 'idle',
      current_task: null,
    },
    {
      name: 'Sweep',
      role: 'DevOps Engineer',
      description: 'Automated code maintenance',
      skills: ['CI/CD', 'Testing', 'Documentation'],
      stats: { success_rate: 85 },
      status: 'idle',
      current_task: null,
    },
  ],
  workers: [],
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
      agents: ['Devin', 'Cursor'],
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
      agents: ['Codex'],
    },
    {
      id: 'proj-demo-3',
      name: 'CI/CD Pipeline',
      description: 'Automated build, test, and deployment pipeline.',
      status: 'completed',
      tasks: [
        { name: 'Pipeline Setup', status: 'done' },
        { name: 'Testing', status: 'done' },
      ],
      agents: ['Sweep'],
    },
  ],
  goals: ['Demo mode — live data unavailable'],
};
