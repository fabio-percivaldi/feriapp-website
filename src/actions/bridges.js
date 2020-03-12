import {
  CALCULATE_BRIDGES,
  SELECT_BRIDGE,
  CALCULATE_CALENDAR,
  CHANGE_SETTINGS,
  ADD_CUSTOM_HOLIDAY,
  REQUEST_FLIGHTS,
  RECEIVE_FLIGHTS,
  INVALIDATE_FLIGHTS,
  REQUEST_IG_MEDIA,
  RECEIVE_IG_MEDIA
} from '../constants/action-types'

import axios from 'axios'
import config from "../config";
const { URL: API_GATEWAY_URL, KEY: API_KEY } = config.apiGateway
const apiGatewayClient = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'x-api-key': API_KEY
  }
})

export function calculateBridges(dayOfHolidays) {
  return { type: CALCULATE_BRIDGES, payload: dayOfHolidays }
};

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
  return { type: ADD_CUSTOM_HOLIDAY, payload: settings }
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
export function invalidateFligths(subreddit) {
  return {
    type: INVALIDATE_FLIGHTS,
    subreddit
  }
}

export function fetchIGMedia() {
  return function (dispatch) {
    dispatch(requestIGMedia())
    return apiGatewayClient.get('/igMedia')
      .then(response => {
        const sortedMedia = response.data.media.sort((media1, media2) => {
          if(media1.mediaId < media2.mediaId) {
            return 1
          } 
          if(media1.mediaId > media2.mediaId) {
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
    const { start: outboundDate, end: inboundDate } = bridge

    const cheapestFlights = await apiGatewayClient.get(`/flights?originCity=${origin.city}&outboundDate=${outboundDate}&inboundDate=${inboundDate}&locale=it-IT&currency=EUR`)
    return dispatch(receiveFlights(cheapestFlights.data))
  }
}
