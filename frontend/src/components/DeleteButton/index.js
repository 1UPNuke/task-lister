import './index.css';

const DeleteButton = ({text, onClick, className})=>{
  return (
    <button onClick={onClick} className={"delete-button "+className}>X</button>
  );
}

export default DeleteButton;
