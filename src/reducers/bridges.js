import { CALCULATE_BRIDGES, SELECT_BRIDGE, CALCULATE_CALENDAR, CHANGE_SETTINGS, ADD_CUSTOM_HOLIDAY } from "../constants/action-types";
import * as Kazzenger from '../kazzenger-core/kazzenger'
import deepEqual from 'deep-equal'
import moment from 'moment'
import axios from 'axios';

const skyScannerClient = axios.create({
    baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/',
    headers: {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "f241036916msh736ffa7aaa9d64fp1a743ajsn26d5430892c5"
    }
})

const BRIDGES_COLOR = ['rgba(255, 0, 0, 0.62)', '#00800082', 'orange', 'blue']
const defaultLocation = { country: 'IT', city: 'Milano' }
const defaultDaysOff = [0, 6]
const defaultKazzengerSettings = {
    ...defaultLocation,
    daysOff: defaultDaysOff,
}

let _kazzenger = null
let _kazzengerSettings = null
const getKazzenger = (settings) => {
    if (!_kazzenger || (settings && !deepEqual(settings, _kazzengerSettings))) {
        _kazzengerSettings = settings || defaultKazzengerSettings
        _kazzenger = new Kazzenger.default(_kazzengerSettings)
        console.log('creted new Kazzenger')
    }
    return _kazzenger
}
const bridges = (kazzenger, dayOfHolidays) => {
    //  const now = new Date('2019-01-01T00:00:00Z')
    const now = new Date()
    return kazzenger
        .bridgesByYears({
            start: now,
            end: new Date(`${now.getFullYear() + 2}-12-31T12:00:00Z`),
            maxHolidaysDistance: 4,
            maxAvailability: dayOfHolidays,
        })
        .map(years => {
            const scores = []
            years.bridges.forEach(bridge => {
                bridge.rate = kazzenger.rateBridge(bridge)
                if (bridge.rate > 70) {
                    scores.push(bridge.rate)
                }
                bridge.id = `${moment(bridge.start).format('YYYY-MM-DD')}-${moment(bridge.end).format('YYYY-MM-DD')}`
                bridge.isSelected = false
            })
            scores.sort().reverse()
            years.bridges.forEach(bridge => {
                const index = scores.indexOf(bridge.rate)
                bridge.isTop = index >= 0 && index < 2
            })
            return years
        })
}

