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
		<div className="flex flex-col fixed left-0 top-0 h-screen w-screen justify-center align-center bg-blue-500 opacity-100">
			{loadingState.text && (<h2 className="text-4xl text-center">{loadingState.text}</h2>)} 
			<h3 className="text-2xl text-center">{dotCount.map((dot, index) => <span key={dot+index}>{dot}</span>)}</h3>
		</div>
	)
}
