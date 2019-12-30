

const Holidays = require('date-holidays')
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24

const localHolidays = {
  it: require('../data/it-holidays'),
}

// https://github.com/commenthol/date-holidays-parser/blob/master/docs/Holidays.md#holidayssetholidayrule-opts
function Kazzenger({ country, state, region, city, daysOff, customHolidays }) {
  this.daysOff = daysOff || [0, 6]
  this.holidays = new Holidays()
  this.holidays.init(country, state, region)
  if (customHolidays) {
    setHolidays(this.holidays, customHolidays)
  }
  if (!city) {
    return
  }
  const localHolidays = getLocalHolidays({ country, state, region, city })
  if (localHolidays) {
    setHolidays(this.holidays, localHolidays)
  }
}

function getLocalHolidays({ country, city }) {
  const holidays = localHolidays[country.toLowerCase()]
  if (!holidays || !city) {
    return holidays
  }
  const cityLowerCase = city.toLowerCase()
  return holidays.filter(holiday => holiday.city.toLowerCase() === cityLowerCase)
}
Kazzenger.localHolidays = getLocalHolidays

function getCities({ country }) {
  const holidays = getLocalHolidays({ country })
  if (!holidays) {
    return []
  }
  return Array.from(holidays.reduce((cities, holiday) => {
    cities.add(holiday.city)
    return cities
  }, new Set()))
}
Kazzenger.cities = getCities

function setHolidays(holidaysLib, holidays) {
  holidays.forEach(holiday => {
    console.log('info', `will add holiday ${JSON.stringify(holiday)}`)
    if (!holidaysLib.setHoliday(holiday.date, holiday.name)) {
      console.log('error', `loadITCityHolidays > setHoliday( ${JSON.stringify(holiday)} > FAIL`)
    }
  })
}
Kazzenger.prototype.isHolidayOrWeekend = function isHoliday(momentDay) {
  const isWeekend = this.daysOff.includes(parseInt(momentDay.format('d')))
  const isHoliday = Object.keys(this.holidays.holidays).includes(momentDay.format('MM-DD'))
  return {
    isWeekend,
    isHoliday
  }
}

Kazzenger.prototype.isDayOff = function isDayOff(date) {
  return this.daysOff.indexOf(date.getDay()) !== (-1)
}

Kazzenger.prototype.getHolidays = function getHolidays(start, end) {
  if (start.getFullYear() === end.getFullYear()) {
    return this.holidays.getHolidays(start)
  }
  let holidays = this.holidays.getHolidays(start)
  for (let year = start.getFullYear() + 1; year <= end.getFullYear(); year++) {
    holidays = holidays.concat(this.holidays.getHolidays(year))
  }
  return holidays
}

Kazzenger.prototype.isHolidayOptimized = function isHolidayOptimized(date, holidays, offset) {
  if (this.isDayOff(date)) {
    return { isHoliday: true, offset }
  }
  for (let index = offset; index < holidays.length; index++) {
    const holiday = holidays[index]
    if (holiday.start >= date) {
      return { isHoliday: false, offset: index }
    } else if (date >= holiday.start && date <= holiday.end) {
      return { isHoliday: true, offset: index }
    }
  }
  return { isHoliday: false, offset }
}

function createBridge() {
  return {
    start: undefined,
    end: undefined,
    holidaysCount: 0,
    potentialWeekdaysCount: 0,
    weekdaysCount: 0,
    daysCount: 0,
  }
}

function bridgesHandleHoliday(data) {
  if (data.potentialBridges.length === 0 || (data.maxAvailability && data.lastHolidayDistance !== 0)) {
    data.potentialBridges.push(createBridge())
  }
  data.potentialBridges.forEach(bridge => {
    bridge.holidaysCount += 1
    if (!bridge.start) {
      bridge.start = data.date
    } else {
      bridge.weekdaysCount = bridge.potentialWeekdaysCount
      bridge.end = data.date
    }
  })
  data.lastHolidayDistance = 0
}

function bridgesHandleWeekday(data) {
  data.lastHolidayDistance += 1
  if (data.lastHolidayDistance > data.maxHolidaysDistance) {
    bridgesHandleCloseAll(data)
    return
  }
  for (let index = 0; index < data.potentialBridges.length; ++index) {
    const bridge = data.potentialBridges[index]
    bridge.potentialWeekdaysCount += 1
    if (bridge.potentialWeekdaysCount > data.maxAvailability) {
      bridgesHandleClose(data, bridge, index)
      index -= 1
    }
  }
}

