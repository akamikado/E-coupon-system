import { useNavigate } from "react-router-dom";
import axios from "axios";
function StudentLogoutPage() {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/student/home");
  };
  const onConfirm = () => {
    axios
      .post("http://localhost:3001/student/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p>Would you like to logout?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
}
export default StudentLogoutPage;
