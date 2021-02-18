import React, { useState, useContext, createContext } from "react";
import { useAlert } from "./useAlert";
import { useIsLoading } from "./useIsLoading";
import { useRouter} from 'next/router'
export const initialBasicAuthValue = {
  isAuthenticated: false,
  pwd: "",
  setPwd: (_) => {},
  tryAuthenticateWithPassword: (_) => {},
  logout: () => {},
};

export const BasicAuthContext = createContext(initialBasicAuthValue);

export default function BasicAuthProvider({ children }) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [pwd, setPwd] = useState("");
  const { sendAlert, sendError } = useAlert();
  const { loadingState, setLoadingState, initialLoadingState } = useIsLoading();

	const router = useRouter()

  const tryAuthenticateWithPassword = async (pwd) => {
    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    });
    if (res.status >= 200 && res.status < 300) {
			// const json = res.json()
      setisAuthenticated(true);
      sendAlert("You have been logged in");
    } else {
      setisAuthenticated(false);
      sendError("Wrong Password");
    }
  };

  const logout = () => {
    setPwd("");
		setisAuthenticated(false);
  };

  return (
    <BasicAuthContext.Provider
      value={{
        isAuthenticated,
        tryAuthenticateWithPassword,
        pwd,
        setPwd,
        logout,
      }}
    >
      {children}
    </BasicAuthContext.Provider>
  );
}

export const useBasicAuth = () => {
  const {
    isAuthenticated,
    tryAuthenticateWithPassword,
    pwd,
    setPwd,
    logout,
  } = useContext(BasicAuthContext);
  return {
    isAuthenticated,
    tryAuthenticateWithPassword,
    pwd,
    setPwd,
    logout,
  };
};
