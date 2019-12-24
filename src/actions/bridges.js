import { CALCULATE_BRIDGES, SELECT_BRIDGE, CALCULATE_CALENDAR } from '../constants/action-types'


export function calculateBridges(dayOfHolidays) {
  return { type: CALCULATE_BRIDGES, payload: dayOfHolidays }
};

export function selectBridge(bridge) {
  return { type: SELECT_BRIDGE, payload: bridge}
}

export function calculateCalendarDays(month) {
  return { type: CALCULATE_CALENDAR, payload: month}
}