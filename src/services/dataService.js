const axiosInstance = require('../../api/axiosInstance')

const API_URL = '/job-application'

const fetchRoutesData = async() => {
  try {
    const response = await axiosInstance.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching data from API:', error)
    return []
  }
}

module.exports = { fetchRoutesData }
