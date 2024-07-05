/* eslint-disable no-undef */
const express = require('express')
const request = require('supertest')
const routesController = require('../src/controllers/routesController')

// Mock the fetchRoutesData function from dataService
jest.mock('../src/services/dataService', () => ({
  fetchRoutesData: jest.fn()
}))

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
    // Mock data for fetchRoutesData
    const exampleRoutesData = [
      {
        id: 1,
        pointsOnRoutes: [
          {
            point: {
              id: 101,
              region: {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [[0, 0], [1, 1], [1, 0], [0, 0]]
                  ]
                }
              }
            }
          }
        ]
      }
    ]

    // Mock fetchRoutesData to return exampleRoutesData
    jest.spyOn(require('../src/services/dataService'), 'fetchRoutesData')
      .mockResolvedValue(exampleRoutesData)

    // Make request to the endpoint
    const response = await request(app)
      .get('/api/findNearestRoutes?lng=0&lat=0')

    // Assertions
    expect(response.status)
      .toBe(200)
    expect(response.body)
      .toHaveProperty('Routes')
    expect(response.body.Routes)
      .toHaveLength(1) // Adjust based on exampleRoutesData

    // Add more assertions as needed
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
