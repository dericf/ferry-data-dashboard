import React from "react";
import moment from "moment";
import Highlight from "react-highlight";

import { dateFormat, timeFormat } from "../utilities/dates";

export default function CapacityDataPointInfo({ datapoint }) {
  return (
    <div>
      <div className="flex flex-col text-left justify-center align-middle w-full mx-auto">
        <div className="shadow mx-auto w-screen max-w-2xl px-4 py-2 overflow-x-auto border-b border-gray-200 sm:rounded-lg">
          <caption className="text-2xl text-center"></caption>

          <div className="grid grid-cols-2 gap-y-2 space-y-2 align-middle divide-y-2 max-w-xl mx-auto mb-10 p-4 shadow-md">
            <div className="col-span-2 text-center text-xl font-bold">
              Formatted Datapoint
            </div>
            <div className="font-semibold">From</div>
            <div>{datapoint.crossing_name.split("-")[0]}</div>

            <div className="font-semibold">To</div>
            <div>{datapoint.crossing_name.split("-")[1]}</div>

            <div className="font-semibold">Sailing Date/Time</div>
            <div>
              {dateFormat(datapoint.date_recorded)} at{" "}
              {timeFormat(
                datapoint.date_of_sailing + " " + datapoint.time_of_sailing,
              )}
            </div>

            <div className="font-semibold">Available Capacity</div>
            <div>{datapoint.percent_available} %</div>

            <div className="font-semibold">Datapoint Recorded On</div>
            <div>
              {dateFormat(datapoint.date_recorded)} at{" "}
              {timeFormat(
                datapoint.date_recorded + " " + datapoint.time_recorded,
              )}
            </div>
          </div>
        </div>
        <h2 className="text-xl text-center font-bold">Raw Datapoint:</h2>
        <div className="bg-gray-700 p-8 text-white max-w-full shadow-md">
          <Highlight className="json">
            {JSON.stringify(datapoint, null, 2)}
          </Highlight>
        </div>
      </div>
    </div>
  );
}
