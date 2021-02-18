import { useBasicAuth } from "../../hooks/useBasicAuth";
import { usePingServer } from "../../hooks/usePingServer";
import { Button } from "../Button";

export const LogoutButton = () => {
  const { logout } = useBasicAuth();

  return (
    <div
      className="flex flex-col justify-end px-2 my-2 fixed top-2 right-2 z-10"
    >
      {/* <span className="alert success text-small text-center">
        Authenticated
      </span> */}
      <Button color="white" onClick={logout}>Logout</Button>
    </div>
  );
};
