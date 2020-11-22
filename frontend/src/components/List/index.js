import './index.css';
import Task from '../Task';
import EditButton from '../EditButton';
import {useState} from 'react';
import axios from 'axios';
import DeleteButton from '../DeleteButton';

const List = ({_id, title, description, color, taskIds, setLists})=>{
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  return (
    <div className="list" style={{borderColor: color}}>
      <div className="list-text-div">
        {!editTitle?
          <h2 className="list-title">{title} <EditButton onClick={()=>setEditTitle(true)}/></h2>
        :
          <form onSubmit={
            async e=>{
              e.preventDefault();
              let data = {
                title: e.target["list-title"].value
              }
              await axios.put('/lists/'+_id, data);
              setEditTitle(false);
              setLists((await axios.get('/lists')).data);
            }
          }>
            <input className="list-title" name="list-title" defaultValue={title}/>
            <input type="submit" style={{position:"fixed",left:"-9999px",opacity:"0%"}} value="allows enter to submit"/>
          </form>
        }
        {!editDesc?
          <p className="list-description">{description} <EditButton onClick={()=>setEditDesc(true)}/></p>
        :
          <form onSubmit={
            async e=>{
              e.preventDefault();
              let data = {
                description: e.target["list-description"].value
              }
              await axios.put('/lists/'+_id, data);
              setEditDesc(false);
              setLists((await axios.get('/lists')).data);
            }
          }>
            <input className="list-description" name="list-description" defaultValue={description}/>
            <input type="submit" style={{position:"fixed",left:"-9999px",opacity:"0%"}} value="allows enter to submit"/>
          </form>
        }
        <div className="list-tasks">
          {taskIds.map(id=><Task _id={id} list={{_id:_id, taskIds:taskIds}}/>)}
        </div>
      </div>
      <button className="add-task" onClick={async e=>{
        let data = {
          taskIds: taskIds
        }
        data.taskIds.push(
          (
            await axios.post('/tasks', {title:"Task", description:"Description"})
          ).data._id
        );
        await axios.put('/lists/'+_id, data);
        setLists((await axios.get('/lists')).data);
      }}>+</button>
      <DeleteButton onClick={async e=>
        {
          let del=window.confirm('Are you sure you want to delete list: "'+title+'"?')
          if(del)
          {
            await axios.delete('/lists/'+_id);
            setLists((await axios.get('/lists')).data);
          }
        }
      }/>
    </div>
  );
}

export default List;
