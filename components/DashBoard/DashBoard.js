/*
 * https://www.npmjs.com/package/react-csv
 */
import Head from "next/head";
import { useEffect, useState } from "react";

import InfoModal from "../InfoModal";

import DataTable from "../DataTable";
import WorkerPortal from "../WorkerPortal";
import { useToggle } from "../../hooks/useToggle";
import { useBasicAuth } from "../../hooks/useBasicAuth";
import DownloadCSVButton from "../DownloadCSVButton";
import { useAlert } from "../../hooks/useAlert";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";
import { useData } from "../../hooks/useData";
import LoadingBackdrop from "../LoadingBackdrop";
import AlertPopup from "../Alert";
import { Auth } from "../Auth";
import { DataVisualizer } from "./DataVisualizer";
// import { DataVisualizer from "./DataVisualizer

export default function Dashboard({ data }) {
  const { data: tableData, setData: setTableData } = useData();
  const [terminals, setTerminals] = useState();
  const [selectedTerminal, setSelectedTerminal] = useState();
  const { loading, loadingMessage, setLoading } = useLoadingScreen();

  const [open, toggle] = useToggle(null);
  const { isAuthenticated, pwd } = useBasicAuth();

  // const {alertText, setAlertText, setAlertStatus} = useAlertPopup()
  const { resetAlert, sendAlert, sendError } = useAlert();

  // let formatted_date_string = new Date().toUTCString().replace(/ /g, "_").replace(/,/g, "").replace(/:/g, "_")

  const refreshData = async () => {
    setLoading(true, "Loading Fresh Data");
    const authInfo = encodeURIComponent(pwd);
    const resp = await fetch("/api/get-limited-data", {
      headers: { "X-Password": authInfo },
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
    if (isAuthenticated === true) {
      (async () => {
        refreshData();
        // refreshTerminals();
      })();
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   if (terminals) {
  //     setSelectedTerminal(terminals[0]);
  //   }
  // }, [terminals]);

  return (
    <div className="container">
      {loading && <LoadingBackdrop message={loadingMessage} />}
      <Head>
        <title>Ferry Data Dashboard</title>
        <link key="favicon" rel="icon" href="/favicon.ico" />
      </Head>
      <AlertPopup />
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
          <h1 onClick={toggle} className="text-center">
            Ferry Capacity Dashboard
          </h1>
        </div>
        <div className="flex flex-row flex-shrink flex-no-grow justify-center align-center flex-wrap">
          <Auth></Auth>
          <WorkerPortal></WorkerPortal>
          {isAuthenticated && (
            <div className="flex flex-col">
              <InfoModal
                triggerText={"Show Visualizer"}
                onOpen={() => console.log("On Open/...")}
                titleText={"Data Visualizer"}
              >
                <DataVisualizer />
              </InfoModal>

              <DownloadCSVButton />
            </div>
          )}
        </div>

        {isAuthenticated && (
          <div className="flex flex-col align-center" style={{ width: "95vw" }}>
            <div className="flex flex-row justify-evenly align-center flex-wrap my-2">
              <button
                disabled={!isAuthenticated}
                className="button-secondary align-self-center mx-2"
                onClick={refreshData}
              >
                Refresh Table
              </button>

              {tableData && (
                <p className="text-left px-2">
                  Note: This table only displays the 10 newest entries. See
                  buttons above to download entire dataset.
                </p>
              )}

              {/* Render the Table */}
            </div>
            <DataTable tableData={tableData}></DataTable>
          </div>
        )}
      </main>
    </div>
  );
}
