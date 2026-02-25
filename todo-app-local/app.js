const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Kết nối MongoDB local
mongoose.connect('mongodb://localhost:27017/todo-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const TodoSchema = new mongoose.Schema({ task: String });
const Todo = mongoose.model('Todo', TodoSchema);

// Trang chủ
app.get('/', (req, res) => {
  res.send('Todo App v6 - Khoa DevOps Intern 2026 - Test CI/CD thành công!');
});

// Lấy tất cả todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Thêm todo mới
app.post('/todos', async (req, res) => {
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.json(todo);
});

app.listen(port, () => {
  console.log(`Todo App running on http://localhost:${port}`);
});
