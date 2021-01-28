import { useState } from "react";

export const useLoadingScreen = (initialValue=null) => {
	const [loading, setLoading] = useState(initialValue);
	
   return {
     loading,
		 setLoading,
  };
};