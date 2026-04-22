import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  
  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");

  // Uses environment variable for deployment, defaults to localhost for development
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080";

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) { 
      console.error("Fetch failed:", err); 
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [userId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    const newTask = { 
      taskName, 
      description, 
      userId: Number(userId), 
      completed: false, 
      dateTime: new Date().toLocaleString() 
    };

    const res = await fetch(`${API_BASE}/api/tasks/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });

    if (res.ok) {
      setTaskName(''); 
      setDescription('');
      fetchTasks();
    }
  };

  const toggleDone = async (id) => {
    await fetch(`${API_BASE}/api/tasks/update/${id}`, { method: "PUT" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_BASE}/api/tasks/delete/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-white" style={{ backgroundImage: "url('/image_1.png')" }}>
      <div className="min-h-screen bg-black/60 backdrop-blur-sm p-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-400">TODOS</h1>
            <p className="text-blue-300">Welcome back, <span className="text-white">{userName}</span></p>
          </div>
          <button onClick={() => { localStorage.clear(); navigate('/'); }} className="bg-red-500/20 border border-red-500/50 px-6 py-2 rounded-xl">Logout</button>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Task Form */}
          <div className="glass p-8 rounded-3xl h-fit border border-white/20 bg-white/5">
            <h2 className="text-2xl font-bold mb-6 text-blue-200">New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white" required />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-4 rounded-xl bg-white/10 border border-white/10 h-32 text-white" />
              <button className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Add Task</button>
            </form>
          </div>

          {/* Task List Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold opacity-80 mb-4">Your Schedule</h2>
            {tasks.map(task => (
              <div key={task.id} className={`glass p-6 rounded-2xl flex justify-between items-center border transition-all ${task.completed ? 'border-green-500/50 bg-green-500/10' : 'border-white/10'}`}>
                <div className={`space-y-1 transition-all ${task.completed ? 'opacity-40' : 'opacity-100'}`}>
                  <h3 className={`text-xl font-bold ${task.completed ? 'line-through text-gray-500' : 'text-blue-100'}`}>{task.taskName}</h3>
                  <p className={`text-gray-300 text-sm ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
                  <span className="text-[10px] opacity-40 uppercase tracking-widest">{task.dateTime}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => toggleDone(task.id)} className={`px-4 py-2 rounded-xl font-bold text-xs border transition-all ${task.completed ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-green-600/20 text-green-400 border-green-500/40'}`}>
                    {task.completed ? 'Undo' : 'Done'}
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="px-4 py-2 rounded-xl font-bold text-xs bg-red-600/20 text-red-400 border border-red-500/40 hover:bg-red-600 hover:text-white transition-all">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;