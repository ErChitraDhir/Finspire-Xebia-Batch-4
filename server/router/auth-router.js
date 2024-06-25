const express=require("express")
const router=express.Router();
// const {home,register}=require("../controllers/auth-controller")
// or
const authControllers=require("../controllers/auth-controller")
// router.get("/",(req,res)=>{
//     res.status(200).send("Welcome to world")
// })
// good way
// get to read data,Post to insert data in database,put or patch to update data ,deleteto delete data
// router.route("/").get(authControllers.home);
router.route("/register").post(authControllers.register);
module.exports=router;

