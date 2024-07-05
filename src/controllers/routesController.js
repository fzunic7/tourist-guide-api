const turf = require('@turf/turf')
const { fetchRoutesData } = require('../services/dataService')

/**
 * @api {get} /api/findNearestRoutes Find Nearest Routes
 * @apiName FindNearestRoutes
 * @apiGroup Routes
 * @apiQuery {Number} lng Longitude
 * @apiQuery {Number} lat Latitude
 * @apiQuery {Number} [count=10] Number of routes to return
 * @apiSuccess {Object[]} Routes List of nearest routes.
 */
const findNearestRoutes = async(req, res) => {
  const { lng, lat, count = 10 } = req.query
  const coordinates = [parseFloat(lng), parseFloat(lat)]

  if (!lng || !lat) {
    return res.status(400)
      .json({ error: 'lng and lat are required' })
  }

  const routes = await fetchRoutesData()

  const routesWithDistance = routes.flatMap(route => {
    const distances = route.pointsOnRoutes.map(pointOnRoute => {
      const region = pointOnRoute.point.region
      const center = turf.center(region.geometry)
      const distance = turf.distance(center.geometry.coordinates, coordinates)
      return { ...pointOnRoute, distance }
    })

    const minDistance = Math.min(...distances.map(d => d.distance))
    return distances.map(point => ({ ...route, ...point, distance: minDistance }))
  })

  routesWithDistance.sort((a, b) => a.distance - b.distance)

  const nearestRoutes = routesWithDistance.slice(0, count)

  res.json({ Routes: nearestRoutes })
}

module.exports = { findNearestRoutes }
