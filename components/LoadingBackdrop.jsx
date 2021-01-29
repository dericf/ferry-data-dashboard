import React, { useEffect, useState } from 'react'

export default function LoadingBackdrop({message}) {
	const [dotCount, setDotCount] = useState(['.'])
	useEffect(() => {
		let timeoutId = setTimeout(() => {
			if (dotCount.length < 10) {
				setDotCount([...dotCount, '.'])
				
			} else {
				setDotCount(['.'])
			}
		}, 200);
		return () => (
			clearTimeout(timeoutId)
		)
	}, [dotCount])

	return (
		<div className="loading">
			<div>{message && (<h2>{message}</h2>)}</div>
			<div><h3>{dotCount.map((dot, index) => <span key={dot+index}>{dot}</span>)}</h3></div>
		</div>
	)
}
