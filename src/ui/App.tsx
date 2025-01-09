import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useStatistics } from './hooks/useStatistics';
import Chart from './components/Chart';

function App() {
  const [count, setCount] = useState(0);
  const statistics = useStatistics(10);
  const cpuUsages = useMemo(() => statistics.map((stat) => stat.CPUUsage), [statistics]);

  // console.log(`Statistics -> ${statistics.length}`);

  return (
    <>
      <div>
        <div style={{ height: 120, display: "flex", flexDirection: "column", gap: 15 }}>
          CPU Usage (%)
          <Chart data={cpuUsages} fill="#fff" stroke="#fff" maxDataPoints={10} />
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
