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
  if (!lng || !lat) {
    return res.status(400)
      .json({ error: 'lng and lat are required' })
  }

  const coordinates = [parseFloat(lng), parseFloat(lat)]

  try {
    const routes = await fetchRoutesData()

    const routesWithMinDistance = routes.map(route => {
      const minDistance = Math.min(
        ...route.pointsOnRoutes.map(pointOnRoute => {
          const region = pointOnRoute.point.region
          const center = turf.center(region.geometry)
          return turf.distance(center.geometry.coordinates, coordinates)
        })
      )
      return { ...route, distance: minDistance }
    })

    routesWithMinDistance.sort((a, b) => a.distance - b.distance)

    const nearestRoutes = routesWithMinDistance.slice(0, count)

    res.json({ Routes: nearestRoutes })
  } catch (error) {
    console.error('Error fetching routes:', error)
    res.status(500)
      .json({ error: 'Failed to fetch routes' })
  }
}

module.exports = { findNearestRoutes }