function bridgesHandleIsBridge(bridge, data) {
  return bridge.end &&
    (bridge.weekdaysCount > 0 && bridge.holidaysCount > data.daysOff.length) &&
    (bridge.end !== bridge.start) &&
    (bridge.end > data.lastEndBridgeDate)
}

function bridgesHandleClose(data, bridge, index) {
  if (bridgesHandleIsBridge(bridge, data)) {
    bridge.daysCount = bridge.holidaysCount + bridge.weekdaysCount
    delete bridge.potentialWeekdaysCount
    data.result.push(bridge)
    data.lastEndBridgeDate = bridge.end
  }
  data.potentialBridges.splice(index, 1)
}

function bridgesHandleCloseAll(data) {
  for (let index = 0; index < data.potentialBridges.length; ++index) {
    const bridge = data.potentialBridges[index]
    bridgesHandleClose(data, bridge, index)
    index -= 1
  }
}

Kazzenger.prototype.bridges = function bridges({ start, end, maxHolidaysDistance, maxAvailability }) {
  const data = {
    daysOff: this.daysOff,
    maxHolidaysDistance,
    maxAvailability,
    result: [],
    lastHolidayDistance: 0,
    potentialBridges: [],
    lastEndBridgeDate: null,
    date: start,
  }
  const holidays = this.getHolidays(start, end).sort((a, b) => a.start - b.start)
  let offset = 0
  while (data.date <= end) {
    const { isHoliday, offset: nextOffset } = this.isHolidayOptimized(data.date, holidays, offset)
    offset = nextOffset
    if (isHoliday) {
      bridgesHandleHoliday(data)
    } else {
      bridgesHandleWeekday(data)
    }
    data.date = new Date(data.date.getTime() + MILLISECONDS_IN_A_DAY)
  }
  bridgesHandleCloseAll(data)
  return data.result
}
function bridgesByMonthsCreateKey(bridge) {
  const startMonth = bridge.start.getMonth()
  const endMonth = bridge.end.getMonth()
  if (startMonth === endMonth) {
    return `${startMonth}`
  }
  return `${startMonth},${endMonth}`
}

function bridgesByYearsCreateKey(bridge) {
  const startYear = bridge.start.getFullYear()
  const endYear = bridge.end.getFullYear()
  if (startYear === endYear) {
    return `${startYear}`
  }
  return `${startYear},${endYear}`
}

function bridgesByYearsKeyToArray(key) {
  return key.split(',').map(year => parseInt(year, 10))
}
Kazzenger.prototype.bridgesByMonth = function bridgesByMonth(input) {
  const mapByMonths = this.bridges(input)
    .reduce((acc, bridge) => {
      const key = bridgesByMonthsCreateKey(bridge)
      const bridges = acc[key] || []
      bridges.push(bridge)
      acc[key] = bridges
      return acc
    }, {})
  return Object.keys(mapByMonths)
    .sort()
    .reduce((acc, key) => {
      const bridges = mapByMonths[key]
      const stats = bridges
        .reduce((acc, bridge) => {
          acc.holidaysCount += bridge.holidaysCount
          acc.weekdaysCount += bridge.weekdaysCount
          acc.daysCount += bridge.daysCount
          return acc
        }, { holidaysCount: 0, weekdaysCount: 0, daysCount: 0 })
      acc.push({
        months: bridgesByYearsKeyToArray(key),
        bridges,
        ...stats,
      })
      return acc
    }, [])
}
Kazzenger.prototype.bridgesByYears = function bridgesByYears(input) {
  const mapByYears = this.bridges(input)
    .reduce((acc, bridge) => {
      const key = bridgesByYearsCreateKey(bridge)
      const bridges = acc[key] || []
      bridges.push(bridge)
      acc[key] = bridges
      return acc
    }, {})
  return Object.keys(mapByYears)
    .sort()
    .reduce((acc, key) => {
      const bridges = mapByYears[key]
      const stats = bridges
        .reduce((acc, bridge) => {
          acc.holidaysCount += bridge.holidaysCount
          acc.weekdaysCount += bridge.weekdaysCount
          acc.daysCount += bridge.daysCount
          return acc
        }, { holidaysCount: 0, weekdaysCount: 0, daysCount: 0 })
      acc.push({
        years: bridgesByYearsKeyToArray(key),
        bridges,
        ...stats,
      })
      return acc
    }, [])
}

Kazzenger.prototype.rateBridge = function rateBridge(bridge) {
  return (bridge.daysCount / (bridge.weekdaysCount || 1) * (bridge.daysCount / 30) * 100).toFixed(0)
}

export default Kazzenger
