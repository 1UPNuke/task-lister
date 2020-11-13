import './index.css';

const CircleButton = ({text, onClick, className})=>{
  return (
    <button onClick={onClick} className={"circle-button "+className}>{text}</button>
  );
}

export default CircleButton;
