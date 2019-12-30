import { CALCULATE_BRIDGES, SELECT_BRIDGE, CALCULATE_CALENDAR, CALCULATE_SETTINGS } from '../constants/action-types'


export function calculateBridges(dayOfHolidays) {
  return { type: CALCULATE_BRIDGES, payload: dayOfHolidays }
};

export function selectBridge(bridge) {
  return { type: SELECT_BRIDGE, payload: bridge}
}

export function calculateCalendarDays(month) {
  return { type: CALCULATE_CALENDAR, payload: month}
}

export function calculateNewSettings(settings) {
  return {type: CALCULATE_SETTINGS, payload: settings}
}