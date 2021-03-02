import { useBasicAuth } from "../../hooks/useBasicAuth";

export const MainTitle = ({children}) => {
  return <h1 className="text-center text-4xl">{children}</h1>;
};
