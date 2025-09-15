import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const jobObj = {
        title,
        description,
      };
      console.log(jobObj);
      Axios.post(``, jobObj).then(() => {
        alert("posted");
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex space-y-3 flex-col m-10">
        <h2 className="font-medium text-lg">Add Job</h2>
        <input
          name="title"
          placeholder="Job Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <button
          type="submit"
          className="w-fit p-2 rounded-md bg-red-600 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
