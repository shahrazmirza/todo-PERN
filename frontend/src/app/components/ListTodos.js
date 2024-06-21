"use client";
import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import axios from "axios";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await axios.delete(
        `http://localhost:5000/todos/${id}`
      );

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
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
              <TableCell>
                <EditTodo todo={todo} />
              </TableCell>
              <TableCell>
                <Button
                  type="submit"
                  color="danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ListTodos;
