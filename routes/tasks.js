const express = require('express');
const Task = require('../models/Task');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
  const tasks = await Task.find({ userId: req.session.userId });
  res.render('tasks', { tasks });
});

router.post('/add', isAuthenticated, async (req, res) => {
  await Task.create({ userId: req.session.userId, content: req.body.content, completed: false });
  res.redirect('/tasks');
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id });
  res.redirect('/tasks');
});

router.post('/toggle/:id', isAuthenticated, async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.redirect('/tasks');
});

module.exports = router;

