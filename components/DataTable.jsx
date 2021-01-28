import React from "react";
import { date_format, time_format } from "../utilities/dates";
import CapacityDataPointInfo from "./CapacityDataPointInfo";
import InfoModal from "./InfoModal";

const DataTable = ({ tableData }) => {
  if (!tableData || tableData?.length == 0) {
    return <h2>0 Records to show</h2>;
  }
  // else
  return (
    <div style={{ overflowX: "auto", maxWidth: "95vw" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Crossing Name</th>
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
              <td className="left">{row.crossing_name}</td>
              <td className="right" style={{ borderRight: "none" }}>
                {date_format(row.date_of_sailing)}
              </td>
              <td className="right" style={{ borderLeft: "none" }}>
                {time_format(row.date_of_sailing + " " + row.time_of_sailing)}
              </td>
              <td className="center">{row.percent_available} %</td>
              <td className="right">{date_format(row.date_recorded)}</td>
              <td className="right">
                {time_format(row.date_recorded + " " + row.time_recorded)}{" "}
              </td>
              <td className="right">
                <div
                  className="flex flex-row justify-center align-center"
                  style={{ width: "6rem" }}
                >
                  <InfoModal titleText={`${row.crossing_name} - (ID: ${row.id})`} triggerText="Info" disabled={false}>
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
