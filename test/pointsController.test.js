/* eslint-disable no-undef */
const express = require('express')
const request = require('supertest')
const pointsController = require('../src/controllers/pointsController')

describe('GET /findNearestPoints', () => {
  let app

  beforeAll(() => {
    app = express()
    app.get('/api/findNearestPoints', pointsController.findNearestPoints)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return nearest points based on given coordinates', async() => {
    // Mock data for findNearestPoints
    const examplePointsData = [
      {
        id: 1,
        name: 'Point A',
        location: {
          lng: 0,
          lat: 0
        }
      },
      {
        id: 2,
        name: 'Point B',
        location: {
          lng: 1,
          lat: 1
        }
      }
    ]

    // Mock findNearestPoints to return examplePointsData
    jest.spyOn(pointsController, 'findNearestPoints')
      .mockImplementation(async(req, res) => {
        res.status(200)
          .json(examplePointsData)
      })

    // Make request to the endpoint
    const response = await request(app)
      .get('/api/findNearestPoints?lng=0&lat=0')

    // Assertions
    expect(response.status)
      .toBe(200)
    expect(response.body)
      .toHaveLength(2) // Adjust based on examplePointsData length
    expect(response.body[0])
      .toHaveProperty('id', 1)
    expect(response.body[1])
      .toHaveProperty('id', 2)

    // Add more assertions as needed
  })

  it('should return 400 if lng or lat are missing', async() => {
    const response = await request(app)
      .get('/api/findNearestPoints')

    expect(response.status)
      .toBe(400)
    expect(response.body)
      .toEqual({ error: 'lng and lat are required' })
  })
})
