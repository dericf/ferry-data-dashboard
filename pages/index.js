/*
 * https://www.npmjs.com/package/react-csv
 */
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CSVLink, CSVDownload } from "react-csv";
import { useEffect, useState } from "react";
import ActionBar from "../components/ActionBar";
import ConfirmModal from "../components/ConfirmModal";
import InfoModal from "../components/InfoModal";
import CapacityDataPointInfo from "../components/CapacityDataPointInfo";
import { date_format, time_format } from "../utilities/dates";

export default function Dashboard({ data, loading }) {
  const [csvData, setCsvData] = useState([]);
  const [tableData, setTableData] = useState();
  const [terminals, setTerminals] = useState();
  const [selectedTerminal, setSelectedTerminal] = useState();

  const headers = [
    { label: "id", key: "id" },
    { label: "crossing_name", key: "crossing_name" },
    { label: "time_of_sailing", key: "time_of_sailing" },
    { label: "date_recorded", key: "date_recorded" },
    { label: "time_recorded", key: "time_recorded" },
    { label: "percent_available", key: "percent_available" },
    { label: "created_at", key: "created_at" },
    { label: "updated_at", key: "updated_at" },
  ];

  // let formatted_date_string = new Date().toUTCString().replace(/ /g, "_").replace(/,/g, "").replace(/:/g, "_")

  const refreshData = async () => {
    const resp = await fetch("/api/get-limited-data");
    const json = await resp.json();

    setTableData(json.capacity_data);
  };

  const refreshTerminals = async () => {
    const resp = await fetch("/api/get-terminals");
    const json = await resp.json();

    setTerminals(json.terminal);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const download = async () => {
    // Fetch the entire dataset
    const resp = await fetch("/api/downloadcsv");
    const json = await resp.json();
    setCsvData(json.capacity_data);
  };

  useEffect(() => {
    (async () => {
      refreshData();
      refreshTerminals();
    })();
  }, []);

  useEffect(() => {
    if (terminals) {
      setSelectedTerminal(terminals[0]);
    }
  }, [terminals]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Head>
        <title>Ferry Data Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO: move css to file */}
      <main
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          overflow: "scroll",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          backgroundColor: "#303030",
          color: "white",
          padding: "2rem",
        }}
      >
        <div className="flex flex-center align-center">
          <h1 style={{ textAlign: "center" }}>Capacity Data</h1>
          {/* <button className="button" onClick={downloadData}>Download</button> */}
          {!loading && (
            <button className="download-button" onClick={download}>
              Download All Data as CSV
            </button>
          )}
          <button className="download-button" onClick={refreshData}>
            Refresh Table
          </button>
        </div>
        <div className="flex flex-row" style={{ flexShrink: "0", flexGrow: 1}}>
        {!tableData ? ( <p>Data is Loading...</p>) : (
          <p style={{ textAlign: "left", marginBottom: "0.5rem" }}>
            Note: This table only displays the 1000 newest entries. Download
            button will download entire datet.
          </p>
        )}
          {terminals && (
            <ActionBar
              terminals={terminals}
              selectedTerminal={selectedTerminal}
              onChange={(e) => setSelectedTerminal(e.target.value)}
            />
          )}
        </div>
        
        {tableData && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Crossing Name</th>
                <th colSpan="2">Date/Time of Sailing</th>
                <th className="center">Capacity (Available)</th>
                <th colSpan="2">Date / Time Recorded</th>
                <th className="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td className="right">{row.id}</td>
                  <td className="left">{row.crossing_name}</td>
                  <td className="right" style={{ borderRight: "none" }}>
                    {date_format(row.date_of_sailing)}
                  </td>
                  <td className="right" style={{ borderLeft: "none" }}>
                    {time_format(
                      row.date_of_sailing + " " + row.time_of_sailing,
                    )}
                  </td>
                  <td className="center">{row.percent_available} %</td>
                  <td className="right">{date_format(row.date_recorded)}</td>
                  <td className="right">
                    {time_format(row.date_recorded + " " + row.time_recorded)}{" "}
                  </td>
                  <td className="right">
                    <div
                      className="flex flex-row justify-center align-center"
                      style={{ width: "6rem" }}
                    >
                      {/* <ConfirmModal message={`Are you sure you want to delete ${row.crossing_name}`} onConfirm={() => (console.log("CONGIMED"))} /> */}
                      <InfoModal>
                        <CapacityDataPointInfo datapoint={row} />
                      </InfoModal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {csvData.length > 0 && (
          <CSVDownload
            data={csvData}
            headers={headers}
            target="_blank"
            filename={`ferry-data.csv`}
          ></CSVDownload>
        )}
      </main>
    </div>
  );
}
