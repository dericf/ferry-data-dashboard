import React, { useEffect } from "react";
import AlertProvider, { useAlert } from "../hooks/useAlert";

export default function AlertPopup(props) {
  const { alert, resetAlert } = useAlert();
  useEffect(() => {
		if (alert.active === true){
			setTimeout(() => {
				resetAlert();
			}, 5000);
		}
  }, [alert]);
	const classes = `alert ${alert.type} alert-popup`
	if (alert?.active === true) {
		return <span className={classes}>{alert.text}</span>
	}
  return false
}
