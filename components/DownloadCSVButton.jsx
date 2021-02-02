import React, { useState } from "react";
import { CSVDownload } from "react-csv";
import { useAlert } from "../hooks/useAlert";
import { useBasicAuth } from "../hooks/useBasicAuth";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { headers } from "../utilities/csv_helpers";
import { LoadingText } from "./Loading/LoadingText";

export default function DownloadCSVButton() {
  const { isAuthenticated, pwd } = useBasicAuth();
  const [csvData, setCsvData] = useState([]);
  const [disableDownload, setDisableDownload] = useState(true);
  const { setLoading } = useLoadingScreen();
  const [triggerDownload, setTriggerDownload] = useState();
  const { sendAlert, sendError } = useAlert();
  const [isProcessing, setIsProcessing] = useState()

  const download = async () => {
    setTriggerDownload(true);
    setDisableDownload(true);
    // Fetch the entire dataset
  };

  const requestDataset = async (e) => {
    setIsProcessing(true);
    e.preventDefault();
    sendAlert("Fetching Full Dataset. Please Wait.");
    // Fetch the dataset
    const authInfo = encodeURIComponent(pwd);
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/data/get-full-dataset`, {
      headers: { "x-password": authInfo },
    });
    if (resp.status >= 200 && resp.status < 300) {
      const json = await resp.json();
      console.log('json', json)
      setCsvData(json.capacity_data);
      sendAlert("Success! Your Data is now ready to download.");
      setDisableDownload(false);
      setIsProcessing(false);
    } else {
      sendError(
        "Something went wrong. You are not authorized to access the dataset.",
      );
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

      <div className="flex flex-col justify-between ">
        <button
          disabled={!isAuthenticated}
          className="button-secondary mt-2"
          onClick={requestDataset}
        >
          { isProcessing === true ? <LoadingText /> : (!disableDownload ? "Re-Request Latest Data Set" : "Request Full Data Set")}
        </button>

        {!disableDownload && (
          <button
            disabled={disableDownload}
            className="button-success mt-2"
            onClick={download}
          >
            Download CSV
          </button>
        )}
      </div>
    </>
  );
}
