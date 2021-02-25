import { useBasicAuth } from "../../hooks/useBasicAuth";

export const MainTitle = () => {
  const {isDemoUser} = useBasicAuth()
  return <h1 className="text-center text-4xl">Ferry Capacity Dashboard {isDemoUser === true ? "(Demo)" : ""}</h1>;
};
