import React, { useEffect } from 'react'

export default function AlertPopup({text, setText}) {
	useEffect(() => {
		setTimeout(() => {
			setText("")		
		}, 5000);
	}, [])
	if (!text || text?.length == 0) {
		return false
	}
	return (
		<span className="alert success alert-popup">{text}</span>
	)
}
