/* eslint-disable no-undef */
const express = require('express')
const request = require('supertest')
const pointsController = require('../src/controllers/pointsController')

describe('GET /findPointsInViewport', () => {
  let app

  beforeAll(() => {
    app = express()
    app.get('/api/findPointsInViewport', pointsController.findPointsInViewport)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return points within the viewport based on given coordinates', async() => {
    // Example data for findPointsInViewport
    const examplePointsData = {
      Points: [
        {
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
        },
        {
          id: 6795,
          createdAt: '2021-04-02T17:34:07.000Z',
          region: {
            id: '09ca9e982dd89017e61378e24a1147f6',
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [10.74211, 59.912687],
                  [10.742046, 59.912701],
                  [10.741973, 59.912717],
                  [10.741673, 59.912773],
                  [10.741892, 59.912997],
                  [10.742351, 59.912883],
                  [10.742159, 59.91275],
                  [10.74217, 59.912759],
                  [10.74211, 59.912687]
                ]
              ]
            },
            properties: {}
          }
        }
      ]
    }

    // Mock findPointsInViewport to return examplePointsData
    jest.spyOn(pointsController, 'findPointsInViewport')
      .mockImplementation(async(req, res) => {
        const { lng1, lat1, lng2, lat2 } = req.query
        if (!lng1 || !lat1 || !lng2 || !lat2) {
          return res.status(400)
            .json({ error: 'lng1, lat1, lng2, and lat2 are required' })
        }

        // Mocking points within the viewport based on given coordinates
        const pointsInViewport = examplePointsData.Points.filter(point => {
          const coords = point.region.geometry.coordinates[0]
          return coords.every(coord => {
            const [lng, lat] = coord
            return lng >= parseFloat(lng1) && lng <= parseFloat(lng2) &&
                   lat >= parseFloat(lat1) && lat <= parseFloat(lat2)
          })
        })

        res.status(200)
          .json(pointsInViewport)
      })

    // Make request to the endpoint
    const response = await request(app)
      .get('/api/findPointsInViewport?lng1=11.250&lat1=59.080&lng2=11.270&lat2=59.090')

    // Assertions
    expect(response.status)
      .toBe(200)
    expect(response.body)
      .toHaveLength(2) // Adjust based on examplePointsData length
    expect(response.body[0])
      .toHaveProperty('id', 1164)
    expect(response.body[1])
      .toHaveProperty('id', 6795)

    // Add more assertions as needed
  })

  it('should return 400 if lng1, lat1, lng2, or lat2 are missing', async() => {
    const response = await request(app)
      .get('/api/findPointsInViewport')

    expect(response.status)
      .toBe(400)
    expect(response.body)
      .toEqual({ error: 'lng1, lat1, lng2, and lat2 are required' })
  })
})
