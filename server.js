//importing libraries
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

//importing routes
import authRoute from './routes/auth.js'
import profileRoute from './routes/user.js'

const app = express()

dotenv.config()

app.use(morgan('tiny'))
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user/auth', authRoute)
app.use('/user/profile', profileRoute)

const PORT = process.env.PORT
const mongodb_uri = process.env.MONGODB_URI

//mongodb connection
mongoose.connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB connected successfully")
})

mongoose.connection.on('error', err => {
    console.error("err ", err)
    console.error(`DB connection error: ${err.message}`);
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})





