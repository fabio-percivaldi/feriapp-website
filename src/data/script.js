'use script'

const cityAndRegion = require('./it-cities')
const holidays = require('./it-cities-holidays')

function searchCity(city) {
  return cityAndRegion.find(value => (value.city.toLowerCase().includes(city.toLowerCase())))
}

holidays.forEach(holiday => {
  const city = searchCity(holiday.city)
  if (city) {
    holiday.region = city.region
    holiday.province = city.province
  }
})

