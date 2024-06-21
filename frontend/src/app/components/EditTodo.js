"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import axios from "axios";

const EditTodo = ({ todo }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [description, setDescription] = useState(todo.description);

  //edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.put(
        `http://localhost:5000/todos/${todo.todo_id}`,
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Button
        type="submit"
        color="warning"
        onPress={onOpen}
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Todo
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  type="text"
                  variant=""
                  placeholder="Enter a new task description"
                  className="border rounded"
                  Value={description}
                  onClear={() => console.log("input cleared")}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="warning"
                  onPress={onClose}
                  onClick={(e) => updateDescription(e)}
                >
                  Edit
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTodo;
