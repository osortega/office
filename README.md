# Office Dashboard

A visual office dashboard where the CEO can see their digital team working — like looking down at an isometric office from above.

## Features

- **Visual Office Floor** — agents shown at desks in a grid layout with status indicators
- **Agent Cards** — name, role, avatar, current task, success rate, and working status
- **Real-time Animations** — typing indicators, pulse effects on active agents, task completion celebrations
- **Portfolio Panel** — side panel showing all projects with progress bars, status badges, and assigned teams
- **Office Decorations** — meeting room, water cooler, plants, and coffee station for ambiance
- **Responsive Design** — works on desktop (primary) and tablet

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — fast dev server and build tool
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AgentDesk.tsx        # Individual agent desk card
│   ├── Header.tsx           # Dashboard header with stats
│   ├── OfficeDecorations.tsx # Office amenity items
│   ├── OfficeFloor.tsx      # Main office grid layout
│   ├── PortfolioPanel.tsx   # Side panel with project list
│   ├── StatusBadge.tsx      # Agent status indicator
│   └── TypingIndicator.tsx  # Animated typing dots
├── data/
│   ├── mockData.ts          # Mock agents & projects (swap with API later)
│   └── types.ts             # TypeScript interfaces
├── App.tsx                  # Root component
├── index.css                # Tailwind imports
└── main.tsx                 # Entry point
```

## Mock Data

All mock data lives in `src/data/mockData.ts`. Replace with real API calls when connecting to a backend — the data shapes are defined in `src/data/types.ts`.
