const Button = (props) => {
  return (
    <button
      onClick={props.onAdd}
      className="btn"
      style={{ backgroundColor: props.color }}
    >
      {props.text}
    </button>
  );
};

export default Button;
