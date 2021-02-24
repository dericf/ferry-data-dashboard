import { useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import { useIsLoading } from "../../../hooks/useIsLoading";
import { DEFAULT_TERMINALS } from "../../../utilities/constants";
import InfoModal from "../../InfoModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DownloadCSVButton from "../../DownloadCSVButton";

export const Filter = () => {
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

  const { loadingState, setLoadingState, initialLoadingState } = useIsLoading();

  useEffect(() => {
    // (async () => await getLimitedData())();
  }, [dataFilter]);

  const handleFilterChange = async (e) => {
    // Any time a filter option is changed
    e.preventDefault();
    setDataFilter({
      ...dataFilter,
      [e.target.name]: e.target.value,
    });
    await applyFilter();
  };

  const handleDateChange = async (date) => {
    setDataFilter({
      ...dataFilter,
      sailing_date: date,
    });
    // await applyFilter();
  };

  const applyFilter = async (e) => {
    setLoadingState({
      loading: true,
      text: "Loading Data",
      overlay: false,
    });
    await getFilteredData();
    setLoadingState(initialLoadingState);
  };
  return (
    <>
      <form
        action=""
        className="flex flex-row flex-wrap justify-evenly align-center mx-3 my-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await getFilteredData();
        }}
      >
        <div className="flex flex-col justify-end align-start">
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
            <div className="flex flex-col justify-end align-start my-2 ml-2">
              <label htmlFor="">Crossing Date</label>
              {/* <input
              type="date"
              name="sailing_date"
              onChange={handleFilterChange}
              value={dataFilter.sailing_date}
            /> */}

              <DatePicker
                selected={dataFilter.sailing_date}
                onChange={handleDateChange}
              />

              {/* <input
              type="number"
              name="limit"
              id="limit"
              onChange={handleDateChange}
              value={dataFilter.limit}
            /> */}

              {/* <label htmlFor="">Crossing Time (not implemented yet)</label> */}
              {/* <input
              type="time"
              name="crossing_time"
              disabled={true}
              onChange={handleFilterChange}
            /> */}

              {/* <select
              name="sailing_time"
              id=""
              disabled={true}
              value={filter.sailing_time | ""}
              onChange={handleFilterChange}
            >
              {formData.sailing_times.map((sailing_time) => (
                <option key={sailing_time} value={sailing_time}>
                  {sailing_time}
                </option>
              ))}
            </select> */}
            </div>

            <div className="flex flex-col mx-2">
              <label htmlFor="limit">Limit Records</label>
              <select
                name="limit"
                id="limit"
                value={dataFilter.limit}
                onChange={(e) =>
                  setDataFilter({ ...dataFilter, limit: e.target.value })
                }
              >
                <option key={1} value={1}>
                  1
                </option>
                <option key={10} value={10}>
                  10
                </option>
                <option key={50} value={50}>
                  50
                </option>
                <option value="0">All</option>
              </select>
            </div>
          </>
        )}

        <div className="my-2 flex flex-row align-start">
          {/* <button
            className="button-success mx-2 my-1"
            disabled={
              !dataFilter.crossing_from ||
              (dataFilter.crossing_from && !dataFilter.sailing_date)
            }
            onClick={applyFilter}
          >
            Apply Filter
          </button> */}

          <button
            className="button mx-1 my-1"
            disabled={!dataFilter.crossing_from}
            onClick={async (e) => {
              e.preventDefault();
              await resetFilter();
            }}
          >
            Reset Filter
          </button>
          <div className="flex flex-col align-stretch justify-between mt-1">
            <DownloadCSVButton />
            <button
              className="button-secondary mx-1 my-1"
              onClick={async (e) => {
                e.preventDefault();
                await refreshData();
              }}
            >
              Refresh Data
            </button>
          </div>
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
