import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = ()=>{
  const [lists, setLists] = useState([])
  useEffect(async () => {
    const result = await axios('/lists');
    setLists(result.data);
  }, []);
  return (
    <div className="App">
      {lists.map((list)=><p>{JSON.stringify(list)}</p>)}
    </div>
  );
}

export default App;