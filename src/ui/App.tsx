import { type FC, useEffect, useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./hooks/useStatistics";
import Chart from "./components/Chart";

function App() {
  const staticData = useStaticData();
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
        return { activeViewTitle: "RAM Usage (%)", stats: RAMUsages };
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
    <div className="App">
      <Header />
      <div className="main">
        <div>
          <SelectOption
            title="CPU %"
            view="CPU"
            subTitle={staticData?.CPUModel ?? ""}
            data={cpuUsages}
            onCLick={() => setCurrentView("CPU")}
          />
          <SelectOption
            title="RAM"
            view="RAM"
            subTitle={(staticData?.totalMemoryGB.toString() ?? "") + "GB"}
            data={RAMUsages}
            onCLick={() => setCurrentView("RAM")}
          />
          <SelectOption
            title="STORAGE"
            view="STORAGE"
            subTitle={(staticData?.totalStorage.toString() ?? "") + "GB"}
            data={storageUsages}
            onCLick={() => setCurrentView("STORAGE")}
          />
        </div>
        <div className="mainGrid">
          {activeViewTitle}
          <Chart selectedView={currentView} data={stats} fill="#fff" stroke="#fff" maxDataPoints={10} />
        </div>
      </div>
    </div>
  );
};

export const Header: FC = () => {
  return (
    <header>
      <button id="close" onClick={() => window.electron.sendFrameAction("CLOSE")} aria-label="close" />
      <button id="minimize" onClick={() => window.electron.sendFrameAction("MINIMIZE")} aria-label="minimize" />
      <button id="maximize" onClick={() => window.electron.sendFrameAction("MAXIMIZE")} aria-label="maximize" />
    </header>
  );
}

type TSelectOptionProps = {
  title: string;
  view: TView;
  subTitle: string;
  data: number[];
  onCLick:  () => void;
}

export const SelectOption: FC<TSelectOptionProps> = (props) => {
  const { title, subTitle, view } = props;

  return (
    <button className="selectOption" onClick={props.onCLick}>
      <div className="selectOptionTitle">
        <p>{title}</p>
        <p>{subTitle}</p>
      </div>
      <div className="selectOptionChart">
        <Chart selectedView={view} data={[]} fill="#fff" stroke="#fff" maxDataPoints={10} />
      </div>
    </button>
  );
};

const useStaticData = () => {
  const [staticData, setStaticData] = useState<TStaticData | null>(null);

  useEffect(() => {
    (async () => {
      setStaticData(await window.electron.getStaticData());
    })();
  }, []);

  console.log(staticData);

  return staticData;
}

export default App;
