import { useMemo } from "react";
import BaseChart from "./BaseChart";

export type TChartProps = {
  data: number[];
  fill: string;
  stroke: string;
  maxDataPoints: number;
}

const Chart = (props: TChartProps) => {
  const { data, fill, stroke, maxDataPoints } = props;
  const preparedData = useMemo(() => {
    const preparedData = data.map((data) => ({ value: data * 100 }));
    
    return [
      ...preparedData,
      ...Array.from({ length: maxDataPoints - preparedData.length }).map(() => ({ value: undefined}))
    ];
  }, [data, maxDataPoints]);

  

  return (
    <BaseChart data={preparedData} fill={fill} stroke={stroke}  />
  )
};

export default Chart;
