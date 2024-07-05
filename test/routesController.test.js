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
    // Example data for fetchRoutesData
    const exampleRoutesData = {
      Routes: [
        {
          id: 1031,
          createdAt: '2011-05-23T09:31:54.000Z',
          pointsOnRoutes: [
            {
              point: {
                id: 1164,
                createdAt: '2011-05-23T10:08:17.000Z',
                region: {
                  type: 'Feature',
                  geometry: {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [11.273542, 59.08423],
                        [11.273374, 59.085107],
                        [11.272876, 59.085951],
                        [11.272068, 59.086728],
                        [11.270979, 59.08741],
                        [11.269653, 59.087969],
                        [11.26814, 59.088385],
                        [11.266498, 59.088641],
                        [11.26479, 59.088727],
                        [11.263082, 59.088641],
                        [11.26144, 59.088385],
                        [11.259927, 59.087969],
                        [11.258601, 59.08741],
                        [11.257512, 59.086728],
                        [11.256704, 59.085951],
                        [11.256206, 59.085107],
                        [11.256038, 59.08423],
                        [11.256206, 59.083353],
                        [11.256705, 59.082509],
                        [11.257514, 59.081732],
                        [11.258602, 59.081051],
                        [11.259928, 59.080492],
                        [11.261441, 59.080076],
                        [11.263083, 59.07982],
                        [11.26479, 59.079734],
                        [11.266497, 59.07982],
                        [11.268139, 59.080076],
                        [11.269652, 59.080492],
                        [11.270978, 59.081051],
                        [11.272067, 59.081732],
                        [11.272875, 59.082509],
                        [11.273374, 59.083353],
                        [11.273542, 59.08423]
                      ]
                    ]
                  }
                },
                properties: {
                  center: [11.264790056739002, 59.084230456018844],
                  radius: 500
                }
              }
            }
          ]
        }
      ]
    }

    // Mock fetchRoutesData to return exampleRoutesData
    jest.spyOn(require('../src/services/dataService'), 'fetchRoutesData')
      .mockResolvedValue(exampleRoutesData)

    // Make request to the endpoint
    const response = await request(app)
      .get('/api/findNearestRoutes?lng=11.2648&lat=59.0842')

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
