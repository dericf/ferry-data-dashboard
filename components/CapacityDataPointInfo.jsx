import React from 'react'
import moment from 'moment'

export default function CapacityDataPointInfo({datapoint}) {
	
	return (
		<div>

		{/* <td className="right" style={{borderRight: "none"}}>{row.date_of_sailing}</td>
		<td className="right" style={{borderLeft: "none"}}>{row.time_of_sailing}</td>
		<td className="center">{row.percent_available} %</td>
		<td className="right">{row.date_recorded}</td>
		<td className="right">{row.time_recorded}</td> */}

			<h1>{datapoint.id} - {datapoint.crossing_name}</h1>
			{/* <p>{moment("2020-01-01 " + "20:24:17-08").format()}</p> */}

			<div className="flex flex-col jus		tify-center align-center" style={{flexWrap: 0}}>
			<p>Sailing Time: <strong>{moment(datapoint.date_recorded).format('dddd, MMMM Do YYYY z')} at {moment(datapoint.date_of_sailing + " " + datapoint.time_of_sailing).format('h:mm:ss A')}</strong></p>
				<span>Capacity Available: {datapoint.percent_available} %</span>
				<p>Datapoint Recorded on <strong> {moment(datapoint.date_recorded).format('dddd, MMMM Do YYYY z')} at {moment(datapoint.date_recorded + " " + datapoint.time_recorded).format('h:mm:ss A')} (PST)</strong> </p>
			</div>
		</div>
	)
}
