import { useBasicAuth } from "../../hooks/useBasicAuth";
import { usePingServer } from "../../hooks/usePingServer";

export const LogoutButton = () => {
  const { logout } = useBasicAuth();

  return (
    <div
      className="flex flex-col justify-end px-2 my-2"
			style={{position: "fixed", top: 0, left: 0}}
    >
      {/* <span className="alert success text-small text-center">
        Authenticated
      </span> */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};
