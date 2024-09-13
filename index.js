import express from "express"
import dotenv from "dotenv"
import connectToDb from "./db/db.js"
import taskRoutes from "./routes/task.js"
import cors from "cors"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors());

app.use("/api", taskRoutes)

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
    connectToDb()
})