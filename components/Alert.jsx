import React, { useEffect } from "react";
import AlertProvider, { useAlert } from "../hooks/useAlert";

export default function AlertPopup(props) {
  const { activeAlert, alerts, consumeAlert } = useAlert();

  // useEffect(() => {
  //   if (alerts.length > 0) {
  //     setTimeout(() => {
  //       consumeAlert();
  //     }, 5000);
  //   }
  // }, []);
  const classes = "alert " + activeAlert?.type + "alert-popup";
  if (alerts.length > 0) {
    return <span className={classes}>{activeAlert?.text}</span>;
  }
  return false;
}
