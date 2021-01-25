/*
  * https://www.npmjs.com/package/react-csv
*/
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CSVLink, CSVDownload } from "react-csv";
import { useEffect, useState } from "react";

export default function Dashboard({ data, loading }) {
  const [csvData, setCsvData] = useState([]);
  const [tableData, setTableData] = useState();

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
    
    setTableData(json.capacity_data)
  }

  
  const download = async (event, done) => {
    const resp = await fetch("/api/downloadcsv");
    const json = await resp.json();
    console.log("Response: ", json)
    setCsvData(json.capacity_data)
    setTimeout(() => {
      done(); // REQUIRED to invoke the logic of component
      
    }, 2000);
  }

  useEffect(() => {
    (async () =>{
      refreshData()
    }
    )()
    
  }, [])

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

      <main
        style={{
          minHeight: "50vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            <CSVLink data={csvData} headers={headers} asyncOnClick={true} filename={`ferry-data.csv`} onClick={(event, done)=>(download(event, done))}>
              <button className="download-button">
                Download All Data as CSV
              </button>
            </CSVLink>

          )}
            <button className="download-button" onClick={refreshData}>
              Refresh Table
            </button>
        </div>
        <span style={{textAlign:"left", marginBottom:"0.5rem"}}>Note: This table only displays the 1000 newest entries. Download button will download entire dataset.</span>
        {!tableData && (
          <span>Data is Loading...</span>
        )}
        {tableData && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Crossing Name</th>
                <th>Time of Sailing</th>
                <th className="center">Capacity (% Available)</th>
                <th colSpan="2">Date (yyyy-mm-dd) / Time Recorded</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td className="right">{row.id}</td>
                  <td className="left">{row.crossing_name}</td>
                  <td className="right">{row.time_of_sailing}</td>
                  <td className="center">{row.percent_available} %</td>
                  <td className="right">
                    {row.date_recorded}
                  </td>
                  <td className="right">
                    {row.time_recorded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}