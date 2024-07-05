const express = require('express')
const path = require('path')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', routes)

// Serve API documentation
app.use('/apidoc', express.static(path.join(__dirname, '../apidoc')))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app