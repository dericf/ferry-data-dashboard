import React from 'react'
import moment from 'moment'

import { date_format, time_format } from "../utilities/dates";

export default function CapacityDataPointInfo({datapoint}) {
	
	return (
		<div>
			<div className="flex flex-col justify-center align-start text-left" style={{flexWrap: 0}}>
				<p>Sailing Time: <strong>{ date_format(datapoint.date_recorded)} at {time_format(datapoint.date_of_sailing + " " + datapoint.time_of_sailing)}</strong></p>
				<span>Capacity Available: <strong>{datapoint.percent_available} %</strong></span>
				<p>Datapoint Recorded on <strong> {date_format(datapoint.date_recorded)} at {time_format(datapoint.date_recorded + " " + datapoint.time_recorded)}</strong> </p>
			</div>
		</div>
	)
}