const calculateMonthlyCalendar = (currentMonth, bridges, kazzenger) => {
    const firstDayInCurrentMonth = currentMonth.startOf('month')

    let days = []
    for (let i = - firstDayInCurrentMonth.format('d'); i < 42; i++) {
        const day = moment(firstDayInCurrentMonth).add(i, 'days')
        const isHolidayOrWeekend = kazzenger.isHolidayOrWeekend(day)
        days.push({
            day,
            bridges: [],
            ...isHolidayOrWeekend
        })
    }
    const weeks = [
        {
            days: days.slice(0, 7)
        },
        {
            days: days.slice(7, 14)
        },
        {
            days: days.slice(14, 21)
        },
        {
            days: days.slice(21, 28)
        },
        {
            days: days.slice(28, 35)
        },
        {
            days: days.slice(35, 42)
        },
    ]
    weeks.forEach(week => {
        week.days.forEach(day => {
            const momentDay = day.day
            bridges.forEach((bridge, index) => {
                if (momentDay.isSameOrAfter(moment(bridge.start), 'day') && momentDay.isSameOrBefore(moment(bridge.end), 'day')) {
                    if (index > day.bridges.length) {
                        day.bridges.push({})
                    }
                    day.bridges.push({
                        ...bridge,
                        background: BRIDGES_COLOR[index]
                    })

                }
            })
        })
    })
    return weeks
}
const calculateSelectedBridges = (selectedBridges, bridge) => {
    const newBridges = [...selectedBridges]
    const foundedBridge = newBridges.find(bri => bri.id === bridge.id)

    const index = newBridges.indexOf(foundedBridge)

    let isANewBridge = true
    if (index === -1) {
        newBridges.push(bridge)
    } else {
        isANewBridge = false
        newBridges.splice(index, 1)
    }
    newBridges.sort((br1, br2) => {
        if (moment(br1.start).isBefore(moment(br2.start))) {
            return -1
        }
        if (moment(br1.start).isAfter(moment(br2.start))) {
            return 1
        }
        return 0
    })
    return {
        newBridges,
        isANewBridge
    }
}
const updateBridges = (bridgesList, clickedBridge) => {
    const bridgeListCopy = JSON.parse(JSON.stringify(bridgesList))

    bridgeListCopy.forEach(bridgeYear => {
        const foundedBridge = bridgeYear.bridges.find(bridge => {
            return bridge.id === clickedBridge.id
        })
        if (foundedBridge) {
            foundedBridge.isSelected = clickedBridge.isSelected
        }
    })
    return bridgeListCopy
}
async function calculateNewFlights(selectedBridges) {
    const {start: outboundDate, end: inboundDate} = selectedBridges.newBridges[0]
    const {data} = await skyScannerClient.get("autosuggest/v1.0/IT/EUR/it-IT/?query=Milan")
    const originPlaceSkyId = data.Places[0].PlaceId
    const {data: flightResponse} = await skyScannerClient.get(`browseroutes/v1.0/IT/EUR/it-IT/${originPlaceSkyId}/anywhere/${moment(outboundDate).format('YYYY-MM-DD')}?inboundpartialdate=${moment(inboundDate).format('YYYY-MM-DD')}`)
    const {Routes, Places, Quotes} = flightResponse
    const sortedFlights = Routes.sort((f1, f2) => {
        if(f1.Price < f2.Price) {
            return -1
        }
        if(f1.Price> f2.Price) {
            return 1
        }
        return 0
    })
    const cheapestFlights = sortedFlights.slice(0, 5)
    cheapestFlights.forEach(flight => {
        const quotes = Quotes.filter(quote => flight.QuoteIds.includes(quote.QuoteId))
        if(quotes) {
            flight.Quotes = quotes
        }
        flight.Quotes.forEach(quote => {
            const quotePlace = Places.find(place => place.PlaceId === quote.OutboundLeg.DestinationId)
            quote.DestinationPlace = quotePlace
        });
        const originPlace = Places.find(place => place.PlaceId === flight.OriginId)
        if(originPlace) {
            flight.OriginPlace = originPlace
        }
        const destinationPlace = Places.find(place => place.PlaceId === flight.DestinationId)
        if(destinationPlace) {
            flight.DestinationPlace = destinationPlace
        }
    })
    return cheapestFlights
}
const initialState = {
    bridges: bridges(getKazzenger(), 2),
    selectedBridges: [],
    weeks: calculateMonthlyCalendar(moment(), [], getKazzenger()),
    currentMonth: moment(),
    dayOfHolidays: 2,
    kazzenger: getKazzenger(),
    daysOff: [0, 6],
    flights: [],
    holidays: [
        { imageUrl: 'myanmar_card', days: '12 FEBRAIO', holidayDescription: 'UNION DAY IN MYANMAR' },
        { imageUrl: 'agriculture_card', days: '13 FEBRAIO', holidayDescription: 'UNION DAY IN MYANMAR' },
        { imageUrl: 'road_card', days: '14 FEBRAIO', holidayDescription: 'UNION DAY IN MYANMAR' }]
};
function rootReducer(state = initialState, action) {
    let nextWeeks
    let bridgesResult
    switch (action.type) {
        case CALCULATE_BRIDGES:
            bridgesResult = bridges(state.kazzenger, action.payload)
            nextWeeks = calculateMonthlyCalendar(state.currentMonth, initialState.selectedBridges, state.kazzenger)
            return { ...state, bridges: bridgesResult, weeks: nextWeeks, selectedBridges: initialState.selectedBridges, dayOfHolidays: action.payload }

        case SELECT_BRIDGE:
            const selectedBridges = calculateSelectedBridges(state.selectedBridges, action.payload)
            const nextMonth = selectedBridges.isANewBridge ? moment(action.payload.start) : state.currentMonth
            nextWeeks = calculateMonthlyCalendar(nextMonth, selectedBridges.newBridges, state.kazzenger)
            const newBridgesList = updateBridges(state.bridges, action.payload)
            let flights
            if (selectedBridges.isANewBridge) {
                flights = calculateNewFlights(selectedBridges)
            }
            return { ...state, currentMonth: nextMonth, weeks: nextWeeks, bridges: newBridgesList, selectedBridges: selectedBridges.newBridges, flights }

        case CALCULATE_CALENDAR:
            nextWeeks = calculateMonthlyCalendar(action.payload, state.selectedBridges, state.kazzenger)
            return { ...state, currentMonth: action.payload, weeks: nextWeeks }

        case CHANGE_SETTINGS:
            const newKazzenger = getKazzenger(action.payload)
            nextWeeks = calculateMonthlyCalendar(state.currentMonth, initialState.selectedBridges, newKazzenger)
            bridgesResult = bridges(newKazzenger, state.dayOfHolidays)
            return { ...state, weeks: nextWeeks, bridges: bridgesResult, daysOff: action.payload.daysOff, selectedBridges: initialState.selectedBridges, kazzenger: newKazzenger }

        case ADD_CUSTOM_HOLIDAY:
            state.kazzenger.addHolidays([action.payload])
            nextWeeks = calculateMonthlyCalendar(state.currentMonth, initialState.selectedBridges, state.kazzenger)
            bridgesResult = bridges(state.kazzenger, state.dayOfHolidays)
            return { ...state, weeks: nextWeeks, bridges: bridgesResult, selectedBridges: initialState.selectedBridges }
        default:
            return state
    }
};
export default rootReducer;