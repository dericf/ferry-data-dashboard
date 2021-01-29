import React, { useState } from "react";
import { CSVDownload } from "react-csv";
import { useAlert } from "../hooks/useAlert";
import { useBasicAuth } from "../hooks/useBasicAuth";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { headers } from "../utilities/csv_helpers";

export default function DownloadCSVButton() {
  const { isAuthenticated, pwd } = useBasicAuth();
  const [csvData, setCsvData] = useState([]);
  const [disableDownload, setDisableDownload] = useState(true);
  const { setLoading } = useLoadingScreen();
  const [triggerDownload, setTriggerDownload] = useState();

  const { sendAlert, sendError } = useAlert();

  const download = async () => {
    setTriggerDownload(true);
    setDisableDownload(true);
    // Fetch the entire dataset
  };

  const requestDataset = async (e) => {
    e.preventDefault();
    sendAlert("Fetching Full Dataset. Please Wait.");
    // Fetch the dataset
    const authInfo = encodeURIComponent(pwd);
    const resp = await fetch("/api/downloadcsv", {
      headers: { "X-Password": authInfo },
    });
    if (resp.status >= 200 && resp.status < 300) {
      const json = await resp.json();
      setCsvData(json.capacity_data);
      sendAlert("Success! Your Data is now ready to download.");
      setDisableDownload(false);
    } else {
      sendError("Something went wrong. You are not authorized to access the dataset.")
    }
    
  };

  if (!isAuthenticated) {
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
          disabled={!isAuthenticated}
          className="button-secondary"
          onClick={requestDataset}
        >
          Request Full Data Set
        </button>

        <button
          disabled={disableDownload}
          className="button-success mt-2"
          onClick={download}
        >
          Download CSV
        </button>
      </div>
    </>
  );
}
