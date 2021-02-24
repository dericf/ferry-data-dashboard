import moment from "moment";
import React, { useState, useContext, createContext, useEffect } from "react";
import { DEFAULT_TERMINALS } from "../utilities/constants";
import { useAlert } from "./useAlert";
import { useBasicAuth } from "./useBasicAuth";
import { useIsLoading } from "./useIsLoading";

export const initialDataValue = {
  data: null,
};

export const DataContext = createContext(initialDataValue);

export default function DataProvider({ children }) {
  const [data, setDataFunc] = useState([]);
  const [structuredData, setStructuredData] = useState();
  // const {sendAlert, sendError} = useAlert()
  //
  // Bring in the pwd to authorize requests for data
  // (TODO: change to an actual auth token)
  //
  const { pwd } = useBasicAuth();
  const { loadingState, setLoadingState, initialLoadingState } = useIsLoading();

  const initialDataFilterValues = {
    crossing_from: DEFAULT_TERMINALS[0].value,
    crossing_to: null,
    sailing_date: new Date(),
    sailing_time: null,
    limit: 10,
    
  };
  // Used to populate the dropdowns etc.
  const initialFormData = {
    from_terminals: [],
    to_terminals: [],
    sailing_dates: [],
    sailing_times: [],
  };

  const [dataFilter, setDataFilter] = useState(initialDataFilterValues);
  const [formData, setFormData] = useState(initialFormData);

  const stripForKey = (input) => {
    return String(input)
      .replace("+", "_")
      .replace(":", "_")
      .replace(":", "_")
      .replace(".", "_");
  };

  const getFilteredData = async () => {
    setLoadingState({
      loading: true,
      text: "Applying filters",
      overlay: true,
    });
    const {
      crossing_from,
      crossing_to,
      sailing_date,
      sailing_time,
      limit,
    } = dataFilter;
    const authInfo = encodeURIComponent(pwd);
    console.log("sailing_date", sailing_date);
    const resp = await fetch(
      "/api/get-filtered-data?" +
        new URLSearchParams({
          name: crossing_from,
          dateOfSailing: moment(sailing_date).format("yyyy-M-D"),
          limit: limit !== null ? limit : 2,
        }),
      {
        headers: { "X-Password": authInfo },
      },
    );
    const json = await resp.json();

    setData(json.capacity_data);
    setLoadingState(initialLoadingState);
  };

  const setData = (d) => {
    setDataFunc(d);
  };

  const resetFilter = async () => {
    // TODO: merge this with the new filtering
    // setLoading(true, "Loading Fresh Data");

    setDataFilter(initialDataFilterValues);
    await getLimitedData();
  };

  const refreshData = async () => {
    // TODO: merge this with the new filtering
    // setLoading(true, "Loading Fresh Data");

    if (dataFilter.crossing_from !== "") {
      await getFilteredData();
    } else {
      await getLimitedData();
    }
  };

  const getLimitedData = async () => {
    const authInfo = encodeURIComponent(pwd);
    const resp = await fetch("/api/get-limited-data", {
      headers: { "X-Password": authInfo },
    });
    const json = await resp.json();

    setData(json.capacity_data);
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
        getLimitedData,
        dataFilter,
        setDataFilter,
        formData,
        setFormData,
        resetFilter,
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
    getLimitedData,
    dataFilter,
    setDataFilter,
    formData,
    setFormData,
    resetFilter,
  } = useContext(DataContext);
  return {
    data,
    setData,
    refreshData,
    getFullData,
    structuredData,
    getFilteredData,
    getLimitedData,
    dataFilter,
    setDataFilter,
    formData,
    setFormData,
    resetFilter,
  };
};
