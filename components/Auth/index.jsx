import { useBasicAuth } from "../../hooks/useBasicAuth";
import { usePingServer } from "../../hooks/usePingServer";

export const Auth = () => {
  const {
    isAuthenticated,
    pwd,
    setPwd,
    logout,
    tryAuthenticateWithPassword,
  } = useBasicAuth();

  const { pingServer } = usePingServer();

  return (
    <form className="flex flex-col px-2 py-3 border">
      {isAuthenticated ? (
        <span className="alert success text-center text-medium mb-1">
          Authenticated
        </span>
      ) : (
        <span className="alert error text-medium mb-1">Not Authenticated</span>
      )}
      <input
        className="text-center"
        type="password"
        name="password"
        id="password"
        placeholder="password"
        autoComplete="autocomplete"
        disabled={isAuthenticated}
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />

      {!isAuthenticated && (
        <button
          className="button-primary"
          style={{ marginTop: "0.5rem" }}
          onClick={async (e) => {
            e.preventDefault();
            await pingServer();
            try {
              tryAuthenticateWithPassword(e, pwd);
            } catch (error) {
              return false;
            }
          }}
        >
          Authenticate
        </button>
      )}

      {isAuthenticated && (
        <>
          <button style={{ marginTop: "0.5rem" }} onClick={logout}>
            Logout
          </button>
        </>
      )}
    </form>
  );
};
