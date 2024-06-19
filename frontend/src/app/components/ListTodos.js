'use client'
import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";

const ListTodos = () => {

  const [todos, setTodos] = useState([]);

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn>Description</TableColumn>
          <TableColumn></TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.todo_id}>
            <TableCell>{todo.description}</TableCell>
            <TableCell><EditTodo todo={todo}/></TableCell>
            <TableCell>
              <Button 
                type="submit" 
                color="danger"
                onClick={() => deleteTodo(todo.todo_id)}
                >Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
  </>
  );
};

export default ListTodos
