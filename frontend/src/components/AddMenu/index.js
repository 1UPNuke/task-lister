import './index.css';
import CircleButton from '../CircleButton';

const AddMenu = ({title, description, color, taskIds})=>{
  return (
    <>
      <div className="add-bg hidden">
        <div className="add-menu">

        </div>
      </div>
      <CircleButton className="add-button" text="+"/>
    </>
  );
}

export default AddMenu;
