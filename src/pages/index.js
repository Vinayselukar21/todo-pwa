import Head from "next/head";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import InstallButton from "../components/InstallButton";

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  


  useEffect(() => {
    // Load todos from cache or fetch them from the server
    const cachedTodos = localStorage.getItem("todos");
    if (cachedTodos) {
      setTodos(JSON.parse(cachedTodos));
    } else {
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    // Save todos to cache whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    setTodos((prevTodos) => [...prevTodos, data]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  return (
    <>
     <Head>
      <title>Todo App</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="theme-color" content="#E53012"/>
      </Head>

      <main>
        <div className="container">
          <Head>
            <title>Todo App</title>
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <div>
            <button
              onClick={() => {
                router.push("/access-camera");
              }}
            >
              Click on me to access camera
            </button>
          </div>
          <InstallButton />
          <div>
            <h1>Todo App</h1>

            <form onSubmit={addTodo}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new todo"
              />
              <button type="submit">Add Todo</button>
            </form>

            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <div className="card">
                    <span>{todo.title}</span>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <style jsx>{`
            .container {
              max-width: 500px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f2f2f2;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            h1 {
              text-align: center;
              color: #333;
              margin-bottom: 20px;
            }

            form {
              display: flex;
              margin-bottom: 20px;
            }

            input[type="text"] {
              flex: 1;
              padding: 8px;
              border-radius: 4px;
              border: 1px solid #ccc;
              outline: none;
              font-size: 16px;
            }

            button {
              padding: 8px 16px;
              background-color: #333;
              color: #fff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              transition: background-color 0.3s ease;
            }

            button:hover {
              background-color: #555;
            }

            ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }

            li {
              display: flex;
              align-items: center;
              padding: 8px 0;
              width: 100%;
            }

            .card {
              display: flex;
              align-items: center;
              padding: 12px;
              background-color: #fff;
              border-radius: 4px;
              width: 100%;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .card span {
              flex: 1;
              color: #333;
              font-size: 16px;
            }

            .card button {
              background-color: #ff5555;
              color: #fff;
              border: none;
              border-radius: 4px;
              padding: 8px 16px;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }

            .card button:hover {
              background-color: #ff3333;
            }
          `}</style>
        </div>
      </main>
    </>
  );
}
