const express = require('express')
const cors = require('cors')
const dataRouter = require('./routes/data.routes')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', dataRouter)

app.use(express.static('static'))

app.listen(PORT, () => console.log(`port start ${PORT}`))
