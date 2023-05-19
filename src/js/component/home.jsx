
import React, { useEffect, useState } from "react";

const Home = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  const obtenerTareas = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/alerivera')
      .then((response) => response.json())
      .then((data) => setTask(data));
  };

  const actualizarTareas = (e) => {
    e.preventDefault();

    const generarId = () => {
      const random = Math.random().toString(36).substr(2);
      const fecha = Date.now().toString(36);
      return random + fecha;
    };

    const newTasks = [...task, { id: generarId(), label: newTask, done: false }];

    fetch('https://assets.breatheco.de/apis/fake/todos/user/alerivera', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTasks)
    })
      .then((response) => response.json())
      .then(() => {
        obtenerTareas(); // Actualizar las tareas después de la actualización
      });

      setNewTask('')
  };

  const borrarTarea = (id) => {
    const updatedTasks = task.filter((tarea) => tarea.id !== id);

    fetch('https://assets.breatheco.de/apis/fake/todos/user/alerivera', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTasks)
    })
      .then((response) => response.json())
      .then(() => {
        setTask(updatedTasks); // Actualizar las tareas en el estado local
      });
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div>

{task.length === 0 ? (
  <div className = "contenedor">
    <h1>Ya no tienes tareas</h1>
    <form   onSubmit={actualizarTareas}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          aria-label="Nueva tarea"
          aria-describedby="button-addon2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
    </form>
  </div>
) : (
  <div className = "contenedor">
    <h1>Todas mis Tareas</h1>
    <form  onSubmit={actualizarTareas}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          aria-label="Nueva tarea"
          aria-describedby="button-addon2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
    </form>
    {task.map((tarea) => (
      <div className="input-group mb-3" key={tarea.id}>
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          defaultValue={tarea.label}
        />
        <button
          className="btn btn-outline-secondary fondoboton"
          type="button"
          id="button-addon2"
          onClick={() => borrarTarea(tarea.id)}
        >
          X
        </button>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default Home;
