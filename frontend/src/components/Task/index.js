import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';

const Task = ({_id, list})=>{
  const [task, setTask] = useState({title:"", description:""})
  const [edit, setEdit] = useState(false);
  const [delState, setDelete] = useState(false);
  useEffect(async () => {
    let result = '';
    try{
      result = await axios('/tasks/'+_id);
    }
    catch{}
    if(result)
    {
      setTask(result.data);
    }
    else
    {
      let data = {
        taskIds: list.taskIds.filter(id=>id!=_id)
      }
      await axios.put('/lists/'+list._id, data);
      setDelete(true);
    }
  }, []);
  const delClick=async e=> {
    let del=window.confirm('Are you sure you want to delete task: "'+task.title+'"?')
    if(del)
    {
      await axios.delete('/tasks/'+_id);
      setDelete(true);
    }
  }
  return delState?
    null
  :(
    <>
      {!edit?
        <div className="task">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <EditButton onClick={()=>setEdit(true)}/>
          <DeleteButton onClick={delClick}/>
        </div>
      :
        <form className="task" onSubmit={
          async e=>{
            e.preventDefault();
            let data = {
              title: e.target["task-title"].value,
              description: e.target["task-description"].value
            }
            await axios.put('/tasks/'+_id, data);
            setEdit(false);
            setTask((await axios('/tasks/'+_id)).data)
          }
        }>
          <input className="task-title" name="task-title" defaultValue={task.title}/>
          <input className="task-description" name="task-description" defaultValue={task.description}/>
          <input type="submit" style={{position:"fixed",left:"-9999px",opacity:"0%"}} value="allows enter to submit"/>
          <EditButton onClick={()=>setEdit(true)}/>
          <DeleteButton onClick={delClick}/>
        </form>
      }
    </>
  );
}

export default Task;
