import React from 'react'

export default function Divider(props) {
	return (
		<div {...props} className={"border-b-2 border-solid w-10/12 mx-auto my-4 h-4 " + props?.className}>

		</div>
	)
}
