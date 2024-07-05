const { fetchRoutesData } = require('./routes')

const getPoints = async() => {
  return await fetchRoutesData()
}

module.exports = { getPoints }
