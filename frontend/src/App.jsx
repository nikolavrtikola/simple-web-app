import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const loadTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) {
      return;
    }

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text
      })
    });

    setText("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE"
    });

    loadTodos();
  };

  return (
    <div className="container">
      <h1>My Todo App=Promena Vezba Ucam Nov Den Novi predizvici!!!</h1>
      <h1>JaVol</h1>

      <div className="input-row">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter a todo"
        />

        <button onClick={addTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>

            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;