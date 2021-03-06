import { FunctionComponent, PropsWithChildren, ReactChildren } from "react";

type ButtonColor = "white" | "blue" | "green" | "red";

interface Props {
  color: ButtonColor;
  loading?: boolean;
  className?: string;
}

export const Button: FunctionComponent<Props> = ({
  color = "white",
  loading = false,
  className = "",
  children,
  ...props
}) => {
  let colorClasses = "";
  switch (color) {
    case "blue":
      colorClasses = `text-white bg-blue-500 focus:ring-blue-400 hover:bg-blue-700`;
      break;
    case "white":
      colorClasses = `text-gray-900 bg-white focus:ring-gray-100 hover:bg-gray-100`;
      break;
    case "green":
      colorClasses = `text-white bg-green-500 focus:ring-green-400 hover:bg-green-700`;
      break;
    case "red":
      colorClasses = `text-white bg-red-500 focus:ring-red-400 hover:bg-red-700`;
      break;
    default:
      break;
  }
  return (
    <button
      className={`flex justify-center align-middle py-2 px-4 ${colorClasses} font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="h-5 w-5 mr-3 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};
