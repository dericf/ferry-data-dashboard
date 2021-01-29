import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import InfoModal from "./InfoModal";
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;
import moment from "moment";
import { useToggle } from "../hooks/useToggle";
import { useInputValue } from "../hooks/useInputValue";
import { useBasicAuth } from "../hooks/useBasicAuth";
import { useAlert } from "../hooks/useAlert";

export default function WorkerPortal() {
  const [status, setStatus] = useState();
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
    if (isAuthenticated) {
      getStatus();
      intervalId = setInterval(() => {
        getStatus();
      }, 100000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getStatus = async () => {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_SERVER_URL, {
      headers: { "x-password": encodeURIComponent(pwd) },
    });
    if (resp.status < 200 && resp.status >= 300) {
      sendError("Error updating status");
      setStatus(null);
    } else {
      sendAlert("Bot status was updated.");
      const json = await resp.json();
      console.log(json);
      setStatus(json);
      setStatusLastUpdated(moment().format("hh:mm:ss"));
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
          >
            <div className="flex flex-col justify-center align-center">
              <div className="flex-flex-row my-2">
                <button className="button-secondary mx-2" onClick={getStatus}>
                  Refresh Status
                </button>
                <button className="button-success mx-2" onClick={startBot}>
                  Start Bot
                </button>
                <button className="button-error mx-2" onClick={stopBot}>
                  Stop Bot
                </button>
              </div>

              <span className="alert success">
                Status Updated: {statusLastUpdated}
              </span>
              <Divider />
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Started Jobs</th>
                  </tr>
                  <tr>
                    <th>Job ID</th>
                    <th>Started at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="center">1</td>
                    <td className="right">2</td>
                  </tr>
                  <tr>
                    <td className="center">1</td>
                    <td className="right">2</td>
                  </tr>
                  {status &&
                    status.registries?.SCHEDULED_JOBS.map((job) => (
                      <tr key={new Date()}>
                        <td>1</td>
                        <td>2</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <Divider />

              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Scheduled Jobs</th>
                  </tr>
                  <tr>
                    <th>Job ID</th>
                    <th>Scheduled to run at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="center">1</td>
                    <td className="right">2</td>
                  </tr>
                  <tr>
                    <td className="center">1</td>
                    <td className="right">2</td>
                  </tr>
                  <tr>
                    <td className="center">1</td>
                    <td className="right">2</td>
                  </tr>

                  <tr>
                    <td className="center">1</td>
                    <td className="right">2</td>
                  </tr>
                  <tr>
                    <td className="center">1</td>
                    <td className="right">2</td>
                  </tr>
                  {status &&
                    status.registries?.SCHEDULED_JOBS.map((job) => (
                      <tr key={new Date()}>
                        <td>1</td>
                        <td>2</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div></div>
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
