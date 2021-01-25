import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = (props) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{props.title}</h1>
      {location.pathname === "/" ? (
        <Button
          color={props.showAdd ? "red" : "green"}
          text={props.showAdd ? "Close" : "Add"}
          onAdd={props.onAdd}
        />
      ) : (
        ""
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
