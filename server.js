import express from 'express';

import { todos } from './Data/data.js';

const server = express();
const port = 3000;

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello Express!');
});

//TODO HER
server.get('/todos', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(todos));
});

server.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

server.get('/todos/:id', (req, res) => {
  console.log(req.params);
  res.send(req.params.todos);
});

server.put('/todos', (req, res) => {
  res.send('PUT todos');
});

server.patch('/todos', (req, res) => {
  res.send('PATCH todos');
});

server.delete('/todos', (req, res) => {
  res.send('DELETE todos');
});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});