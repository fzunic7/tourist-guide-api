/* eslint-disable no-undef */
const express = require('express')
const request = require('supertest')
const routesController = require('../src/controllers/routesController')
const exampleRoutesData = require('./mockData/exampleRoutesData')

describe('GET /findNearestRoutes', () => {
  let app

  beforeAll(() => {
    app = express()
    app.get('/api/findNearestRoutes', routesController.findNearestRoutes)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return nearest routes based on given coordinates', async() => {
    // Mock fetchRoutesData to return exampleRoutesData
    jest.spyOn(require('../src/services/dataService'), 'fetchRoutesData')
      .mockResolvedValue(exampleRoutesData)

    // Make request to the endpoint
    const response = await request(app)
      .get('/api/findNearestRoutes?lng=11.2648&lat=59.0842&count=5')

    // Assertions
    expect(response.status)
      .toBe(200)
    expect(response.body)
      .toHaveProperty('Routes')

    // Clean up the spy
    jest.restoreAllMocks()
  })

  it('should return 400 if lng or lat are missing', async() => {
    const response = await request(app)
      .get('/api/findNearestRoutes')

    expect(response.status)
      .toBe(400)
    expect(response.body)
      .toEqual({ error: 'lng and lat are required' })
  })
})
