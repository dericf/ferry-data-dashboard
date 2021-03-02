import "../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  ChartLabel,
  LineSeries,
} from "react-vis";

export const PredictionResultChart = () => {
  return (
    <XYPlot stackBy="y" width={300} height={300}>
      <XAxis />
      <YAxis />
      <VerticalGridLines />
      <HorizontalGridLines />
      <LineSeries
        data={[
          { x: 1, y: 10 },
          { x: 2, y: 5 },
          { x: 3, y: 15 },
        ]}
      />
      <LineSeries
        data={[
          { x: 1, y: 12 },
          { x: 2, y: 21 },
          { x: 3, y: 2 },
        ]}
      />
    </XYPlot>
  );
};
