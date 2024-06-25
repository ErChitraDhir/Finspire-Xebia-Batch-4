require("dotenv").config();
const express=require("express")
const app=express()
const cors=require("cors")
const router=require("./router/customerRoutes")
const connectDb=require("../server/utlis/db")
const PORT = process.env.PORT || 3003;
app.use(cors());
app.use(express.json()) 
app.use("/api/auth",router);
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`)
    })
}) 