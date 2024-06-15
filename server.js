const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })
console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`)

const app = require('./app')

const Db = process.env.DATABASE.replace('<username>', process.env.DATABASE_USERNAME).replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(Db).then(() => {
    console.log('Database Connected ✅')
})

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})