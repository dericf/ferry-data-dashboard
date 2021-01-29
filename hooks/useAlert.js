import { useState, useContext, createContext } from "react";



export const initialAlertValue = {
	alert: {
		text: "",
		type: "success",
		active: false,
	},
	setAlert: (_) => {},
	sendAlert: (_) => {},
	sendError: (_) => {},
	resetAlert: () => {},
}

export const AlertContext = createContext(initialAlertValue)

import React from 'react'

export default function AlertProvider({children}) {
	
	const [alert, setAlert] = useState({
		text: "",
		type: "success",
		active: false,
	})

	const resetAlert = () => {
		setAlert({
			text: "",
			type: "success",
			active: false,
		})
	}

	const sendAlert = (text) => {
		setAlert({
			text: text,
			type: "success",
			active: true,
		})
	}

	const sendError = (text) => {
		setAlert({
			text: text,
			type: "error",
			active: true,
		})
	}

	return (
		<AlertContext.Provider value={{alert, setAlert, sendAlert, sendError, resetAlert}}>
		{children}
		</AlertContext.Provider>
	)
}


export const useAlert = () => {
	const {alert, resetAlert, sendAlert, sendError} =  useContext(AlertContext)	
	return {
		alert,
		resetAlert,
		sendAlert,
		sendError
  };
};