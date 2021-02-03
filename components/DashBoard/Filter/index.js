import { useState } from "react";
import { useData } from "../../../hooks/useData";
import { useIsLoading } from "../../../hooks/useIsLoading";
import { DEFAULT_TERMINALS } from "../../../utilities/constants";
import InfoModal from "../../InfoModal";
export const Filter = () => {
  const {
    data,
    setData,
    dataFilter,
    setDataFilter,
    resetFilter,
    refreshData,
    getFilteredData,
    getBarChartData,
  } = useData();

  const { loadingState, setLoadingState, initialLoadingState } = useIsLoading();

  const handleFilterChange = async (e) => {
    // Any time a filter option is changed
    e.preventDefault();
    setDataFilter({
      ...dataFilter,
      [e.target.name]: e.target.value,
    });
    
    await getFilteredData()

  };

  const applyFilter = async (e) => {
    setLoadingState({
      loading: true,
      text: "Loading Data",
      overlay: false,
    });
    e.preventDefault();
    await getFilteredData();
    setLoadingState(initialLoadingState);
  };
  return (
    <>
      <form
        action=""
        className="flex flex-row flex-wrap justify-evenly align-center mx-3 my-2"
      >
        <div className="flex flex-col justify-end align-start">
          <label htmlFor="">Select a Crossing</label>
          <select
            className="text-center"
            style={{maxWidth: "90vw"}}
            name="crossing_from"
            id="crossing_from"
            onChange={handleFilterChange}
            value={dataFilter.crossing_from ? dataFilter.crossing_from : ""}
          >
            <option className="text-center" key={"EmptyCrossingFromOption"} value={""}>
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
          <div className="flex flex-col justify-end align-start my-2 ml-2">
            <label htmlFor="">Crossing Date</label>
            <input
              type="date"
              name="sailing_date"
              onChange={handleFilterChange}
              value={dataFilter.sailing_date}
            />
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
        )}

        <div className="my-2">
          <button
            className="button-success mx-2 my-1"
            disabled={
              !dataFilter.crossing_from ||
              (dataFilter.crossing_from && !dataFilter.sailing_date)
            }
            onClick={applyFilter}
          >
            Apply Filter
          </button>

          <button
            className="button mx-2 my-1"
            disabled={!dataFilter.crossing_from}
            onClick={async (e) => {
              e.preventDefault();
              await resetFilter();
            }}
          >
            Reset Filter
          </button>
          <button
            className="button-secondary align-self-center mx-2 my-1"
            onClick={async (e) => {
              e.preventDefault();
              await refreshData();
            }}
          >
            Refresh Data
          </button>
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
