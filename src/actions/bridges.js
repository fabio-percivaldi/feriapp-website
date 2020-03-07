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

import moment from 'moment'
import axios from 'axios'
import config from "../config";
const API_GATEWAY_URL = config.apiGateway.URL
const apiGatewayClient = axios.create({
  baseURL: API_GATEWAY_URL,
})
const skyScannerClient = axios.create({
  baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/',
  headers: {
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "f241036916msh736ffa7aaa9d64fp1a743ajsn26d5430892c5"
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
    return apiGatewayClient.get('/getIgMedia')
      .then(response => {
        dispatch(receiveIGMedia(response.data.media))
      })
  }
}
export function fetchFlights(bridge, origin) {
  return function (dispatch) {
    dispatch(requestFlights(bridge, origin))
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return skyScannerClient.get(`autosuggest/v1.0/${origin.country}/EUR/it-IT/?query=${origin.city}`)
      .then(
        null,
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        const { start: outboundDate, end: inboundDate } = bridge
        const { data } = json
        const originPlaceSkyId = data.Places[0].PlaceId
        skyScannerClient.get(`browseroutes/v1.0/IT/EUR/it-IT/${originPlaceSkyId}/anywhere/${moment(outboundDate).format('YYYY-MM-DD')}?inboundpartialdate=${moment(inboundDate).format('YYYY-MM-DD')}`)
          .then(response => {
            const { data: flightResponse } = response

            const { Routes, Places, Quotes } = flightResponse
            const filteredRoutes = Routes.filter(route => Boolean(route.QuoteIds && route.Price))
            const sortedFlights = filteredRoutes.sort((f1, f2) => {
              if (f1.Price < f2.Price) {
                return -1
              }
              if (f1.Price > f2.Price) {
                return 1
              }
              return 0
            })
            const cheapestFlights = sortedFlights.slice(0, 5)
            cheapestFlights.forEach(flight => {
              flight.InboundDate = moment(inboundDate).format('YYYY-MM-DD')
              flight.OutboundDate = moment(outboundDate).format('YYYY-MM-DD')
              const quotes = Quotes.filter(quote => flight.QuoteIds.includes(quote.QuoteId))
              if (quotes) {
                flight.Quotes = quotes
              }
              flight.Quotes.forEach(quote => {
                const quotePlace = Places.find(place => place.PlaceId === quote.OutboundLeg.DestinationId)
                quote.DestinationPlace = quotePlace
              });
              const originPlace = Places.find(place => place.PlaceId === flight.OriginId)
              if (originPlace) {
                flight.OriginPlace = originPlace
              }
              const destinationPlace = Places.find(place => place.PlaceId === flight.DestinationId)
              if (destinationPlace) {
                flight.DestinationPlace = destinationPlace
              }
            })
            dispatch(receiveFlights(cheapestFlights))
          })
      }
      )
  }
}
