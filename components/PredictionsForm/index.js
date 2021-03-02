import { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import { DEFAULT_TERMINALS } from "../../utilities/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../Button";
import { useLoading } from "@/hooks/useLoading2";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

export const PredictionsForm = () => {
  const [isLoading, load] = useLoading();
  const {
    data,
    setData,
    dataFilter,
    setDataFilter,
    resetFilter,
    refreshData,
    getFilteredData,
    getLimitedData,
    getBarChartData,
  } = useData();

  // useEffect(() => {
  //   // (async () => await getLimitedData())();
  // }, [dataFilter]);

  const handleFilterChange = async (e) => {
    // Any time a filter option is changed
    e.preventDefault();
    setDataFilter({
      ...dataFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = async (date) => {
    setDataFilter({
      ...dataFilter,
      sailing_date: date,
    });
  };

  const handleTimeChange = async (time) => {
    setDataFilter({
      ...dataFilter,
      sailing_time: time,
    });
  };

  const applyFilter = async (e) => {
    await load(getFilteredData());
  };
  return (
    <>
      <form
        action=""
        className="flex flex-col justify-center w-full max-w-2xl mx-auto align-middle bg-blue-300 p-4 mt-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await getFilteredData();
        }}
      >
        <div className="flex flex-col justify-center align-start">
          <label htmlFor="">Select a Crossing</label>
          <select
            className="text-center"
            style={{ maxWidth: "90vw" }}
            name="crossing_from"
            id="crossing_from"
            onChange={handleFilterChange}
            value={dataFilter.crossing_from ? dataFilter.crossing_from : ""}
          >
            <option
              className="text-center"
              key={"EmptyCrossingFromOption"}
              value={""}
            >
              All
            </option>
            {DEFAULT_TERMINALS.map((terminalOption) => (
              <option key={terminalOption.name} value={terminalOption.value}>
                {terminalOption.name}
              </option>
            ))}
          </select>
        </div>

        {dataFilter.crossing_from && (
          <>
            <div className="flex justify-around align-middle my-2 ml-2">
              <label htmlFor="crossingDate" className="flex flex-col">
                Crossing Date
                <DatePicker
                  id="crossingDate"
                  selected={dataFilter.sailing_date}
                  onChange={handleDateChange}
                />
              </label>
              <label htmlFor="crossingTime" className="flex flex-col">
                Time
                <DatePicker
                  id="crossingTime"
                  selected={dataFilter.sailing_time}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </label>
            </div>
          </>
        )}

        <div className="my-2 flex flex-row align-center justify-evenly">
          <Button
            color="white"
            className=""
            disabled={!dataFilter.crossing_from}
            onClick={async (e) => {
              await resetFilter();
            }}
          >
            Reset Filter
          </Button>
          <Button
            color="green"
            className=""
            disabled={
              !dataFilter.crossing_from ||
              (dataFilter.crossing_from && !dataFilter.sailing_date)
            }
            onClick={applyFilter}
          >
            {isLoading ? <LoadingSpinner /> : "Apply Filter"}
          </Button>
        </div>
      </form>
    </>
  );
};

/*
TODO: Add sorting
name:
	asc
	desc
sailing_date
	asc
	desc
sailing_time
	asc
	desc
*/
