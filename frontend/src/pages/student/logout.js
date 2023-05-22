import { useNavigate } from "react-router-dom";
function StudentLogoutPage() {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/student/home");
  };
  const onConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    navigate("/");
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
