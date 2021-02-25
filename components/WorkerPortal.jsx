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
import { Button } from "./Button";

export default function WorkerPortal() {
  const [status, setStatus] = useState(null);
  const [statusLastUpdated, setStatusLastUpdated] = useState();
  // const [pwd, setPwd] = useState();
  const [open, toggle] = useToggle(null);
  const [botOffline, setBotOffline] = useState(false);
  const [botStatusUpdateFreq, setBotStatusUpdateFreq] = useState(10); // In seconds

  const { pingServer } = usePingServer(setBotOffline);

  const { isAuthenticated, isDemoUser, pwd } = useBasicAuth();
  const { sendAlert, sendInfo, sendError } = useAlert();

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

  const getStatus = async (withAlert = false) => {
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
        withAlert && sendAlert("Bot status was updated.");
        const json = await resp.json();
        // console.log(json);
        setStatus(json);
        setStatusLastUpdated(moment().format("h:mm:ss A"));

        setBotOffline(false);
      }
    } catch (error) {
      // sendError("Error updating status: " + String(error));
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
        if (isDemoUser === true) {
          sendInfo("Note: A Demo user cannot affect the worker");
        } else {
          sendAlert("Bot was started");
        }
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
        if (isDemoUser === true) {
          sendInfo("Note: A Demo user cannot affect the worker");
        } else {
          sendAlert("Single Test Running");
        }
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
        if (isDemoUser === true) {
          sendInfo("Note: A Demo user cannot affect the worker");
        } else {
          sendAlert("Bot was stopped.");
        }
        await getStatus();
      } else {
        sendError("Error. Bot could not be stopped.");
      }
    } catch (error) {
      // console.log("error", error);
      setBotOffline(true);
    }
  };

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
    <div className="flex flex-row flex-wrap mx-2 my-3">
      <div className="flex flex-row justify-around flex-wrap align-stretch">
        <div className="flex flex-col justify- align-stretch ">
          <div className="grid grid-cols-3 grid-rows-1">
            <span className="alert white text-center text-small">
              Ongoing: {status?.STARTED_JOBS?.length | "?"}
            </span>
            <span className="alert white text-center text-small">
              Upcoming: {status?.SCHEDULED_JOBS?.length | "?"}
            </span>
            <span className="alert white text-center text-small">
              Finished: {status?.FINISHED_JOBS?.length | "?"}
            </span>
          </div>
          <InfoModal
            titleText={`Bot/Web Scraper Controls`}
            triggerText={"Control Panel"}
            fullHeight={true}
            disabled={!isAuthenticated}
            onOpen={async () => await getStatus()}
          >
            <div className="flex flex-col justify-center align-middle">
              <div className="flex row justify-center align-middle">
                <Button
                  color="white"
                  className="button-secondary my-2 mx-2"
                  onClick={(e) => getStatus(true)}
                >
                  Refresh Status
                </Button>
                <span className="alert success text-large self-center">
                  Status Last Updated: <strong>{statusLastUpdated}</strong>
                </span>
              </div>
              <div className="flex flex-row flex-wrap justify-center m-4 py-4 ">
                <Button
                  color="green"
                  className="button-success my-2 mx-2"
                  onClick={startBot}
                >
                  Start Bot
                </Button>

                <Button
                  color="blue"
                  className="button-warning my-2 mx-2"
                  onClick={testBot}
                >
                  Run 1 Test
                </Button>
                <Button
                  color="red"
                  className="button-error my-2 mx-2"
                  onClick={stopBot}
                >
                  Stop Bot
                </Button>
              </div>

              <div className="shadow mx-auto w-full max-w-2xl px-4 py-2 overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <caption className="flex justify-center text-center">
                  Running Jobs
                </caption>
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {status?.STARTED_JOBS?.length == 0 && (
                      <tr
                        key="noStartedJobs"
                        className="text-center text-sm text-gray-900"
                      >
                        <td className="px-6 py-4 text-center" colSpan="2">
                          No Running Jobs. Worker is Idle.
                        </td>
                      </tr>
                    )}
                    {status?.STARTED_JOBS?.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {timeFormat(job.created_at, true)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Divider className="mt-4" />

              <div className="shadow mx-auto w-full max-w-2xl px-4 py-2 overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <caption className="flex justify-center text-center">
                  Scheduled Jobs
                </caption>
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Schedueled For
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {status?.SCHEDULED_JOBS?.length == 0 && (
                      <tr key="noStartedJobs">
                        <td
                          className="px-6 py-4 text-center text-sm text-gray-900"
                          colSpan="2"
                        >
                          No Scheduled Jobs.
                        </td>
                      </tr>
                    )}
                    {status?.SCHEDULED_JOBS?.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {timeFormat(
                              moment(job.created_at).add(1, "minute"),
                              true,
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Divider />

              <div className="shadow mx-auto w-full max-w-2xl px-4 py-2 overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <caption className="flex justify-center text-center">
                  Finished Jobs
                </caption>
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Finished At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {status?.FINISHED_JOBS?.length == 0 && (
                      <tr key="noStartedJobs">
                        <td
                          className="px-6 py-4 text-center text-sm text-gray-900"
                          colSpan="2"
                        >
                          No Finished Jobs.
                        </td>
                      </tr>
                    )}
                    {status?.FINISHED_JOBS?.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {timeFormat(job.ended_at, true)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="my-4"></div>
            </div>
          </InfoModal>
        </div>
      </div>
    </div>
  );
}

{
  /* `| Upcoming: ${status.SCHEDULED_JOBS?.length} |  |  |` */
}
