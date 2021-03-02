import { useData } from "@/hooks/useData";
// import { PredictionResultChart } from "./PredictionResultChart";

import dynamic from "next/dynamic";
import { LoadingSpinner } from "./Loading/LoadingSpinner";

const DynamicChart = dynamic(
  () => import("./PredictionResultChart").then((mod) => mod.PredictionResultChart),
  { ssr: false, loading: () => <LoadingSpinner  /> },
);

export const PredictionResults = () => {
  const { predictionResult } = useData();
  if (predictionResult === null) {
    return <> </>;
  }
  return (
    <div className="flex justify-center place-items-center  self-center bg-white  shadow-md w-full max-w-4xl my-6 p-6">
      <p>{JSON.stringify(predictionResult)}</p>
			<DynamicChart />
    </div>
  );
};
