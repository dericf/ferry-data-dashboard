import React, { useEffect, useState } from "react";
import Divider from "./Divider";
import InfoModal from "./InfoModal";
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;
import moment from "moment";
import { useToggle } from "../hooks/useToggle";
import { useInputValue } from "../hooks/useInputValue";
import { useBasicAuth } from "../hooks/useBasicAuth";
import { useAlertPopup } from "../hooks/useAlert";

export default function WorkerPortal() {
  const [status, setStatus] = useState();
  const [statusLastUpdated, setStatusLastUpdated] = useState();
  // const [pwd, setPwd] = useState();
  const [open, toggle] = useToggle(null);
  const { value: pwd, onChange: onPwdChange } = useInputValue("");
  const { auth, setAuth } = useBasicAuth();

  const {alertText, setAlertText, setAlertStatus} = useAlertPopup()

  useEffect(() => {
    getStatus();
    const intervalId = setInterval(() => {
      getStatus();
    }, 100000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getStatus = async () => {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_SERVER_URL);
    if (resp.status < 200 && resp.status >= 300) {
      setStatus(null);
    } else {
      const json = await resp.json();
      console.log(json);
      setStatus(json);
      setStatusLastUpdated(moment().format("hh:mm:ss"));
    }
  };

  const tryAuthenticate = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    });
    if (res.status >= 200 && res.status < 300) {
      // const json = res.json()
      setAuth(true);
      setAlertStatus("success")
      setAlertText("You have been logged in")
    } else {
      setAuth(false);
      setAlertStatus("error")
      setAlertText("Wrong Password")
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
      const json = res.json();
      console.log(json);
      //   setIsAuthenticated(true);
      // } else {
      //   setIsAuthenticated(false);
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
      // const json = res.json()
      //   setIsAuthenticated(true);
      // } else {
      //   setIsAuthenticated(false);
      console.log("Stopped the bot");
    }
  };

  return (
    <div className="flex flex-row mt-2">
      <div className="flex flex-row justify-around align-stretch mx-2 border">
        <form className="flex flex-col" >
          <input
          className=""
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={pwd?.value}
            onChange={onPwdChange}
          />
          
          <button
            style={{ marginTop: "0.5rem" }}
            disabled={auth}
            onClick={tryAuthenticate}
          >
            Authenticate
          </button>
        </form>
      
      <div className="flex flex-col justify-around align-stretch mx-2">
        <InfoModal
          titleText={`Bot/Web Scraper Controls`}
          triggerText={"Bot Controls"}
          disabled={!auth}
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
                  status.registries.SCHEDULED_JOBS.map((job) => (
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
                  <td className="center">{pwd}</td>
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
                <tr>
                  <td className="center">1</td>
                  <td className="right">2</td>
                </tr>
                <tr>
                  <td className="center">1</td>
                  <td className="right">2</td>
                </tr>
                {status &&
                  status.registries.SCHEDULED_JOBS.map((job) => (
                    <tr key={new Date()}>
                      <td>1</td>
                      <td>2</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div>Status: {status && JSON.stringify(status)}</div>
          </div>
        </InfoModal>
        {auth ? (
          <span className="alert success">Authenticated</span>
        ) : (
          <span className="alert error">Not Authenticated</span>
        )}
      </div>
      </div>
    </div>
  );
}
