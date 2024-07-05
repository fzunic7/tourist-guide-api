const express = require('express')
const { findNearestRoutes } = require('./controllers/routesController')
const { findPointsInViewport } = require('./controllers/pointsController')

const router = express.Router()

router.get('/findNearestRoutes', findNearestRoutes)
router.get('/findPointsInViewport', findPointsInViewport)

module.exports = router
