import React, { useState } from "react";
import { CSVDownload } from "react-csv";
import { useBasicAuth } from "../hooks/useBasicAuth";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { headers } from "../utilities/csv_helpers";

export default function DownloadCSVButton() {
  const { auth, setAuth } = useBasicAuth(true);
  const [csvData, setCsvData] = useState([]);
  const { loading, setLoading } = useLoadingScreen();

  const [triggerDownload, setTriggerDownload] = useState();

  console.log("auth", auth);
  console.log("csvData", csvData);

  const download = async () => {
    setTriggerDownload(true);
    // Fetch the entire dataset
  };

  const requestDataset = async () => {
    setLoading(true);
    // Fetch the dataset
    const resp = await fetch("/api/downloadcsv");
    if (resp.status >= 200 && resp.status < 300) {
      const json = await resp.json();
      setCsvData(json.capacity_data);
    }
    setLoading(false);
  };

  if (!auth) {
    return false;
  }

  return (
    <>
      {triggerDownload && (
        <CSVDownload
          data={csvData}
          headers={headers}
          target="_blank"
          filename={`ferry-data.csv`}
        ></CSVDownload>
      )}

      <div className="flex flex-col mx-2 mt-2 justify-between border">
        <button
          disabled={!auth}
          className="button-secondary"
          onClick={requestDataset}
        >
          Request Full Data Set
        </button>

        <button
          disabled={!(csvData?.length > 0)}
          className="button-success mt-2"
          onClick={download}
        >
          Download CSV
        </button>
      </div>
    </>
  );
}
