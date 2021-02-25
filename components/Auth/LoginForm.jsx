import { useBasicAuth } from "../../hooks/useBasicAuth";
import { useLoading } from "../../hooks/useLoading";
import { usePingServer } from "../../hooks/usePingServer";
import { Button } from "../Button";

export const LoginForm = () => {
  const {
    isAuthenticated,
    pwd,
    setPwd,
    logout,
    tryAuthenticateWithPassword,
  } = useBasicAuth();

  const { isLoading, setIsLoading } = useLoading();

  const { pingServer } = usePingServer();

  return (
    <form className="flex flex-col p-8 bg-white mx-auto mt-6 rounded-md shadow-inner border " method="post" action="#">
      <input
        className={`input-basic text-center`}
        type="password"
        name="password"
        id="password"
        placeholder="password"
        autoComplete="autocomplete"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <Button
        color="blue"
        className="mt-2"
        loading={isLoading}
        type="submit"
        disabled={pwd.length === 0}
        onClick={async (e) => {
          setIsLoading(true);
          e.preventDefault();
          await tryAuthenticateWithPassword(pwd);
          setTimeout(() => {
            setIsLoading(false);
          }, 400);
        }}
      >
        Log In
      </Button>
    </form>
  );
};
