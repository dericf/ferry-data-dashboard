import React from 'react'
import moment from 'moment'

import { date_format, time_format } from "../utilities/dates";

export default function CapacityDataPointInfo({datapoint}) {
	
	return (
		<div>

		{/* <td className="right" style={{borderRight: "none"}}>{row.date_of_sailing}</td>
		<td className="right" style={{borderLeft: "none"}}>{row.time_of_sailing}</td>
		<td className="center">{row.percent_available} %</td>
		<td className="right">{row.date_recorded}</td>
		<td className="right">{row.time_recorded}</td> */}

			<h1>{datapoint.crossing_name} - (ID: {datapoint.id})</h1>
			{/* <p>{moment("2020-01-01 " + "20:24:17-08").format()}</p> */}

			<div className="flex flex-col justify-center align-start" style={{flexWrap: 0}}>
			<p>Sailing Time: <strong>{ date_format(datapoint.date_recorded)} at {time_format(datapoint.date_of_sailing + " " + datapoint.time_of_sailing)}</strong></p>
				<span>Capacity Available: <strong>{datapoint.percent_available} %</strong></span>
				<p>Datapoint Recorded on <strong> {date_format(datapoint.date_recorded)} at {time_format(datapoint.date_recorded + " " + datapoint.time_recorded)}</strong> </p>
			</div>
		</div>
	)
}
