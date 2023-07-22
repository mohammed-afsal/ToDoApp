import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
	item:{
		type:String,
		required:true
	}
})
const todoModel =new  mongoose.model("todo",todoSchema)
export default todoModel