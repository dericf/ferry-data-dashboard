import React, { useEffect, useState } from 'react'
import { useIsLoading } from '../hooks/useIsLoading';

export default function LoadingBackdrop() {
	const [dotCount, setDotCount] = useState(['.'])
	const {loadingState} = useIsLoading()
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
			{loadingState.text && (<h2>{loadingState.text}</h2>)}
			<h3>{dotCount.map((dot, index) => <span key={dot+index}>{dot}</span>)}</h3>
		</div>
	)
}
