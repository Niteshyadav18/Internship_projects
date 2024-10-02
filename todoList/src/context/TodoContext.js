import { createContext, useContext } from "react";

// Creating the context with default values
export const TodoContext = createContext({
  // Default todos array with a sample todo item
  todos: [
    {
      id: 1,
      todo: "DSA", // Task description
      completed: false, // Completion status
    },
  ],
  // Placeholder functions to manage todos
  addTodo: (todo) => {}, // Function to add a new todo
  updateTodo: (id, todo) => {}, // Function to update an existing todo
  deleteTodo: (id) => {}, // Function to delete a todo
  toggleComplete: (id) => {}, // Function to toggle the completion status of a todo
});

// Custom hook to use the TodoContext more easily
export const useTodo = () => {
  return useContext(TodoContext); // This hook provides access to the context values
};

// Exporting the context provider to wrap the components that need access to the todos
export const TodoProvider = TodoContext.Provider;
