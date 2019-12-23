import { CALCULATE_BRIDGES } from '../constants/action-types'


export function calculateBridges(dayOfHolidays) {
  return { type: CALCULATE_BRIDGES, payload: dayOfHolidays }
};