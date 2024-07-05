const { getPoints } = require('../api')

const fetchRoutesData = async() => {
  try {
    const points = await getPoints()
    return points
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

module.exports = { fetchRoutesData }
