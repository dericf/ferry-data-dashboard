import React, { useState, useContext, createContext } from "react";

export const initialLoadingState = {
  isLoading: false,
  text: "Loading",
  overlay: false,
};

export const LoadingContext = createContext(initialLoadingState);

export default function LoadingProvider({ children }) {
  const [loadingState, setLoadingState] = useState(initialLoadingState);

  return (
    <LoadingContext.Provider
      value={{
        loadingState,
        setLoadingState,
				initialLoadingState
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export const useIsLoading = () => {
  const { loadingState, setLoadingState, initialLoadingState } = useContext(LoadingContext);
  return {
    loadingState,
		setLoadingState,
		initialLoadingState
  };
};
