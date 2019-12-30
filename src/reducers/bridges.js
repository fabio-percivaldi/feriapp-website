import { CALCULATE_BRIDGES, SELECT_BRIDGE, CALCULATE_CALENDAR } from "../constants/action-types";
import * as Kazzenger from '../kazzenger-core/kazzenger'
import deepEqual from 'deep-equal'
import moment from 'moment'

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
            })
            scores.sort().reverse()
            years.bridges.forEach(bridge => {
                const index = scores.indexOf(bridge.rate)
                bridge.isTop = index >= 0 && index < 2
            })
            return years
        })
}

const calculateMonthlyCalendar = (currentMonth, bridges, settings) => {
    const firstDayInCurrentMonth = currentMonth.startOf('month')
    
    let days = []
    for(let i = - firstDayInCurrentMonth.format('d'); i< 42; i++) {
        const day = moment(firstDayInCurrentMonth).add(i, 'days')
        const isHolidayOrWeekend = getKazzenger().isHolidayOrWeekend(day)
        days.push({
            day,
            isBridge: false,
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
            bridges.forEach(bridge => {
                if(momentDay.isSameOrAfter(moment(bridge.start), 'day')  && momentDay.isSameOrBefore(moment(bridge.end), 'day')){
                    day.isBridge = true
                }
            })
        })
    })    
    return weeks
}
const calculateSelectedBridges = (selectedBridges, bridge) => {
    const newBridges = [...selectedBridges]
    const index = newBridges.indexOf(bridge)
    if(index === -1) {
        newBridges.push(bridge)
    } else {
        newBridges.splice(index, 1)
    }
    return newBridges
}
const initialState = {
    bridges: bridges(getKazzenger(), 2),
    selectedBridges: [],
    weeks: calculateMonthlyCalendar(moment(), [], defaultKazzengerSettings),
    currentMonth: moment(),
    dayOfHolidays: 2,
    settings: defaultKazzengerSettings
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CALCULATE_BRIDGES:
            const bridgesResult = bridges(getKazzenger(), action.payload)
            return { ...state, bridges: bridgesResult, dayOfHolidays: action.payload }

        case SELECT_BRIDGE:
            const selectedBridges = calculateSelectedBridges(state.selectedBridges, action.payload)
            const nextWeeksWithBridges = calculateMonthlyCalendar(state.currentMonth, selectedBridges, state.settings)
            return { ...state, weeks: nextWeeksWithBridges, selectedBridges }

        case CALCULATE_CALENDAR:
            const nextWeeks = calculateMonthlyCalendar(action.payload, state.selectedBridges, state.settings)
            return { ...state, weeks: nextWeeks, currentMonth: action.payload }
        default:
            return state
    }
};
export default rootReducer;