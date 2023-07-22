import mongoose from "mongoose"

export default function connectDb(){
	mongoose.connect(process.env.DB_URL,{
		useNewUrlParser:true,
		useUnifiedTopology:true
	})
	const db = mongoose.connection
	db.on("error",(e)=>{
		console.error(e)
	})
	db.once("open",()=>{
		console.log("database connected successfully ")
	})
}