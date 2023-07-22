import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import todoModel from "./models/todo.js"
import connectDb from "./config/db.js"
import cors from "cors"
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDb()
app.get("/api/items",async(req,res)=>{
	const data = await todoModel.find()
	res.send(JSON.stringify(data))
})
app.post("/api/item",async(req,res)=>{
	if(req.body.item != ""){
		const newTodo = new todoModel({
			item:req.body.item
		})
		await newTodo.save()
		res.send(newTodo)
	}else{
		res.send({message:"enter a valid todo"})
	}
})
app.delete("/api/item/:id",async (req,res)=>{
	await todoModel.deleteOne({_id:req.params.id})
	res.sendStatus(200)
})
app.put("/api/item/:id",async(req,res)=>{
	const updated = await todoModel.findOneAndUpdate({_id:req.params.id},{item:req.body.item})
	res.status(200).json(updated)
})
const port = process.env.PORT || 5500
app.listen(port,()=>{
	console.log("server started running")
})