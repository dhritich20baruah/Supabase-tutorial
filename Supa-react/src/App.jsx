import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabase-client";

function App() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching task:", error.message);
      return;
    }

    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(newTask).single();

    if (error) {
      console.error("Error adding task:", error.message);
      return;
    }

    setNewTask({ title: "", description: "" });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting tasks: ", error.message);
      return;
    }

    fetchTasks();
  };

  const updateTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("Error editing tasks: ", error.message);
      return;
    }

    fetchTasks();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            Add New Task
          </h2>

          <div className="mb-2">
            <label className="block text-gray-600 mb-2" htmlFor="title">
              Job Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="Enter job title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="max-w-2xl mx-auto mt-2 p-4 bg-white rounded-lg shadow-md mb-5">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Tasks List
        </h1>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {task.title}
                </h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-cyan-700 rounded-md transition-colors duration-200 cursor-pointer">
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
