import React from "react";
import moment from "moment";
import Highlight from "react-highlight";

import { date_format, time_format } from "../utilities/dates";

export default function CapacityDataPointInfo({ datapoint }) {
  return (
    <div>
      <div className="flex flex-col justify-center align-center text-left">
			<h2>Formatted Datapoint:</h2>
				<table>
          {/* <thead>
            <tr>
              <th colSpan="2" className="center">
                Formatted Datapoint
              </th>
            </tr>
          </thead> */}
          <tbody>
            <tr key="datapoint-info-terminal-from">
              <td className="center">From</td>
              <td>{datapoint.crossing_name.split("-")[0]}</td>
            </tr>
            <tr key="datapoint-info-terminal-to">
              <td className="center">To</td>
              <td className="right">{datapoint.crossing_name.split("-")[1]}</td>
            </tr>
            <tr key="datapoint-info-sailing-time">
              <td className="center">Sailing Date/Time</td>
              <td>
                {date_format(datapoint.date_recorded)} at{" "}
                {time_format(
                  datapoint.date_of_sailing + " " + datapoint.time_of_sailing,
                )}
              </td>
            </tr>
            <tr key="datapoint-info-capacity">
              <td className="center">Available Capacity</td>
              <td className="center">{datapoint.percent_available} %</td>
            </tr>
            <tr key="datapoint-info-recorded-on">
              <td className="center">Datapoint Recorded On</td>
              <td>
                {date_format(datapoint.date_recorded)} at{" "}
                {time_format(
                  datapoint.date_recorded + " " + datapoint.time_recorded,
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Raw Datapoint:</h2>
        <div className="raw-datapoint" >
          <Highlight className="json">
            {JSON.stringify(datapoint, null, 2)}
          </Highlight>
        </div>
      </div>
    </div>
  );
}
