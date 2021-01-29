import { useState } from "react";

export const useLoadingScreen = (initialValue=null) => {
	const [loading, setShowLoadingScreen] = useState(initialValue);
  const [loadingMessage, setLoadingMessage] = useState();

  const setLoading = (show, message=null) => {
    setLoadingMessage(message)
    setShowLoadingScreen(show)
  }

   return {
     loading,
     loadingMessage,
		 setLoading,
  };
};