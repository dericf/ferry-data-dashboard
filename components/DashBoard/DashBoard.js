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
import { LogoutButton } from "../Auth/LogoutButton";
import { DataVisualizer } from "./DataVisualizer";
import { Filter } from "./Filter";
import { useIsLoading } from "../../hooks/useIsLoading";
import dynamic from "next/dynamic";
import { LoadingText } from "../Loading/LoadingText";
// import { DataVisualizer from "./DataVisualizer

const DynamicLineChart = dynamic(
  () => import("./Charts/LineChart").then((mod) => mod.LineChart),
  { ssr: false, loading: () => <LoadingText text={"Loading Chart"} /> },
);

export default function Dashboard() {
  const { data } = useData();
  const { loadingState, setLoadingState } = useIsLoading();

  const [open, toggle] = useToggle(null);
  const { isAuthenticated, pwd } = useBasicAuth();

  const { resetAlert, sendAlert, sendError } = useAlert();

  // let formatted_date_string = new Date().toUTCString().replace(/ /g, "_").replace(/,/g, "").replace(/:/g, "_")

  // useEffect(() => {
  //   if (terminals) {
  //     setSelectedTerminal(terminals[0]);
  //   }
  // }, [terminals]);

  return (
    <>
      <Head>
        <title>Ferry Data Dashboard</title>
        <link key="favicon" rel="icon" href="/favicon.ico" />
      </Head>
      <LogoutButton />

      <div className="flex flex-row flex-shrink flex-no-grow justify-center align-end flex-wrap shadow-md py-4">
        <WorkerPortal></WorkerPortal>
      </div>

      <div className="flex flex-col align-middle px-4 mt-4  " style={{ width: "95vw" }}>
        {/* <Filter /> */}
        {/* {data && data.length > 0 && (
          <div className={"mb-3"}>
            <DynamicLineChart />
          </div>
        )} */}
        <DataTable></DataTable>
      </div>
    </>
  );
}
