"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description };

      const response = await axios.post("http://localhost:5000/todos", body, {
        headers: { "Content-Type": "application/json" },
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="flex items-center my-5 gap-0" onSubmit={onSubmitForm}>
        <Input
          isClearable
          type="text"
          variant=""
          placeholder="Enter a new task"
          Value={description}
          onClear={() => console.log("input cleared")}
          className="border rounded-l-lg"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="submit"
          color="success"
          className="rounded-none rounded-r-lg"
        >
          Add
        </Button>
      </form>
    </>
  );
};

export default InputTodo;
