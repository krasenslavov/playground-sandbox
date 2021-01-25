// import PropTypes from "prop-types";
import Task from "./Task";

const Tasks = (props) => {
  return (
    <>
      {props.tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={props.onDelete}
          onToggle={props.onToggle}
        />
      ))}
    </>
  );
};

// Tasks.propTypes = {};

export default Tasks;
