const API_URL = import.meta.env.VITE_API_URL || 'https://openclaw.onrender.com/api/dashboard';

export interface ApiAgent {
  name: string;
  role: string;
  description?: string;
  skills?: string[];
  stats?: Record<string, number>;
  status: string;
  current_task?: string | null;
}

export interface ApiWorker {
  worker_id: string;
  repo: string;
  status: string;
  started_at: string;
  agent_name: string;
}

export interface ApiProject {
  id: string;
  name: string;
  description: string;
  repo?: string;
  url?: string;
  status: string;
  tasks?: { name: string; status: string }[];
  agents?: string[];
}

export interface DashboardData {
  agents: ApiAgent[];
  workers: ApiWorker[];
  projects: ApiProject[];
  goals?: string[];
}

export async function fetchDashboard(): Promise<DashboardData> {
  const response = await fetch(API_URL, {
    headers: { 'Accept': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
