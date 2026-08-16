const mongoose = require('mongoose');
const Task = require('../models/Task');

const allowedFields = ['title', 'description', 'priority', 'dueDate', 'status'];
const idIsValid = (id) => mongoose.Types.ObjectId.isValid(id);

function cleanTask(payload, includeStatus = false) {
  const task = {};
  for (const field of allowedFields) if ((includeStatus || field !== 'status') && payload[field] !== undefined) task[field] = payload[field];
  if (task.dueDate === '') task.dueDate = null;
  return task;
}

async function getTasks(req, res, next) {
  try {
    const { search = '', status, priority, sort = 'created-desc' } = req.query;
    const query = { userId: req.user._id };
    if (status && ['pending', 'completed'].includes(status)) query.status = status;
    if (priority && ['low', 'medium', 'high'].includes(priority)) query.priority = priority;
    if (search.trim()) query.$or = [{ title: { $regex: search.trim(), $options: 'i' } }, { description: { $regex: search.trim(), $options: 'i' } }];
    const sorts = { 'created-desc': { createdAt: -1 }, 'created-asc': { createdAt: 1 }, 'due-asc': { dueDate: 1, createdAt: -1 }, 'due-desc': { dueDate: -1, createdAt: -1 } };
    const tasks = await Task.find(query).sort(sorts[sort] || sorts['created-desc']);
    if (sort === 'priority-desc') {
      const weights = { high: 3, medium: 2, low: 1 };
      tasks.sort((a, b) => weights[b.priority] - weights[a.priority] || b.createdAt - a.createdAt);
    }
    res.json({ tasks });
  } catch (error) { next(error); }
}
async function getTask(req, res, next) {
  try { if (!idIsValid(req.params.id)) return res.status(400).json({ message: 'Invalid task ID.' }); const task = await Task.findOne({ _id: req.params.id, userId: req.user._id }); if (!task) return res.status(404).json({ message: 'Task not found.' }); res.json({ task }); } catch (error) { next(error); }
}
async function createTask(req, res, next) {
  try { const data = cleanTask(req.body); if (!data.title?.trim()) return res.status(400).json({ message: 'A task title is required.' }); const task = await Task.create({ ...data, userId: req.user._id }); res.status(201).json({ task }); } catch (error) { next(error); }
}
async function updateTask(req, res, next) {
  try { if (!idIsValid(req.params.id)) return res.status(400).json({ message: 'Invalid task ID.' }); const data = cleanTask(req.body, true); if (data.title !== undefined && !data.title.trim()) return res.status(400).json({ message: 'A task title is required.' }); const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, data, { new: true, runValidators: true }); if (!task) return res.status(404).json({ message: 'Task not found.' }); res.json({ task }); } catch (error) { next(error); }
}
async function deleteTask(req, res, next) {
  try { if (!idIsValid(req.params.id)) return res.status(400).json({ message: 'Invalid task ID.' }); const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); if (!task) return res.status(404).json({ message: 'Task not found.' }); res.json({ message: 'Task deleted.' }); } catch (error) { next(error); }
}
async function updateStatus(req, res, next) {
  try { if (!idIsValid(req.params.id)) return res.status(400).json({ message: 'Invalid task ID.' }); const { status } = req.body; if (!['pending', 'completed'].includes(status)) return res.status(400).json({ message: 'Status must be pending or completed.' }); const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { status }, { new: true, runValidators: true }); if (!task) return res.status(404).json({ message: 'Task not found.' }); res.json({ task }); } catch (error) { next(error); }
}
module.exports = { getTasks, getTask, createTask, updateTask, deleteTask, updateStatus };
