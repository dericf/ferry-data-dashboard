import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useData } from "../../../hooks/useData";
import { timeFormat } from "../../../utilities/dates";

export const LineChart = () => {
  const [barChartData, setBarChartData] = useState(null);
  const { data, dataFilter } = useData();
  
  const reFormatData = () => {
    let builderObject = {};
    // Build the basic structure of the object
    for (let d of data) {
      builderObject[d.date_of_sailing + " " + d.time_of_sailing] = {
        name: timeFormat(d.date_of_sailing + " " + d.time_of_sailing),
        x: [],
        y: [],
        type: "line",
      };
    }
    // Now populate the x and y arrays
    for (let d of data) {
      builderObject[d.date_of_sailing + " " + d.time_of_sailing].x.push(
        d.date_recorded + " " + d.time_recorded,
      );
      builderObject[d.date_of_sailing + " " + d.time_of_sailing].y.push(
        d.percent_available,
      );
    }

    return Array.from(Object.values(builderObject));
  };

  useEffect(() => {
    setBarChartData(reFormatData());
  }, []);
  
  useEffect(() => {
    console.log("data...");
    setBarChartData(reFormatData());
  }, [data]);

  const layout = {
    width: 4*window?.innerWidth/5,
    height: window?.innerHeight/2,
    xaxis: { title: "Date & Time" },
    yaxis: { title: "Capacity Available (%)", range: [0, 100] },
    barmode: "group",
    legend: {
      orientation: "h",
      x: 0,
      y: 1.2,
      yanchor: "top",
      xanchor: "left",
      itemclick: "toggle",
    },
  };
  return (
    <div className="flex flex-col justify-center align-center overflow-x-auto px-4">
      {barChartData && barChartData.length == 0 && (
				<h2>No Results</h2>
			)}
      {barChartData && barChartData.length > 0 && (
        <>
          {dataFilter.crossing_from && (<h2>{dataFilter.crossing_from}</h2>)}
          {/* TODO: set the figure object so we can change properties dynamically */}
          <Plot data={barChartData} layout={layout} />
        </>
      )}
    </div>
  );
};
