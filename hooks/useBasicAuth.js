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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDemoUser, setIsDemoUser] = useState(false);
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
			const json = await res.json()
      setIsDemoUser(json.isDemoUser)
      setIsAuthenticated(true);
      sendAlert(`You have been logged in ${json.isDemoUser === true ? "(As Demo user)" : ""}`);
    } else {
      setIsAuthenticated(false);
      sendError("Wrong Password");
    }
  };

  const logout = () => {
    setPwd("");
		setIsAuthenticated(false);
  };

  return (
    <BasicAuthContext.Provider
      value={{
        isAuthenticated,
        isDemoUser,
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
    isDemoUser,
    tryAuthenticateWithPassword,
    pwd,
    setPwd,
    logout,
  } = useContext(BasicAuthContext);
  return {
    isAuthenticated,
    isDemoUser,
    tryAuthenticateWithPassword,
    pwd,
    setPwd,
    logout,
  };
};
