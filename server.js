import express from 'express';
import cors from 'cors';

import { todos } from './Data/data.js';
//test
const server = express();
const port = 3000;

server.use(cors());
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
  const todoId = Number(req.params.id);
  const todo = todos.find(t => t.id === todoId);
  if(!todo){
    return res.status(404).json({
      message: "ToDo not found"
    });
  }
  res.json(todo);
});

server.put('/todos', (req, res) => {
  res.send('PUT todos');
});

server.put('/todos/:id', (req, res) => {
  const toDoId = Number(req.params.id);
  const todo = todos.find(todo => todo.id === toDoId);

  if(!todo){
    return res.status(404).json({
      message: "ToDo not found"
    });
  }
  Object.assign(todo, req.body);
  res.json(todo);

});

server.patch('/todos', (req, res) => {
  res.send('PATCH todos');
});

server.delete('/todos/:id', (req, res) => {
  const toDoId = Number(req.params.id);
  const todo = todos.find(todo => todo.id === toDoId);

  if(!todo){
    return res.status(404).json({
      message: "ToDo not found"
    });
  }
  const index = todos.indexOf(todo);
  todos.splice(index, 1);

  res.status(204).send("ToDo deleted successfully");
});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});