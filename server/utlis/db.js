const mongoose=require("mongoose")
const URI=process.env.MONGO_URI
const connectDb=async()=>{
    try {
        await mongoose.connect(URI)
        console.log("DB connected succcesfully")
    } catch (error) {
        console.error("DB connection failed");
        process.exit(0)
    }
}
module.exports=connectDb;
