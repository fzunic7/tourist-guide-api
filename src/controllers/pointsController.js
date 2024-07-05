const turf = require('@turf/turf')
const { fetchRoutesData } = require('../services/dataService')

/**
 * @api {get} /api/findPointsInViewport Find Points In Viewport
 * @apiName FindPointsInViewport
 * @apiGroup Points
 * @apiQuery {Number} lng1 Longitude of the first corner
 * @apiQuery {Number} lat1 Latitude of the first corner
 * @apiQuery {Number} lng2 Longitude of the opposite corner
 * @apiQuery {Number} lat2 Latitude of the opposite corner
 * @apiSuccess {Object[]} Points List of points within the viewport.
 */
const findPointsInViewport = async(req, res) => {
  const { lng1, lat1, lng2, lat2 } = req.query

  if (!lng1 || !lat1 || !lng2 || !lat2) {
    return res.status(400)
      .json({ error: 'lng1, lat1, lng2, and lat2 are required' })
  }

  const bbox = [parseFloat(lng1), parseFloat(lat1), parseFloat(lng2), parseFloat(lat2)]
  const viewport = turf.bboxPolygon(bbox)

  const routes = await fetchRoutesData()

  const pointsInViewport = []

  routes.forEach(route => {
    route.pointsOnRoutes.forEach(pointOnRoute => {
      const region = pointOnRoute.point.region
      if (turf.booleanIntersects(viewport, region.geometry)) {
        pointsInViewport.push(pointOnRoute.point)
      }
    })
  })

  res.json({ Points: pointsInViewport })
}

module.exports = { findPointsInViewport }
