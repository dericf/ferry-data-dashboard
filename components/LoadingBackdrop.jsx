import React, { useEffect, useState } from 'react'

export default function LoadingBackdrop() {
	const [dotCount, setDotCount] = useState([])

	useEffect(() => {
		setTimeout(() => {
			if (dotCount.length < 10) {
				setDotCount([...dotCount, '.'])
				
			} else {
				setDotCount([])
			}
		}, 200);
	}, [dotCount])

	return (
		<div className="loading">
			<h2>{dotCount.map(dot => <span>{dot}</span>)}</h2>
		</div>
	)
}
