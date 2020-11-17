import './index.css';
import CircleButton from '../CircleButton';
import {useState} from 'react';
import axios from 'axios';
import App from '../../pages/App';

const AddMenu = ({setLists})=>{
  const [open, setOpen] = useState(false);
  return (
    <>
      {open?
        <div className="add-bg" onClick={()=>setOpen(false)}>
          <div className="add-menu" onClick={e=>e.stopPropagation()}>
            <form id="add-form" onSubmit={
              async (e)=>{
                e.preventDefault();
                let form = document.getElementById("add-form");
                let data = {
                  title: form.title.value,
                  description: form.description.value,
                  color: form.color.value,
                }
                console.log(data)
                await axios.post('/lists', JSON.stringify(data), {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                setOpen(false);
                setLists((await axios.get('/lists')).data);
              }
            }>
              <h1>Add a list</h1>
              <label for="add-title">Title: </label><br/>
                <input name="title" id="add-title" defaultValue="List"/><br/>
              <label for="add-description">Description: </label><br/>
                <textarea name="description" id="add-description" defaultValue="Description"/><br/>
              <label for="add-color">Color: </label><br/>
                <input name="color" id="add-color" type="color" defaultValue="#ff0000"/><br/>
              <input type="submit" value="Add list"/>
              <input type="button" value="Cancel" onClick={()=>{setOpen(false);return false;}}/>
            </form>
          </div>
        </div>
      :<CircleButton className="add-button" onClick={()=>setOpen(true)} text="+"/>
      }
    </>
  );
}

export default AddMenu;
