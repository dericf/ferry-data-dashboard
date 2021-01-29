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

export default function WorkerPortal() {
  const [status, setStatus] = useState(null);
  const [statusLastUpdated, setStatusLastUpdated] = useState();
  // const [pwd, setPwd] = useState();
  const [open, toggle] = useToggle(null);

  const {
    isAuthenticated,
    pwd,
    setPwd,
    logout,
    tryAuthenticateWithPassword,
  } = useBasicAuth();

  // const {alertText, setAlertText, setAlertStatus} = useAlertPopup()
  const { sendAlert, sendError } = useAlert();

  useEffect(() => {
    let intervalId;
    
    getStatus();
    intervalId = setInterval(() => {
      getStatus();
    }, 10000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (open === true) {
      getStatus()
    }
  }, [open])

  const getStatus = async () => {
    if (!isAuthenticated) {
      return false
    }
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/dashboard/status`,
      {
        headers: { "x-password": encodeURIComponent(pwd) },
      },
    );
    if (resp.status < 200 && resp.status >= 300) {
      sendError("Error updating status");
      setStatus(null);
    } else {
      sendAlert("Bot status was updated.");
      const json = await resp.json();
      console.log(json);
      setStatus(json);
      setStatusLastUpdated(moment().format("h:mm:ss A"));
    }
  };

  const startBot = async () => {
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
      console.log(json);
      getStatus()
    } else {
      sendError("Error. Bot could not be started.");
    }
  };

  const stopBot = async () => {
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
      getStatus()
    } else {
      sendError("Error. Bot could not be stopped.");
    }
  };

  return (
    <div className="flex flex-row mt-2">
      <div className="flex flex-row justify-around align-stretch mx-2 border">
        <form className="flex flex-col">
          <input
            className="text-center"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="autocomplete"
            disabled={isAuthenticated}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          {!isAuthenticated && (
            <button
              style={{ marginTop: "0.5rem" }}
              onClick={(e) => tryAuthenticateWithPassword(e, pwd)}
            >
              Authenticate
            </button>
          )}

          {isAuthenticated && (
            <button style={{ marginTop: "0.5rem" }} onClick={logout}>
              Logout
            </button>
          )}
        </form>

        <div className="flex flex-col justify-around align-stretch mx-2">
          <InfoModal
            titleText={`Bot/Web Scraper Controls`}
            triggerText={"Bot Controls"}
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
                <button className="button-success my-2 mx-2" onClick={startBot}>
                  Start Bot
                </button>
                <button className="button-error my-2 mx-2" onClick={stopBot}>
                  Stop Bot
                </button>
              </div>

              <span className="alert success text-large">
                Status Last Updated: {statusLastUpdated}
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
                      <td className="center" colSpan="2">No Running Jobs. Worker is Idle.</td>
                    </tr>
                  )}
                  {status?.STARTED_JOBS?.map((job) => (
                    <tr key={job.id}>
                      <td className="center">{job.id}</td>
                      <td className="center">{timeFormat(job.created_at, true)}</td>
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
                      <td className="center" colSpan="2">No Scheduled Jobs</td>
                    </tr>
                  )}
                  {status?.SCHEDULED_JOBS?.map((job) => (
                    <tr key={job.id}>
                      <td className="center">{job.id}</td>
                      <td className="center">{timeFormat(moment(job.created_at).add(1, 'minute'), true)}</td>
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
                      <td className="center" colSpan="2">No Finished Jobs</td>
                    </tr>
                  )}
                  {status?.FINISHED_JOBS?.map((job) => (
                    <tr key={job.id}>
                      <td className="center">{job.id}</td>
                      <td className="center">{timeFormat(job.ended_at, true)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="my-4"></div>
            </div>
          </InfoModal>
          {isAuthenticated ? (
            <span className="alert success">Authenticated</span>
          ) : (
            <span className="alert error">Not Authenticated</span>
          )}
        </div>
      </div>
    </div>
  );
}
