import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useStatistics } from './hooks/useStatistics';
import Chart from './components/Chart';

function App() {
  const [count, setCount] = useState(0);
  const statistics = useStatistics(10);
  const [currentView, setCurrentView] = useState<TView>("CPU");
  const cpuUsages = useMemo(() => statistics.map((stat) => stat.CPUUsage), [statistics]);
  const RAMUsages = useMemo(() => statistics.map((stat) => stat.RAMUsage), [statistics]);
  const storageUsages = useMemo(() => statistics.map((stat) => stat.totalStorage), [statistics]);

  const { activeViewTitle, stats } = useMemo(() => {
    switch (currentView) {
      case "CPU":
        return { activeViewTitle: "CPU Usage (%)", stats: cpuUsages };
      case "RAM":
        return { activeViewTitle: "RAM USage (%)", stats: RAMUsages };
      case "STORAGE":
        return { activeViewTitle: "Storage Usage (%)", stats: storageUsages };
      default:
        return { activeViewTitle: "CPU Usage (%)", stats: cpuUsages };;
    }
  }, [RAMUsages, cpuUsages, currentView, storageUsages]);

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setCurrentView(view));
  }, []);

  return (
    <>
      <div>
        <header>
          <button id="close" onClick={() => window.electron.sendFrameAction("CLOSE")} />
          <button id="minimize" onClick={() => window.electron.sendFrameAction("MINIMIZE")} />
          <button id="maximize" onClick={() => window.electron.sendFrameAction("MAXIMIZE")} />
        </header>
        <div style={{ width: "minContent", height: 120, display: "flex", flexDirection: "column", gap: 15, marginTop: 15 }}>
          {activeViewTitle}
          <Chart data={stats} fill="#fff" stroke="#fff" maxDataPoints={10} />
        </div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
};

export default App;
