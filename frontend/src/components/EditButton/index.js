import './index.css';
import {ReactComponent as EditIcon} from '../../icons/edit.svg'

const EditButton = ({text, onClick, className})=>{
  return (
    <button onClick={onClick} className={"edit-button "+className}><EditIcon/></button>
  );
}

export default EditButton;
