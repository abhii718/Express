// The code imports express, cors, and cookie-parser modules and creates an instance of the express application.
// The code sets up middleware to handle CORS, JSON, URL-encoded data, and static files.
// The userRouter is imported from the user.routes.js module and attached to the /api/v1/users/ route using the app.use() method.
// The code exports the app object for further use.

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users/", userRouter)

// http://localhost:8000/api/v1/users/register
export { app };
