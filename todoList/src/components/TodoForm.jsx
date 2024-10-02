import { useState } from "react";
import { useTodo } from "../context/todoContext";

function TodoForm() {
  // Local state to hold the value of the new todo
  const [todo, setTodo] = useState("");

  // Accessing the addTodo function from the TodoContext using the custom useTodo hook
  const { addTodo } = useTodo();

  // Function to handle the form submission
  const add = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (!todo) return; // If the todo input is empty, do nothing
    addTodo({ todo, completed: false }); // Adds the new todo with the default 'completed' status as false
    setTodo(""); // Resets the input field after adding the todo
  };

  return (
    // Form to handle the addition of a new todo item
    <form onSubmit={add} className="flex">
      {/* Input field for the todo */}
      <input
        type="text"
        placeholder="Write Todo..." // Placeholder text
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo} // Binds the input field to the state
        onChange={(e) => setTodo(e.target.value)} // Updates the state when the input value changes
      />
      
      {/* Button to submit the form and add the todo */}
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
