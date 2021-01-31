import moment from "moment";
import React, { useState, useContext, createContext, useEffect } from "react";
import { useAlert } from "./useAlert";
import { useBasicAuth } from "./useBasicAuth";

export const initialDataValue = {
  data: null,
};

export const DataContext = createContext(initialDataValue);

export default function DataProvider({ children }) {
  const [data, setDataFunc] = useState([]);
  const [structuredData, setStructuredData] = useState();
  // const [pwd, setPwd] = useState("")
  // const {sendAlert, sendError} = useAlert()
  const { pwd } = useBasicAuth();
  useEffect(() => {
    console.log("sd", structuredData);
  }, [structuredData]);

  const stripForKey = (input) => {
    return String(input)
      .replace("+", "_")
      .replace(":", "_")
      .replace(":", "_")
      .replace(".", "_");
  };

  const getFilteredData = async ({
    crossing_from = null,
    crossing_to = null,
    sailing_date = null,
    sailing_time = null,
  }) => {
    const authInfo = encodeURIComponent(pwd);
    console.log('sailing_date', sailing_date)
    const resp = await fetch(
      "/api/get-filtered-data?" +
        new URLSearchParams({
          name: crossing_from
            ? crossing_from
            : "Sunshine Coast (Langdale) - Vancouver (Horseshoe Bay)",
          dateOfSailing: sailing_date ? sailing_date : moment().format("yyyy-M-D")
          ? crossing_from
          : "Sunshine Coast (Langdale) - Vancouver (Horseshoe Bay)",
        }),
      {
        headers: { "X-Password": authInfo },
      },
    );
    const json = await resp.json();

    setData(json.capacity_data);
  };

  const setData = (d) => {
    setDataFunc(d);
    // setStructuredData(
    //   d.reduce(
    //     (obj, row) => ({
    //       ...obj,
    //       [row.crossing_name]: {
    //         ...obj[row.crossing_name],
    //         [row.date_of_sailing]: {
    //           ...(obj &&
    //             obj[row.crossing_name] &&
    //             obj[row.crossing_name][row.date_of_sailing]),
    //           [stripForKey(row.time_of_sailing)]: {
    //             ...(obj[row.crossing_name] &&
    //               obj[row.crossing_name][row.date_of_sailing] &&
    //               obj[row.crossing_name][row.date_of_sailing][
    //                 stripForKey(row.time_of_sailing)
    //               ] &&
    //               obj[row.crossing_name][row.date_of_sailing][
    //                 stripForKey(row.time_of_sailing)
    //               ]),
    //             [String(row.date_recorded + " " + stripForKey(row.time_recorded)).split("+")[0]]: [
    //               {
    //                 "x": row.date_of_sailing + " " + row.time_of_sailing,
    //                 "y": row.percent_available,
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     }),
    //     {},
    //   ),
    // );
  };

  const refreshData = async () => {
    // setLoading(true, "Loading Fresh Data");
    const authInfo = encodeURIComponent(pwd);
    const resp = await fetch("/api/get-limited-data", {
      headers: { "X-Password": authInfo },
    });
    const json = await resp.json();

    setData(json.capacity_data);
    // setLoading(false);
  };

  const getFullData = async () => {
    // setLoading(true, "Loading Fresh Data");
    const authInfo = encodeURIComponent(pwd);
    const resp = await fetch("/api/get-full-data", {
      headers: { "X-Password": authInfo },
    });
    const json = await resp.json();

    setData(json.capacity_data);
    // setLoading(false);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        refreshData,
        getFullData,
        structuredData,
        getFilteredData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const {
    data,
    setData,
    refreshData,
    getFullData,
    structuredData,
    getFilteredData,
  } = useContext(DataContext);
  return {
    data,
    setData,
    refreshData,
    getFullData,
    structuredData,
    getFilteredData,
  };
};
