import './Box.css';

const Box = ({ icon, text }) => {
  return (
    <div className="box">
      <div className="icon">{icon}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default Box;
