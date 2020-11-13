import './index.css';
import Task from '../Task';

const List = ({title, description, color, taskIds})=>{
  return (
    <div className="list" style={{borderColor: color}}>
      <h2 className="list-title">{title}</h2>
      <p className="list-description">{description}</p>
      <div className="list-tasks">
        {taskIds.map(id=><Task id={id}/>)}
      </div>
    </div>
  );
}

export default List;
