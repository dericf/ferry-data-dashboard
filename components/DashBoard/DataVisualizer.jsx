import { useEffect, useState } from "react";
import Link from "next/link";
// import Plot from "react-plotly.js";
import { useData } from "../../hooks/useData";
import Highlight from "react-highlight";

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
  // let Plot;
  const [selectedCrossing, setSelectedCrossing] = useState();

  const DEFAULT_TERMINALS = [
    {
      name: "Vancouver (Tsawwassen) - Nanaimo (Duke Point)",
      value: "Vancouver (Tsawwassen) - Nanaimo (Duke Point)",
    },
    {
      name: "Vancouver (Tsawwassen) - Southern Gulf Islands",
      value: "Vancouver (Tsawwassen) - Southern Gulf Islands",
    },
    {
      name: "Vancouver (Tsawwassen) - Victoria (Swartz Bay)",
      value: "Vancouver (Tsawwassen) - Victoria (Swartz Bay)",
    },
    {
      name: "Victoria (Swartz Bay) - Southern Gulf Islands",
      value: "Victoria (Swartz Bay) - Southern Gulf Islands",
    },
    {
      name: "Victoria (Swartz Bay) - Salt Spring Island (Fulford Harbour)",
      value: "Victoria (Swartz Bay) - Salt Spring Island (Fulford Harbour)",
    },
    {
      name: "Victoria (Swartz Bay) - Vancouver (Tsawwassen)",
      value: "Victoria (Swartz Bay) - Vancouver (Tsawwassen)",
    },
    {
      name: "Vancouver (Horseshoe Bay) - Bowen Island (Snug Cove)",
      value: "Vancouver (Horseshoe Bay) - Bowen Island (Snug Cove)",
    },
    {
      name: "Vancouver (Horseshoe Bay) - Sunshine Coast (Langdale)",
      value: "Vancouver (Horseshoe Bay) - Sunshine Coast (Langdale)",
    },
    {
      name: "Vancouver (Horseshoe Bay) - Nanaimo (Departure Bay)",
      value: "Vancouver (Horseshoe Bay) - Nanaimo (Departure Bay)",
    },
    {
      name: "Nanaimo (Departure Bay) - Vancouver (Horseshoe Bay)",
      value: "Nanaimo (Departure Bay) - Vancouver (Horseshoe Bay)",
    },
    {
      name: "Nanaimo (Duke Point) - Vancouver (Tsawwassen)",
      value: "Nanaimo (Duke Point) - Vancouver (Tsawwassen)",
    },
  ];

  const TERMS = [
    "Vancouver (Tsawwassen)",
    "Victoria (Swartz Bay)",
    "Vancouver (Horseshoe Bay)",
    "Nanaimo (Departure Bay)",
    "Nanaimo (Duke Point)",
  ];

  const [filter, setFilter] = useState({
    crossing_from: null,
    crossing_to: null,
    sailing_date: null,
    sailing_time: null,
  });

  const [formData, setFormData] = useState({
    from_terminals: [],
    to_terminals: [],
    sailing_dates: [],
    sailing_times: ["08:00", "12:00", "20:00"],
  });

  const { data, setData, getFilteredData } = useData();

  const [chartData, setChartData] = useState([]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const plotlyObject = {
    data: [
      {
        name: "Sailing at: 2020-01-01 08:00",
        y: [100, 80, 76, 23, 10],
        x: [
          "2020-01-01 00:00",
          "2020-01-01 00:01",
          "2020-01-01 00:02",
          "2020-01-01 00:03",
          "2020-01-01 00:04",
        ],
        type: "bar",
      },
      {
        name: "Sailing at: 2020-01-01 12:00",

        y: [100, 80, 46, 13, 6],
        x: [
          "2020-01-01 00",
          "2020-01-01 00:01",
          "2020-01-01 00:02",
          "2020-01-01 00:03",
          "2020-01-01 00:04",
        ],

        type: "bar",
      },
      {
        name: "Sailing at: 2020-01-01 16:30",

        y: [100, 90, 86, 73, 50],
        x: [
          "2020-01-01 00",
          "2020-01-01 00:01",
          "2020-01-01 00:02",
          "2020-01-01 00:03",
          "2020-01-01 00:04",
        ],

        type: "bar",
      },
      {
        name: "Sailing at: 2020-01-01 20:00",
        y: [100, 90, 86, 43, 10],
        x: [
          "2020-01-01 00",
          "2020-01-01 00:01",
          "2020-01-01 00:02",
          "2020-01-01 00:03",
          "2020-01-01 00:04",
        ],
        type: "bar",
      },
    ],
    layout: {
      height: 700,
      width: 1000,
      barmode: "group",
      // barnorm: ,
    },
  };

  // useEffect(() => {
  //   if (typeof document !== "undefined") {
  //     Plot = import("react-plotly.js");
  //   }
  // }, []);

  useEffect(() => {
    let ob = {};
    for (let d of data) {
      ob[d.date_of_sailing + " " + d.time_of_sailing] = {
        name: d.date_of_sailing + " " + d.time_of_sailing,
        x: [],
        y: [],
      };
    }

    for (let d of data) {
      ob[d.date_of_sailing + " " + d.time_of_sailing].x.push(
        d.date_recorded + " " + d.time_recorded,
      );
      ob[d.date_of_sailing + " " + d.time_of_sailing].y.push(
        d.percent_available,
      );
    }

    let arr = Array.from(Object.values(ob));
    console.log("sd..........", ob);
    console.log("Arrry..........", arr);
    setChartData(arr);
  }, [data]);

  /*
...(sd && sd[d.crossing_name] && sd[d.crossing_name][d.date_of_sailing + " " + d.time_of_sailing]?.length > 0 && sd[d.crossing_name][d.date_of_sailing + " " + d.time_of_sailing]),
            
*/

  return (
    <>
      {/* <div className="flex justify-center align-center flex-row" style={{width:"80vw", height: "80vh"}}>
    </div> */}
      <div className="flex flex-col justify-center text-center align-center my-4 mx-4">
        <h2>Visualizer is still under development</h2>
        <form
          action=""
          className="flex flex-row flex-wrap justify-around align-center px-4 mx-4 my-2"
        >
          <div className="flex flex-col align-start my-2">
            <label htmlFor="">From</label>
            <select
              style={{ maxWidth: "70vw" }}
              name="crossing_from"
              id="crossing_from"
              onChange={handleFilterChange}
              value={filter.crossing_from | ""}
            >
              {DEFAULT_TERMINALS.map((terminalOption) => (
                <option key={terminalOption.name} value={terminalOption.value}>
                  {terminalOption.name}
                </option>
              ))}
            </select>

            <label htmlFor="">To</label>
            <select
              style={{ maxWidth: "70vw" }}
              name="crossing_to"
              id="crossing_to"
              onChange={handleFilterChange}
              value={filter.crossing_to | ""}
            >
              {DEFAULT_TERMINALS.map((terminalOption) => (
                <option key={terminalOption.name} value={terminalOption.value}>
                  {terminalOption.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col align-start my-2 mx-2">
            <label htmlFor="">Crossing Date</label>
            <input
              type="date"
              name="sailing_date"
              onChange={handleFilterChange}
              value={filter.sailing_date | ""}
            />
            <label htmlFor="">Crossing Time</label>
            {/* <input
              type="time"
              name="crossing_time"
              disabled={true}
              onChange={handleFilterChange}
            /> */}

            <select
              name="sailing_time"
              id=""
              value={filter.sailing_time | ""}
              onChange={handleFilterChange}
            >
              {formData.sailing_times.map((sailing_time) => (
                <option key={sailing_time} value={sailing_time}>
                  {sailing_time}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              getFilteredData(null);
            }}
          >
            Get Data
          </button>
        </form>
        {/* {typeof document !== "undefined" && chartData?.length > 0 && (
        <Plot
          data={plotlyObject.data}
          layout={plotlyObject.layout}
          onInitialized={(figure) => setState({ ...state, figure: figure })}
          onUpdate={(figure) => setState({ ...state, figure: figure })}
        />
        )} */}

        {/* <Highlight className="json text-left">
          {JSON.stringify(data, null, 2)}
        </Highlight> */}
      </div>
    </>
  );
};

// Array.from(rsd).reduce((arr, dp)=>(arr.push()), [{x: [], y: []}])
