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
import DataTable from "../components/DataTable";
import WorkerPortal from "../components/WorkerPortal";
import { useToggle } from "../hooks/useToggle";
import { useInputValue } from "../hooks/useInputValue";
import { useBasicAuth } from "../hooks/useBasicAuth";
import DownloadCSVButton from "../components/DownloadCSVButton";
import { useAlertPopup } from "../hooks/useAlert";
import AlertPopup from "../components/AlertPopup";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import LoadingBackdrop from "../components/LoadingBackdrop";

export default function Dashboard({ data }) {
  const [tableData, setTableData] = useState();
  const [terminals, setTerminals] = useState();
  const [selectedTerminal, setSelectedTerminal] = useState();
  const { loading, setLoading } = useLoadingScreen();

  const [open, toggle] = useToggle(null);
  const { auth, setAuth } = useBasicAuth(true);
  const { value: pwd } = useInputValue();

  const { alertText, setAlertText, setAlertStatus } = useAlertPopup(
    "TESTINETG",
  );

  // let formatted_date_string = new Date().toUTCString().replace(/ /g, "_").replace(/,/g, "").replace(/:/g, "_")

  const refreshData = async () => {
    setLoading(true);
    const resp = await fetch("/api/get-limited-data", {
      headers: { "X-AUTH": pwd },
    });
    const json = await resp.json();

    setTableData(json.capacity_data);
    setLoading(false);
  };

  const refreshTerminals = async () => {
    const resp = await fetch("/api/get-terminals");
    const json = await resp.json();

    setTerminals(json.terminal);
  };

  useEffect(() => {
    (async () => {
      refreshData();
      // refreshTerminals();
    })();
  }, [auth]);

  useEffect(() => {
    if (terminals) {
      setSelectedTerminal(terminals[0]);
    }
  }, [terminals]);

  return (
    <div className="container">
      {loading && <LoadingBackdrop />}
      <Head>
        <title>Ferry Data Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO: move css to file */}
      <main
        className={loading ? "blur" : ""}
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          color: "white",
          padding: "2rem",
        }}
      >
        <div className="flex flex-row flex-shrink flex-no-grow justify-between align-start flex-wrap">
          <h1 onClick={toggle} style={{ textAlign: "left" }}>
            Ferry Capacity Data
          </h1>
          {/* <button className="button" onClick={downloadData}>Download</button> */}

          <WorkerPortal></WorkerPortal>

          <DownloadCSVButton />

          {alertText?.length > 0 && (
            <AlertPopup text={alertText} setText={setAlertText} />
          )}
        </div>
        <div className="flex flex-row justify-around align-center flex-wrap my-2">
          <button
            disabled={!auth}
            className="button-secondary align-self-center"
            onClick={refreshData}
          >
            Refresh Table
          </button>

          <button
            className="button-secondary align-self-center mx-2"
            onClick={() => setAlertText("Testing this alert out")}
          >
            Settings
          </button>
          {tableData && auth && (
            <p className="text-left">
              Note: This table only displays the 100 newest entries. Download
              button will download entire datet.
            </p>
          )}
          {/* {terminals && (
            <ActionBar
              terminals={terminals}
              selectedTerminal={selectedTerminal}
              onChange={(e) => setSelectedTerminal(e.target.value)}
            />
          )} */}
        </div>

        {/* Render the Table */}
        {auth && <DataTable tableData={tableData}></DataTable>}
      </main>
    </div>
  );
}
