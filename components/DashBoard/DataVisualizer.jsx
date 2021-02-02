import { useEffect, useState } from "react";
import Link from "next/link";
import { useData } from "../../hooks/useData";
import Highlight from "react-highlight";
import dynamic from 'next/dynamic'
import moment from "moment";
import { LoadingText } from "../Loading/LoadingText";

const DynamicLineChart = dynamic(
  () => import("./Charts/LineChart").then(mod => mod.LineChart),
  {ssr: false }
)

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

  const initialFilterValues = {
    crossing_from: null,
    crossing_to: null,
    sailing_date: String(moment().format("yyyy-M-D")),
    sailing_time: null,
  }
  // Used to populate the dropdowns etc.
  const initialFormData = {
    from_terminals: [],
    to_terminals: [],
    sailing_dates: [],
    sailing_times: ["08:00", "12:00", "20:00"],
  }
  
  const [filter, setFilter] = useState(initialFilterValues);
  const [formData, setFormData] = useState();
  
  const [showChart, setShowChart] = useState();
  const [isProcessing, setIsProcessing] = useState(false)


  // Bring in the data context
  const { data, setData, getFilteredData, getBarChartData } = useData();

  const handleFilterChange = (e) => {
    // Any time a filter option is changed
    e.preventDefault();
    console.log('e.target', e.target)
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      <div className="flex flex-col justify-center text-center align-evenly my-4 mx-4">
        <h2>Visualizer (still in early development)</h2>
        <form
          action=""
          className="flex flex-row flex-wrap justify-around align-center px-4 mx-4 my-2"
        >
        
          <div className="flex flex-col justify-end align-start my-2">
            {/* <h2>Choose a crossing to visualize</h2> */}
            <label htmlFor="">Select a Crossing</label>
            <select
              style={{ maxWidth: "70vw" }}
              name="crossing_from"
              id="crossing_from"
              onChange={handleFilterChange}
              value={filter.crossing_from ? filter.crossing_from : ""}
            >
              <option key={"EmptyCrossingFromOption"} value={""}>
                {"    "}
              </option>
              {DEFAULT_TERMINALS.map((terminalOption) => (
                <option key={terminalOption.name} value={terminalOption.value}>
                  {terminalOption.name}
                </option>
              ))}
            </select>

            {/* <label htmlFor="">To</label>
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
            </select> */}
          </div>

          <div className="flex flex-col align-start my-2 mx-2">
            <label htmlFor="">Crossing Date</label>
            <input
              type="date"
              name="sailing_date"
              onChange={handleFilterChange}
              value={filter.sailing_date}
            />
            {/* <label htmlFor="">Crossing Time (not implemented yet)</label> */}
            {/* <input
              type="time"
              name="crossing_time"
              disabled={true}
              onChange={handleFilterChange}
            /> */}

            {/* <select
              name="sailing_time"
              id=""
              disabled={true}
              value={filter.sailing_time | ""}
              onChange={handleFilterChange}
            >
              {formData.sailing_times.map((sailing_time) => (
                <option key={sailing_time} value={sailing_time}>
                  {sailing_time}
                </option>
              ))}
            </select> */}
          </div>
          
          <button
            className="button-primary"
            disabled={!(filter.crossing_from || filter.sailing_date)}
            onClick={async (e) => {
              setIsProcessing(true)
              e.preventDefault();
              await getFilteredData(filter);
              setShowChart(true)
              setIsProcessing(false)
            }}
          >
            Refresh Chart
          </button>
          
        </form>
        {/* Render the Bar Char here using NextJs Dynamic/ClientOnly Component */}
        {isProcessing === true ? (<LoadingText />) : (
          <DynamicLineChart filter={filter} showChart={showChart} />
        )}
       
        {/* <Plot
          data={plotlyObject.data}
          layout={plotlyObject.layout}
          onInitialized={(figure) => setState({ ...state, figure: figure })}
          onUpdate={(figure) => setState({ ...state, figure: figure })}
        /> 
        
        <Highlight className="json text-left">
          {JSON.stringify(data, null, 2)}
        </Highlight> */}
      </div>
    </>
  );
};

// Array.from(rsd).reduce((arr, dp)=>(arr.push()), [{x: [], y: []}])
