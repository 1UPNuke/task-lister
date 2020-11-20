import './index.css';
import Task from '../Task';
import EditButton from '../EditButton';
import {useState} from 'react';
import axios from 'axios';
import App from '../../pages/App';

const List = ({_id, title, description, color, taskIds, setLists})=>{
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  return (
    <div className="list" style={{borderColor: color}}>
      {!editTitle?
        <h2 className="list-title">{title} <EditButton onClick={()=>setEditTitle(true)}/></h2>
      :
        <form onSubmit={
          async (e)=>{
            e.preventDefault();
            let data = {
              title: e.nativeEvent.originalTarget["list-title"].value
            }
            await axios.put('/lists/'+_id, JSON.stringify(data), {
              headers: {
                'Content-Type': 'application/json'
              }
            });
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
          async (e)=>{
            e.preventDefault();
            let data = {
              description: e.nativeEvent.originalTarget["list-description"].value
            }
            await axios.put('/lists/'+_id, JSON.stringify(data), {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            setEditDesc(false);
            setLists((await axios.get('/lists')).data);
          }
        }>
          <input className="list-description" name="list-description" defaultValue={description}/>
          <input type="submit" style={{position:"fixed",left:"-9999px",opacity:"0%"}} value="allows enter to submit"/>
        </form>
      }
      <div className="list-tasks">
        {taskIds.map(id=><Task id={id}/>)}
      </div>
    </div>
  );
}

export default List;
