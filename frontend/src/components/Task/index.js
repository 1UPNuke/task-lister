import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditButton from '../EditButton';

const Task = ({id})=>{
  const [task, setTask] = useState({})
  useEffect(async () => {
    const result = await axios('/tasks/'+id);
    setTask(result.data);
  }, []);
  return (
    <div className="task">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <EditButton/>
    </div>
  );
}

export default Task;
