import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'


// app config
const app = express()
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

// DB Connection
connectDB();


// api endpoints
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
