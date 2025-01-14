import { useMemo } from "react";
import BaseChart from "./BaseChart";

export type TChartProps = {
  data: number[];
  fill: string;
  stroke: string;
  maxDataPoints: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
}

const COLOR_MAP = {
  CPU: {
    stroke: "#5DD4EE",
    fill: "#0A4D5C",
  },
  RAM: {
    stroke: "#E99311",
    fill: "#5F3C07",
  },
  STORAGE: {
    stroke: "#1ACF4D",
    fill: "#0B5B22",
  },
}

const Chart = (props: TChartProps) => {
  const color = useMemo(() => COLOR_MAP[props.selectedView], [props.selectedView]);
  const { data, maxDataPoints } = props;
  const preparedData = useMemo(() => {
    const preparedData = data.map((data) => ({ value: data * 100 }));
    
    return [
      ...preparedData,
      ...Array.from({ length: maxDataPoints - preparedData.length }).map(() => ({ value: undefined}))
    ];
  }, [data, maxDataPoints]);

  

  return (
    <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke}  />
  )
};

export default Chart;
