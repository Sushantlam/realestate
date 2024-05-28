import express from  "express"
import testRoute from  "./routes/test.route.js"
import authRoute from  "./routes/auth.route.js"
import userRoute from  "./routes/user.route.js"
import cookieParser from  "cookie-parser"

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/test", testRoute)
app.use("/api/user", userRoute)

app.listen(4000,()=>{
    console.log("express");
})