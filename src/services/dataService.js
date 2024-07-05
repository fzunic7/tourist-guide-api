const { getPoints } = require('../api')

const fetchRoutesData = async() => {
  try {
    return await getPoints()
  } catch (error) {
    console.error('Error fetching data from API:', error)
    return []
  }
}

module.exports = { fetchRoutesData }
