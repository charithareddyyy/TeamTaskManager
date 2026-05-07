const express = require("express");
const router = express.Router();

const Task = require("../models/Task");


// GET ALL TASKS
router.get("/", async (req, res) => {
try {
const tasks = await Task.find().sort({ createdAt: -1 });

res.status(200).json(tasks);
} catch (error) {
res.status(500).json({
message: "Failed to fetch tasks",
});
}
});


// CREATE TASK
router.post("/", async (req, res) => {
try {

const { title, description, status } = req.body;

const newTask = new Task({
title,
description,
status,
});

await newTask.save();

res.status(201).json({
message: "Task Added Successfully",
task: newTask,
});

} catch (error) {

console.log(error);

res.status(500).json({
message: "Failed to add task",
});
}
});


// DELETE TASK
router.delete("/:id", async (req, res) => {
try {

await Task.findByIdAndDelete(req.params.id);

res.status(200).json({
message: "Task Deleted",
});

} catch (error) {

res.status(500).json({
message: "Delete Failed",
});
}
});


// UPDATE TASK
router.put("/:id", async (req, res) => {
try {

const updatedTask = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);

res.status(200).json(updatedTask);

} catch (error) {

res.status(500).json({
message: "Update Failed",
});
}
});

module.exports = router;