import { agents, projects } from './data/mockData';
import Header from './components/Header';
import OfficeFloor from './components/OfficeFloor';
import PortfolioPanel from './components/PortfolioPanel';

export default function App() {
  const activeCount = agents.filter((a) => a.status === 'working').length;

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header agentCount={agents.length} activeCount={activeCount} />

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <OfficeFloor agents={agents} />
        <PortfolioPanel projects={projects} agents={agents} />
      </div>
    </div>
  );
}
