import { useState, useEffect, useCallback } from 'react';
import { fetchDashboard, DashboardData, ApiWorker } from './services/api';
import { FALLBACK_DASHBOARD } from './data/mockData';
import { Agent, Project } from './data/types';
import Header from './components/Header';
import OfficeFloor from './components/OfficeFloor';
import PortfolioPanel from './components/PortfolioPanel';

const AVATAR_COLORS = [
  '#6366f1', '#f59e0b', '#ec4899', '#10b981',
  '#8b5cf6', '#ef4444', '#06b6d4', '#f97316',
];

function mapStatus(status: string): 'working' | 'idle' | 'completed' {
  const s = status.toLowerCase();
  if (s === 'working' || s === 'busy' || s === 'running' || s === 'active') return 'working';
  if (s === 'completed' || s === 'done' || s === 'finished') return 'completed';
  return 'idle';
}

function mapProjectStatus(status: string): 'active' | 'improving' | 'completed' {
  const s = status.toLowerCase();
  if (s === 'completed' || s === 'done') return 'completed';
  if (s === 'improving' || s === 'in_progress' || s === 'in progress') return 'improving';
  return 'active';
}

function transformData(data: DashboardData): { agents: Agent[]; projects: Project[] } {
  const agents: Agent[] = data.agents.map((a, i) => ({
    id: `agent-${i + 1}`,
    name: a.name,
    role: a.role,
    status: mapStatus(a.status),
    currentTask: a.current_task || null,
    successRate: a.stats?.success_rate ?? 0,
    avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
    deskPosition: { row: Math.floor(i / 2), col: i % 2 },
    skills: a.skills,
    description: a.description,
  }));

  const projects: Project[] = data.projects.map((p, i) => {
    const completedTasks = p.tasks?.filter(t => t.status === 'done' || t.status === 'completed').length ?? 0;
    const totalTasks = p.tasks?.length ?? 0;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const assignedIds = (p.agents || []).map(name => {
      const idx = agents.findIndex(a => a.name === name);
      return idx >= 0 ? agents[idx].id : '';
    }).filter(Boolean);

    return {
      id: p.id || `proj-${i + 1}`,
      name: p.name,
      status: mapProjectStatus(p.status),
      progress,
      description: p.description,
      assignedAgentIds: assignedIds,
      repo: p.repo,
      url: p.url,
      tasks: p.tasks,
    };
  });

  return { agents, projects };
}

const POLL_INTERVAL = 10_000;

export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [workers, setWorkers] = useState<ApiWorker[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async (isInitial = false) => {
    try {
      const data = await fetchDashboard();
      const { agents: a, projects: p } = transformData(data);
      setAgents(a);
      setProjects(p);
      setWorkers(data.workers || []);
      setGoals(data.goals || []);
      setConnected(true);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect to API';
      setError(message);
      setConnected(false);
      // Use fallback data so the UI is never blank
      if (agents.length === 0) {
        const { agents: fa, projects: fp } = transformData(FALLBACK_DASHBOARD);
        setAgents(fa);
        setProjects(fp);
        setWorkers(FALLBACK_DASHBOARD.workers || []);
        setGoals(FALLBACK_DASHBOARD.goals || []);
      }
    } finally {
      if (isInitial) setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData(true);
    const interval = setInterval(() => loadData(), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [loadData]);

  const activeCount = agents.filter((a) => a.status === 'working').length;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="mt-4 text-sm text-gray-500">Connecting to CTO API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header
        agentCount={agents.length}
        activeCount={activeCount}
        connected={connected}
        error={error}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        goals={goals}
      />

      {error && agents.length === 0 && (
        <div className="border-b border-red-200 bg-red-50 px-6 py-3">
          <p className="text-sm text-red-700">
            ⚠️ Unable to connect to API: {error}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <OfficeFloor agents={agents} workers={workers} />
        <PortfolioPanel projects={projects} agents={agents} />
      </div>
    </div>
  );
}
