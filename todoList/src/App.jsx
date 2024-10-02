import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import './App.css'; // Importing CSS styles
import { TodoProvider } from './context/todoContext'; // Importing TodoProvider for context
import TodoForm from './components/TodoForm'; // Importing TodoForm component for adding todos
import TodoItem from './components/TodoItem'; // Importing TodoItem component to display individual todo items

function App() {
  const [todos, setTodos] = useState([]); // State to hold the list of todos

  // Function to add a new todo
  const addTodo = (todo) => {
    const currentDateTime = new Date();
    setTodos((prev) => [...prev, { id: Date.now(), ...todo,dateAdded: currentDateTime.toLocaleDateString(), timeAdded: currentDateTime.toLocaleTimeString()}]); // Adds a new todo with a unique id
  };

  // Function to update an existing todo by its id
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? todo : prevTodo // Replaces the old todo with the updated one
      )
    );
  };

  // Function to delete a todo by its id
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id) // Filters out the todo with the matching id
    );
  };

  // Function to toggle the completion status of a todo by its id
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed } // Toggles the completed field
          : prevTodo
      )
    );
  };

  // useEffect hook to load todos from localStorage when the component first mounts
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')); // Retrieve todos from localStorage
    if (todos && todos.length > 0) {
      setTodos(todos); // Set todos state with the stored todos if available
    }
  }, []); // Empty dependency array means this runs only once on component mount

  // useEffect hook to store todos in localStorage whenever the todos array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Save todos in localStorage whenever todos state changes
  }, [todos]); // Runs when `todos` changes

  return (
    // Providing the todos and action functions through context to child components
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8"> {/* Background and padding styles */}
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white"> {/* Container with max width, shadows, and padding */}
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1> {/* Title */}
          <div className="mb-4">
            <TodoForm /> {/* Renders the form for adding todos */}
          </div>
          <div className="flex flex-wrap gap-y-3">
            
            {/* Loop through todos and render each TodoItem */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} /> {/* Rendering each todo item */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App; // Exporting the App component as default
