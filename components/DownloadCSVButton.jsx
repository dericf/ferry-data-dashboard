import React, { useState } from "react";
import { CSVDownload } from "react-csv";
import { useAlert } from "../hooks/useAlert";
import { useBasicAuth } from "../hooks/useBasicAuth";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { headers } from "../utilities/csv_helpers";
import { Button } from "./Button";
import { LoadingText } from "./Loading/LoadingText";

export default function DownloadCSVButton() {
  const { isAuthenticated, isDemoUser, pwd } = useBasicAuth();
  const [csvData, setCsvData] = useState([]);
  const [disableDownload, setDisableDownload] = useState(true);
  const { setLoading } = useLoadingScreen();
  const [triggerDownload, setTriggerDownload] = useState();
  const { sendAlert, sendError, sendInfo } = useAlert();
  const [isProcessing, setIsProcessing] = useState()

  const download = async () => {
    setTriggerDownload(true);
    setDisableDownload(true);
    // Fetch the entire dataset
  };

  const requestDataset = async (e) => {
    setIsProcessing(true);
    e.preventDefault();
    sendInfo("Fetching Full Dataset. Please Wait.");
    if(isDemoUser === true) {
      sendInfo("Note: As a demo user you will receieve a limited data set.")
    }
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


        <Button
          disabled={!isAuthenticated}
          color="white"
          className="mb-3 mr-3"
          loading={isProcessing === true}
          onClick={requestDataset}
        >
          {(!disableDownload ? "Re-Request Full Data Set" : "Request Full Data Set")}
        </Button>

        {!disableDownload && (
          <Button
            disabled={disableDownload}
            className="mb-3 mr-3"
            color="green"
            onClick={download}
          >
            Download CSV
          </Button>
        )}

    </>
  );
}
