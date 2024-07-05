const axios = require('axios')

const baseURL = 'https://chat.codeasy.com/api/public'

const axiosInstance = axios.create({
  baseURL
})

module.exports = axiosInstance
