# Tourist Guide API

The Tourist Guide API is a RESTful API built with Node.js and Express, designed to provide information about tourist routes and points of interest.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

---

## Installation

To install and run the Tourist Guide API locally, follow these steps:

1. **Clone the repository:**

  ```bash
   git clone https://github.com/fzunic7/tourist-guide-api
   cd tourist-guide-api
  ```

2. **Install dependencies:**

  ```bash
    npm install
  ```

3. **Start the server:**

  ```bash
    npm start
  ```

The API server will start running at <http://localhost:3000>.

## Usage

Once the server is running, you can interact with the API using tools like Postman or by making HTTP requests directly.

## Testing

The Tourist Guide API uses Jest and supertest for testing. To run the tests, use the following command:

  ```bash
    npm test
  ```

This command will execute the test cases defined in the **test** directory and provide feedback on their success or failure.

## API Endpoints

### `GET /api/findNearestRoutes`

- **Description:** Retrieves the nearest routes based on given coordinates.
- **Query Parameters:**
  - `lng`: Longitude coordinate.
  - `lat`: Latitude coordinate.
  - `count`: Number of routes to return
- **Responses:**
  - `200 OK`: Returns an array of nearest routes.
  - `400 Bad Request`: Indicates that `lng` or `lat` query parameters are missing.
- **API Documentation:** [View API Documentation](http://localhost:3000/apidoc/#api-Routes-FindNearestRoutes)

### `GET /api/findPointsInViewport`

- **Description:** Retrieves the nearest points of interest based on given coordinates.
- **Query Parameters:**
  - `lng1`: Longitude of the first corner.
  - `lat1`: Latitude of the first corner
  - `lng2`: Longitude of the opposite corner
  - `lat2`: Latitude of the opposite corner
- **Responses:**
  - `200 OK`: Returns an array of nearest points.
  - `400 Bad Request`: Indicates that `lng` or `lat` query parameters are missing.
- **API Documentation:** [View API Documentation](http://localhost:3000/apidoc/#api-Points-FindPointsInViewport)

## Dependencies

The Tourist Guide API uses the following main dependencies:

- Express: Fast, unopinionated, minimalist web framework for Node.js.
- @turf/turf: Advanced geospatial analysis for browsers and Node.js.
- Jest: JavaScript testing framework.
- supertest: HTTP assertion library, used for testing HTTP requests.
