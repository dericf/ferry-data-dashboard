import React, { useEffect } from "react";
import { useData } from "../hooks/useData";
import getFilteredData from "../pages/api/get-filtered-data";
import { dateFormat, timeFormat } from "../utilities/dates";
import CapacityDataPointInfo from "./CapacityDataPointInfo";
import Divider from "./Divider";
import InfoModal from "./InfoModal";

const DataTable = () => {
  const { data, refreshData, getLimitedData } = useData();
  useEffect(() => {
    (async () => {
      await getLimitedData()
    })();
  }, []);

  if (!data || data?.length == 0) {
    return <h2 className="text-center">0 Records to show for the given filters</h2>;
  }
  // else
  return (
    <>
      {/* <div className="flex flex-row justify-evenly align-center flex-wrap my-2">
        {data && (
          <p className="text-left px-2">
            Note: This table only displays the 10 newest entries. See buttons
            above to download entire dataset.
          </p>
        )}
      </div> */}
      <div lassName="shadow mx-auto w-screen max-w-2xl px-4 py-2 overflow-x-auto border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"  colSpan="2">Crossing Name</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="2">Date/Time of Sailing</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity (Available)</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="2">Date/Time Recorded</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {data.slice(0, 10).map((row, index) => (
              <tr key={row.id}>
                <td className="text-sm text-gray-900 text-right">{row.id}</td>
                <td className="text-sm text-gray-900 text-center">
                  <div className="flex flex-row justify-center">
                    <span>{String(row.crossing_name).split("-")[0]}</span>
                  </div>
                </td>
                <td className="text-sm text-gray-900 text-center">
                  <div className="flex flex-row justify-center">
                    <span>{String(row.crossing_name).split("-")[1]}</span>
                  </div>
                </td>
                <td className="text-sm text-gray-900 text-right" style={{ borderRight: "none" }}>
                  {dateFormat(row.date_of_sailing)}
                </td>
                <td className="text-sm text-gray-900 text-right" style={{ borderLeft: "none" }}>
                  {timeFormat(row.date_of_sailing + " " + row.time_of_sailing)}
                </td>
                <td className="text-sm text-gray-900 text-center">{row.percent_available} %</td>
                <td className="text-sm text-gray-900 text-right">{dateFormat(row.date_recorded)}</td>
                <td className="text-sm text-gray-900 text-right">
                  {timeFormat(row.date_recorded + " " + row.time_recorded)}{" "}
                </td>
                <td className="text-sm text-gray-900 text-right">
                  <div
                    className="flex flex-row justify-center align-center"
                    style={{ width: "6rem" }}
                  >
                    <InfoModal
                      triggerBackgroundColor="primary"
                      titleText={"Individual Datapoint Information"}
                      triggerText="Info"
                      disabled={false}
                    >
                      <CapacityDataPointInfo datapoint={row} />
                    </InfoModal>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/**
 *
 *
 */
{
  /* <ConfirmModal message={`Are you sure you want to delete ${row.crossing_name}`} onConfirm={() => (console.log("CONGIMED"))} /> */
}

export default DataTable;