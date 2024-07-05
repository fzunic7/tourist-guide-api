const axios = require('axios')

const API_URL = 'https://chat.codeasy.com/api/public/job-application'

const fetchRoutesData = async() => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching data from API:', error)
    return []
  }
}

module.exports = { fetchRoutesData }
