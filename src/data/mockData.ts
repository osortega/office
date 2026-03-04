import { Agent, Project } from './types';

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sarah Chen',
    role: 'Lead Engineer',
    status: 'working',
    currentTask: 'Building authentication module',
    successRate: 94,
    avatarColor: '#6366f1',
    deskPosition: { row: 0, col: 0 },
  },
  {
    id: 'agent-2',
    name: 'Marcus Rivera',
    role: 'Frontend Developer',
    status: 'working',
    currentTask: 'Designing dashboard UI components',
    successRate: 88,
    avatarColor: '#f59e0b',
    deskPosition: { row: 0, col: 1 },
  },
  {
    id: 'agent-3',
    name: 'Aisha Patel',
    role: 'Backend Developer',
    status: 'idle',
    currentTask: null,
    successRate: 91,
    avatarColor: '#ec4899',
    deskPosition: { row: 1, col: 0 },
  },
  {
    id: 'agent-4',
    name: 'James O\'Brien',
    role: 'DevOps Engineer',
    status: 'completed',
    currentTask: null,
    successRate: 96,
    avatarColor: '#10b981',
    deskPosition: { row: 1, col: 1 },
  },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Customer Portal v2',
    status: 'active',
    progress: 65,
    description: 'Redesigning the customer-facing portal with new features and improved UX.',
    assignedAgentIds: ['agent-1', 'agent-2'],
  },
  {
    id: 'proj-2',
    name: 'API Performance Optimization',
    status: 'improving',
    progress: 40,
    description: 'Optimizing API response times and database query performance.',
    assignedAgentIds: ['agent-3', 'agent-1'],
  },
  {
    id: 'proj-3',
    name: 'CI/CD Pipeline Upgrade',
    status: 'completed',
    progress: 100,
    description: 'Migrating to GitHub Actions with automated testing and deployment.',
    assignedAgentIds: ['agent-4'],
  },
];
