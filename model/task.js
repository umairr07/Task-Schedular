import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    task: String,
    email: String,
    schedule: String,
    createdAt: { type: Date, default: Date.now },
})

const taskModel = mongoose.model("Task", taskSchema)
export default taskModel;