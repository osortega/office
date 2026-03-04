export type AgentStatus = 'working' | 'idle' | 'completed';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask: string | null;
  successRate: number;
  avatarColor: string;
  deskPosition: { row: number; col: number };
}

export type ProjectStatus = 'active' | 'improving' | 'completed';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  description: string;
  assignedAgentIds: string[];
}
