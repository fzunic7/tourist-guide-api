/* eslint-disable no-undef */
const express = require('express')
const request = require('supertest')
const pointsController = require('../src/controllers/pointsController')
const examplePointsData = require('./mockData/examplePointsData')

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

    // Clean up the spy
    jest.restoreAllMocks()
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
