import { useState } from "react";
import { useInputValue } from "./useInputValue";

export const useBasicAuth = initialValue => {
  const [auth, setAuth] = useState(initialValue);
	// const [pwd, setPwd] = useState("");
	useInputValue()
   return {
     auth,
		 setAuth,
		 test: () => {
			 console.log("Testing,......,")
		 }  
  };
};