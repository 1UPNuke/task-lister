import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import List from '../../components/List';
import AddMenu from '../../components/AddMenu';

const App = ()=>{
  const [lists, setLists] = useState([])
  useEffect(async () => {
    const result = await axios('/lists');
    setLists(result.data);
  }, []);
  return (
    <div className="App">
      {lists.map((list)=><List title={list.title} description={list.description} color={list.color} taskIds={list.taskIds}/>)}
      <AddMenu setLists={setLists}/>
    </div>
  );
}

export default App;