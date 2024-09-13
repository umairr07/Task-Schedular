import express from "express"
import { createTask, getAllTasks } from "../controller/task.js"

const router = express.Router()

router.post("/task", createTask)
router.get("/alltasks", getAllTasks)

export default router;