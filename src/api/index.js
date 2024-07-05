const { API_URL } = require('./routes')
const axiosInstance = require('./axiosInstance')

const getPoints = async() => {
  const response = await axiosInstance.get(API_URL)
  return response.data
}

module.exports = { getPoints }
