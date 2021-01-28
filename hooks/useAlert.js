import { useState } from "react";

export const useAlertPopup = (initialValue=null) => {
	const [alertText, setAlertText] = useState(initialValue);
	const [alertStatus, setAlertStatus] = useState("info");
   return {
     alertText,
		 setAlertText,
		 setAlertStatus
  };
};