// import Plotly from "plotly.js-dist";
import { useEffect, useState } from "react";
import Link from "next/link";
// import Plot from "react-plotly.js";
import { useData } from "../../hooks/useData";

// {/* <Plot
//     data={[
//       {
//
//         type: 'scatter',
//         mode: 'lines+markers',
//         marker: {color: 'red'},
//       },
//       {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
//     ]}

//   /> */}

export const DataVisualizer = () => {
  const {
    data: tableData,
    setData: setTableData,
    refreshData,
    getFullData,
    structuredData,
  } = useData();

  const [rsd, setRsd] = useState([]);

  const [selectedCrossing, setSelectedCrossing] = useState();

  // [
  //  {}
  //   {
  //     x: [],
  //     y: [],
  //   }
  // ]

  // const d = `{
  //   "name": [
  //     "2021-01-26": [
  //       "10:00": [
  //         {
  //           x: "2021-01-26 10:00",
  //           y: 36
  //         }
  //       ],
  //       "12:30": [
  //         {
  //           x: "2021-01-26 12:30",
  //           y: 80
  //         }
  //       ],
  //   ],
  //   "name": {
  //     "10:00": {

  //     }
  //   }
  // }`;

  const [state, setState] = useState({
    data: [],
    layout: {
      title: "Capacity over time", // more about "layout.title": #layout-title
      xaxis: {
        // all "layout.xaxis" attributes: #layout-xaxis
        title: "time", // more about "layout.xaxis.title": #layout-xaxis-title
      },
    },
    frames: [],
    figure: null,
    config: {
      responsive: true,
    },
  });

  useEffect(() => {
    if (structuredData) {
      
      for (const [crossing, date] of Object.entries(structuredData)) {
        // console.log('Crosing:' + crossing);
        for (const [time, dateTime] of Object.entries(date)) {
          // console.log('Date: ' + date, ' | time: ' + time);
          for (const [dT, recordedAt] of Object.entries(dateTime)) {
            // console.log('DateTime: ' + dT);
            // console.log('recorded_at: ' + Object.entries(recordedAt));
            for (const [rAt, dataPoint] of Object.entries(recordedAt)) {
              let x = [];
              let y = [];
              for (let d of dataPoint) {
                // console.log("x: " + Object.entries(d));
                x.push(d["x"].split("+")[0]);
                y.push(d["y"]);
              }
              setRsd([
                ...rsd,
                {
                  type: "scatter",
                  name: crossing + " on " + dT + " as of " + rAt,
                  x,
                  y,
                  marker: {
                    // marker is an object, valid marker keys: #scatter-marker
                    color: "rgb(16, 32, 77)", // more about "marker.color": #scatter-marker-color
                  },
                },
              ]);
            }
          }
        }
      }
      // console.log(ar);
      
    }
  }, [structuredData]);


  useEffect(() => {
    console.log(rsd)
  }, [rsd])

  useEffect(() => {
    if (state.figure) {
      console.log(state.figure)
    }
  }, [state])

  return (
    <>
      {/* <div className="flex justify-center align-center flex-row" style={{width:"80vw", height: "80vh"}}>
    </div> */}
      <div className="flex flex-row justify-start align-center my-4 mx-4">
        <Link href={"/dashboard"}>
          <button className="mx-2">DashBoard</button>
        </Link>
        <button className=" mx-2" onClick={() => getFullData()}>
          Use Full Dataset
        </button>

        <button className=" mx-2" onClick={() => refreshData()}>
          Refresh Data
        </button>
        {selectedCrossing}
        <select
          name="selectedCrossing"
          id="selectedCrossing"
          onChange={(e) => setSelectedCrossing(e.target.value)}
        >
          <option key={1} value="1">
            Van
          </option>
          <option key={2} value="2">
            Vic
          </option>
        </select>
      </div>
      {/* {structuredData && rsd && (
        <Plot
          data={rsd}
          layout={state.layout}
          frames={state.frames}
          config={state.config}
          onInitialized={(figure) => setState({ ...state, figure: figure })}
          onUpdate={(figure) => setState({ ...state, figure: figure })}
        />
      )} */}
    </>
  );
};

// Array.from(rsd).reduce((arr, dp)=>(arr.push()), [{x: [], y: []}])
