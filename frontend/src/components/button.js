import { useNavigate } from "react-router-dom";
import classes from "./button.module.css";

function Button(prop) {
  const navigate = useNavigate();
  const clickButton = () => {
    navigate(prop.page);
  };
  return (
    <div>
      <button className={classes.button} onClick={clickButton}>
        {prop.text}
      </button>
    </div>
  );
}

export default Button;
