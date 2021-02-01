import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import InfoModal from "./InfoModal";
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;
import moment from "moment";
import { useToggle } from "../hooks/useToggle";
import { useInputValue } from "../hooks/useInputValue";
import { useBasicAuth } from "../hooks/useBasicAuth";
import { useAlert } from "../hooks/useAlert";
import { dateFormat, timeFormat } from "../utilities/dates";
import { usePingServer } from "../hooks/usePingServer";

export default function WorkerPortal() {
  const [status, setStatus] = useState(null);
  const [statusLastUpdated, setStatusLastUpdated] = useState();
  // const [pwd, setPwd] = useState();
  const [open, toggle] = useToggle(null);
  const [botOffline, setBotOffline] = useState(false);
  const [botStatusUpdateFreq, setBotStatusUpdateFreq] = useState(10); // In seconds

  const { pingServer } = usePingServer(setBotOffline);

  const { isAuthenticated, pwd } = useBasicAuth();

  // const {alertText, setAlertText, setAlertStatus} = useAlertPopup()
  const { sendAlert, sendError } = useAlert();

  useEffect(() => {
    let intervalId;
    (async () => {
      const pingOk = pingServer(setBotOffline);
      getStatus();
      intervalId = setInterval(
        () => {
          getStatus();
        },
        botStatusUpdateFreq ? botStatusUpdateFreq * 1000 : 10000,
      );
    })();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (open === true) {
      getStatus();
    }
  }, [open]);

  const getStatus = async () => {
    // console.log("Getting status");
    if (!isAuthenticated || botOffline) {
      return false;
    }
    const fetchOptions = {
      method: "GET",
      headers: { "x-password": encodeURIComponent(pwd) },
    };
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/dashboard/status`,
        fetchOptions,
      );
      if (resp.status < 200 && resp.status >= 300) {
        sendError("Error updating status");
        setStatus(null);
      } else {
        sendAlert("Bot status was updated.");
        const json = await resp.json();
        // console.log(json);
        setStatus(json);
        setStatusLastUpdated(moment().format("h:mm:ss A"));

        setBotOffline(false);
      }
    } catch (error) {
      sendError("Error updating status: " + String(error));
      console.error("CUSTOM ERROR\n", error);
      sendError("Bot appears to be Offline. It could be in maintenaince.");
      setBotOffline(true);
    }
  };

  const startBot = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/service/start`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ password: pwd }),
        },
      );
      if (res.status >= 200 && res.status < 300) {
        sendAlert("Bot was started");
        const json = res.json();
        // console.log(json);
        await getStatus();
      } else {
        sendError("Error. Bot could not be started.");
      }
    } catch (error) {
      // console.log("error", error);
      setBotOffline(true);
    }
  };

  const testBot = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/service/run-once`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ password: pwd }),
        },
      );
      if (res.status >= 200 && res.status < 300) {
        sendAlert("Bot was started");
        const json = res.json();
        // console.log(json);
        await getStatus();
      } else {
        sendError("Error. Bot could not be started.");
      }
    } catch (error) {
      // console.log("error", error);
      setBotOffline(true);
    }
  };

  const stopBot = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/service/stop`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ password: pwd }),
        },
      );
      if (res.status >= 200 && res.status < 300) {
        sendAlert("Bot was stopped.");
        await getStatus();
      } else {
        sendError("Error. Bot could not be stopped.");
      }
    } catch (error) {
      // console.log("error", error);
      setBotOffline(true);
    }
  };

  if (!isAuthenticated) {
    return false;
  }

  if (botOffline === true) {
    return (
      <div className="flex flex-col justify-center p-2 mx-2 my-2">
        <span className="alert error text-large ">Bot is Offline...</span>
        <button
          className="success"
          onClick={() => {
            pingServer(setBotOffline);
          }}
        >
          Try Connecting
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap p-2 mx-2 my-2">
      <div className="flex flex-row justify-around flex-wrap align-stretch">
        {isAuthenticated && (
          <div className="flex flex-col justify-around align-stretch ">
            <h3 className="text-center">Bot Controls</h3>
            <InfoModal
              titleText={`Bot/Web Scraper Controls`}
              triggerText={"Control Panel"}
              fullHeight={true}
              disabled={!isAuthenticated}
              onOpen={() => getStatus()}
            >
              <div className="flex flex-col justify-center align-center">
                <div className="flex flex-row flex-wrap justify-center my-2">
                  <button
                    className="button-secondary my-2 mx-2"
                    onClick={getStatus}
                  >
                    Refresh Status
                  </button>
                  <button
                    className="button-success my-2 mx-2"
                    onClick={startBot}
                  >
                    Start Bot
                  </button>

                  <button
                    className="button-warning my-2 mx-2"
                    onClick={testBot}
                  >
                    Run 1 Test
                  </button>
                  <button className="button-error my-2 mx-2" onClick={stopBot}>
                    Stop Bot
                  </button>
                </div>

                <span className="alert success text-large">
                  Status Last Updated: {statusLastUpdated}
                </span>
                <span className="alert success text-large">
                  {/* <input
                    type="text"
                    name="statusUpdateFreq"
                    id="statusUpdateFreq"
                    value={botStatusUpdateFreq}
                    onChange={(e) => setBotStatusUpdateFreq(Number(e.target.value))}
                  /> */}
                </span>
                <Divider />
                <table>
                  <thead>
                    <tr>
                      <th colSpan="2">Running Jobs</th>
                    </tr>
                    <tr>
                      <th>Job ID</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {status?.STARTED_JOBS?.length == 0 && (
                      <tr key="noStartedJobs">
                        <td className="center" colSpan="2">
                          No Running Jobs. Worker is Idle.
                        </td>
                      </tr>
                    )}
                    {status?.STARTED_JOBS?.map((job) => (
                      <tr key={job.id}>
                        <td className="center">{job.id}</td>
                        <td className="center">
                          {timeFormat(job.created_at, true)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Divider />

                <table>
                  <thead>
                    <tr>
                      <th colSpan="2">Upcoming Jobs</th>
                    </tr>
                    <tr>
                      <th>Job ID</th>
                      <th>Will Run At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {status?.SCHEDULED_JOBS?.length == 0 && (
                      <tr key="noScheduledJobs">
                        <td className="center" colSpan="2">
                          No Scheduled Jobs
                        </td>
                      </tr>
                    )}
                    {status?.SCHEDULED_JOBS?.map((job) => (
                      <tr key={job.id}>
                        <td className="center">{job.id}</td>
                        <td className="center">
                          {timeFormat(
                            moment(job.created_at).add(1, "minute"),
                            true,
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Divider />
                <table>
                  <thead>
                    <tr>
                      <th colSpan="2">Finished Jobs</th>
                    </tr>
                    <tr>
                      <th>Job ID</th>
                      <th>Finshed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {status?.FINISHED_JOBS?.length == 0 && (
                      <tr key="noFinishedJobs">
                        <td className="center" colSpan="2">
                          No Finished Jobs
                        </td>
                      </tr>
                    )}
                    {status?.FINISHED_JOBS?.map((job) => (
                      <tr key={job.id}>
                        <td className="center">{job.id}</td>
                        <td className="center">
                          {timeFormat(job.ended_at, true)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="my-4"></div>
              </div>
            </InfoModal>

            <div className="flex flex-col align-center">
              <div className="flex row flex-wrap justify-between mt-2">
                <span className="alert white text-left text-small">
                  Ongoing: {status?.STARTED_JOBS?.length | "?"}
                </span>
                <span className="alert white text-left text-small">
                  Upcoming: {status?.SCHEDULED_JOBS?.length | "?"}
                </span>
                <span className="alert white text-left text-small">
                  Finished: {status?.FINISHED_JOBS?.length | "?"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* `| Upcoming: ${status.SCHEDULED_JOBS?.length} |  |  |` */
}
