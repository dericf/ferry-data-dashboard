import React from "react";
import { dateFormat, timeFormat } from "../utilities/dates";
import CapacityDataPointInfo from "./CapacityDataPointInfo";
import Divider from "./Divider";
import InfoModal from "./InfoModal";

const DataTable = ({ tableData }) => {
  if (!tableData || tableData?.length == 0) {
    return <h2 className="text-center">0 Records to show</h2>;
  }
  // else
  return (
    <div style={{ overflowX: "auto", maxWidth: "95vw" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th colSpan="2">Crossing Name</th>
            <th colSpan="2">Date/Time of Sailing</th>
            <th className="center">Capacity (Available)</th>
            <th colSpan="2">Date/Time Recorded</th>
            <th className="center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td className="right">{row.id}</td>
              <td className="center">
                
                <div className="flex flex-row justify-center">
                  <span>{String(row.crossing_name).split("-")[0]}</span>
                </div>
              </td>
              <td className="center">
              <div className="flex flex-row justify-center">
                  <span>{String(row.crossing_name).split("-")[1]}</span>
                </div>
              </td>
              <td className="right" style={{ borderRight: "none" }}>
                {dateFormat(row.date_of_sailing)}
              </td>
              <td className="right" style={{ borderLeft: "none" }}>
                {timeFormat(row.date_of_sailing + " " + row.time_of_sailing)}
              </td>
              <td className="center">{row.percent_available} %</td>
              <td className="right">{dateFormat(row.date_recorded)}</td>
              <td className="right">
                {timeFormat(row.date_recorded + " " + row.time_recorded)}{" "}
              </td>
              <td className="right">
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
