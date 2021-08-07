import {
  RECEIVE_BRIDGES,
  SELECT_BRIDGE,
  CALCULATE_CALENDAR,
  CHANGE_SETTINGS,
  TOGGLE_CUSTOM_HOLIDAY,
  REQUEST_FLIGHTS,
  RECEIVE_FLIGHTS,
  INVALIDATE_FLIGHTS,
  REQUEST_IG_MEDIA,
  RECEIVE_IG_MEDIA,
  REQUEST_BRIDGES,
  CHANGE_DAY_OF_HOLIDAYS,
  REQUEST_HOLIDAYS,
  RECEIVE_HOLIDAYS,
} from '../constants/action-types'

import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'
const API_VERSION = process.env.API_VERSION
const apiGatewayClient = axios.create({
})
export function changeDayOfHolidays(dayOfHolidays) {
  return {type: CHANGE_DAY_OF_HOLIDAYS, payload: dayOfHolidays}
}

export function selectBridge(bridge) {
  return { type: SELECT_BRIDGE, payload: bridge }
}

export function calculateCalendarDays(month) {
  return { type: CALCULATE_CALENDAR, payload: month }
}

export function changeSettings(settings) {
  return { type: CHANGE_SETTINGS, payload: settings }
}

export function addCustomHoliday(settings) {
  return { type: TOGGLE_CUSTOM_HOLIDAY, payload: settings }
}
function requestIGMedia() {
  return {
    type: REQUEST_IG_MEDIA,
    isFetchingMedia: true,
  }
}
function receiveIGMedia(media) {
  return {
    type: RECEIVE_IG_MEDIA,
    media,
    receivedAt: Date.now()
  }
}
function requestFlights(bridge) {
  return {
    type: REQUEST_FLIGHTS,
    isFetching: true,
    bridge
  }
}
function receiveFlights(flights) {
  return {
    type: RECEIVE_FLIGHTS,
    flights,
    receivedAt: Date.now()
  }
}
function requestBridges(settings) {
  return {
    type: REQUEST_BRIDGES,
    isFetching: true,
    settings
  }
}
function receiveBridges(bridges) {
  return {
    type: RECEIVE_BRIDGES,
    bridges,
    receivedAt: Date.now()
  }
}
function requestHolidays(city) {
  return {
    type: REQUEST_HOLIDAYS,
    isFetching: true,
    city
  }
}
function receiveHolidays(holidays) {
  return {
    type: RECEIVE_HOLIDAYS,
    holidays,
    receivedAt: Date.now()
  }
}
export function invalidateFligths(subreddit) {
  return {
    type: INVALIDATE_FLIGHTS,
    subreddit
  }
}

export function fetchIGMedia() {
  return function (dispatch) {
    dispatch(requestIGMedia())
    return apiGatewayClient.get(`/api/v1/igMedia`)
      .then(response => {
        const sortedMedia = response.data.media.sort((media1, media2) => {
          if (media1.timestamp < media2.timestamp) {
            return 1
          }
          if (media1.timestamp > media2.timestamp) {
            return -1
          }
          return 0
        })
        dispatch(receiveIGMedia(sortedMedia))
      })
  }
}
export function fetchFlights(bridge, origin) {
  return async function (dispatch) {
    dispatch(requestFlights(bridge, origin))
    // const { start: outboundDate, end: inboundDate } = bridge

    // const cheapestFlights = await apiGatewayClient.get(`/api/${API_VERSION}/flights`originCity=${origin.city}&outboundDate=${moment(outboundDate).format('YYYY-MM-DD')}&inboundDate=${moment(inboundDate).format('YYYY-MM-DD')}&locale=it-IT&currency=USD`)
    return dispatch(receiveFlights([]))
    // return dispatch(receiveFlights(cheapestFlights.data))
  }
}
export function fetchBridges(settings) {
  return async function (dispatch) {
    dispatch(requestBridges(settings))
    const { dayOfHolidays, customHolidays, city, daysOff } = settings
    const body = {
      dayOfHolidays,
      customHolidays,
      city,
      daysOff
    }
    const bridges = await apiGatewayClient.post(`/api/v${API_VERSION}/bridges`, body)
    return dispatch(receiveBridges(bridges.data))
  }
}
export function fetchHolidays(city) {
  return async function (dispatch) {
    dispatch(requestHolidays(city))
    const holidays = await apiGatewayClient.get(`/api/v1/getHolidaysByCity?city=${city}`)
    return dispatch(receiveHolidays(holidays.data))
  }
}