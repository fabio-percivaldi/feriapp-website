import {
    RECEIVE_BRIDGES,
    REQUEST_BRIDGES,
    CHANGE_DAY_OF_HOLIDAYS,
    SELECT_BRIDGE,
    CALCULATE_CALENDAR,
    CHANGE_SETTINGS,
    TOGGLE_CUSTOM_HOLIDAY,
    REQUEST_FLIGHTS,
    RECEIVE_FLIGHTS,
    INVALIDATE_FLIGHTS,
    REQUEST_IG_MEDIA,
    RECEIVE_IG_MEDIA
} from "../constants/action-types";
import * as Kazzenger from '../kazzenger-core/kazzenger'
import deepEqual from 'deep-equal'
import moment from 'moment'
const BRIDGES_COLOR = ['rgba(255, 0, 0, 0.62)', '#00800082', 'orange', 'blue']
const defaultLocation = { country: 'IT', city: 'Milan' }
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
const initialState = {
    bridges: bridges(getKazzenger(), 2),
    selectedBridges: [],
    currentCity: defaultLocation,
    weeks: calculateMonthlyCalendar(moment(), [], getKazzenger()),
    currentMonth: moment(),
    dayOfHolidays: 2,
    kazzenger: getKazzenger(),
    daysOff: [0, 6],
    customHolidays: [],
    flights: [],
    media: [],
    isFetching: false,
    isFetchingBridges: false
};

function rootReducer(state = initialState, action) {
    let nextWeeks
    switch (action.type) {
        case REQUEST_BRIDGES:
            return { ...state, isFetchingBridges: true }
        case RECEIVE_BRIDGES:
            nextWeeks = calculateMonthlyCalendar(state.currentMonth, initialState.selectedBridges, state.kazzenger)
            return { ...state, isFetchingBridges: false, bridges: action.bridges, weeks: nextWeeks, selectedBridges: initialState.selectedBridges }

        case CHANGE_DAY_OF_HOLIDAYS:
            return {...state, dayOfHolidays: action.payload}

        case INVALIDATE_FLIGHTS:
        case REQUEST_FLIGHTS:
            return { ...state, isFetching: true }
        case RECEIVE_FLIGHTS:
            return { ...state, isFetching: false, flights: action.flights }
            
        case SELECT_BRIDGE:
            const selectedBridges = calculateSelectedBridges(state.selectedBridges, action.payload)
            const nextMonth = selectedBridges.isANewBridge ? moment(action.payload.start) : state.currentMonth
            nextWeeks = calculateMonthlyCalendar(nextMonth, selectedBridges.newBridges, state.kazzenger)
            const newBridgesList = updateBridges(state.bridges, action.payload)
            return { ...state, currentMonth: nextMonth, weeks: nextWeeks, bridges: newBridgesList, selectedBridges: selectedBridges.newBridges }

        case REQUEST_IG_MEDIA:
            return { ...state, isFetchingMedia: true }
        case RECEIVE_IG_MEDIA:
            return { ...state, isFetchingMedia: false, media: action.media }

        case CALCULATE_CALENDAR:
            nextWeeks = calculateMonthlyCalendar(action.payload, state.selectedBridges, state.kazzenger)
            return { ...state, currentMonth: action.payload, weeks: nextWeeks }

        case CHANGE_SETTINGS:
            const newKazzenger = getKazzenger(action.payload)
            nextWeeks = calculateMonthlyCalendar(state.currentMonth, initialState.selectedBridges, newKazzenger)
            return { ...state, weeks: nextWeeks, currentCity: { country: action.payload.country, city: action.payload.city }, daysOff: action.payload.daysOff, selectedBridges: initialState.selectedBridges, kazzenger: newKazzenger, flights: initialState.flights }

        case TOGGLE_CUSTOM_HOLIDAY:
            const foundCustomHoliday = state.customHolidays.find(holiday => holiday.date === action.payload.date)
            if(foundCustomHoliday) {
                state.customHolidays.splice(state.customHolidays.indexOf(foundCustomHoliday), 1)
            } else {
                state.customHolidays = [...state.customHolidays, action.payload]
            }
            nextWeeks = calculateMonthlyCalendar(state.currentMonth, initialState.selectedBridges, state.kazzenger)
            return { ...state, weeks: nextWeeks, customHolidays: [...state.customHolidays], selectedBridges: initialState.selectedBridges }
        default:
            return state
    }
};
export default rootReducer;