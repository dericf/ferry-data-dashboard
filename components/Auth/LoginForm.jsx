import { useBasicAuth } from "../../hooks/useBasicAuth";
import { usePingServer } from "../../hooks/usePingServer";

export const LoginForm = () => {
  const {
    isAuthenticated,
    pwd,
    setPwd,
    logout,
    tryAuthenticateWithPassword,
  } = useBasicAuth();

  const { pingServer } = usePingServer();

  return (
    <form
      className="flex flex-col align-stretch px-2 py-3 mx-auto"
      style={{ maxWidth: "25vw", minWidth: 320 }}
    >
      <span className="alert text-large text-center">
        Not Authenticated
      </span>

      <>
        <input
          className="text-center"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="autocomplete"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button
          className="button-success mt-1"
          disabled={pwd.length < 4}
          onClick={async (e) => {
            e.preventDefault();
            await tryAuthenticateWithPassword(pwd);
          }}
        >
          Authenticate
        </button>
      </>
    </form>
  );
};
