import moment from 'moment'

export const date_format = (input) => {
	return moment(input).format('ddd, MMM Do YYYY')
}

export const time_format = (input) => {
	return moment(input).format('h:mm A (Z)')
}