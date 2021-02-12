import dynamic from "next/dynamic";

import { LoadingText } from "../Loading/LoadingText";
import { useIsLoading } from "../../hooks/useIsLoading";
import { Filter } from "./Filter";
import InfoModal from "../InfoModal";

const DynamicLineChart = dynamic(
  () => import("./Charts/LineChart").then((mod) => mod.LineChart),
  { ssr: false },
);

export const DataVisualizer = () => {
  const { loadingState } = useIsLoading();

  return (
    <>
      <InfoModal triggerText={"Show Visualizer"} titleText={"Data Visualizer"}>
        <div className="flex flex-col justify-center text-center align-evenly my-4 mx-4">
          <h2>Visualizer (still in early development)</h2>
          <Filter />
          {/* Render the Bar Char here using NextJs Dynamic/ClientOnly Component */}
           <DynamicLineChart />
        </div>
      </InfoModal>
    </>
  );
};
