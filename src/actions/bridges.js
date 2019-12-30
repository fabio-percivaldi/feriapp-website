import { CALCULATE_BRIDGES, SELECT_BRIDGE, CALCULATE_CALENDAR, CHANGE_SETTINGS } from '../constants/action-types'


export function calculateBridges(dayOfHolidays) {
  return { type: CALCULATE_BRIDGES, payload: dayOfHolidays }
};

export function selectBridge(bridge) {
  return { type: SELECT_BRIDGE, payload: bridge}
}

export function calculateCalendarDays(month) {
  return { type: CALCULATE_CALENDAR, payload: month}
}

export function changeSettings(settings) {
  return {type: CHANGE_SETTINGS, payload: settings}
}