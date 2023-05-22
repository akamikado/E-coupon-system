import { useNavigate } from "react-router-dom";
import axios from "axios";
function ConfirmTransaction() {
  const navigate = useNavigate();
  const cookies = document.cookie.split(";");
  const amount = cookies.find(
    ((cookies) => cookies.includes("amount="))?.split("=")[1]
  );
  const vendorId = cookies.find(
    ((cookies) => cookies.includes("vendorId="))?.split("=")[1]
  );
  const currentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleString();
  };
  const onCancel = () => {
    navigate("/student/home");
  };
  const onConfirm = () => {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/student/transaction`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { amount: amount, vendorId: vendorId, time: currentTime },
    };
    axios
      .post(config)
      .then(() => {
        navigate("/student/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>
        You have ordered coupons worth {amount}. Would you like to proceed with
        the transaction?
      </p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
}
export default ConfirmTransaction;
