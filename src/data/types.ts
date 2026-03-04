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
  skills?: string[];
  description?: string;
}

export type ProjectStatus = 'active' | 'improving' | 'completed';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  description: string;
  assignedAgentIds: string[];
  repo?: string;
  url?: string;
  tasks?: { name: string; status: string }[];
}

export interface Worker {
  worker_id: string;
  repo: string;
  status: string;
  started_at: string;
  agent_name: string;
}
