import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import { useState } from "react";
import axios from "axios";
const QrScannerPage = () => {
  const navigate = useNavigate();
  const closeButton = () => {
    navigate("/student/home");
  };
  const [qrScanned, setQrScanned] = useState(false);
  const [amount, setAmount] = useState("");
  const [vendorIdState, setVendorIdState] = useState("");
  const handleScan = (data) => {
    if (!qrScanned && data) {
      console.log(data);
      const amount = data.text
        .split(";")
        .find((value) => value.includes("Amount:"))
        ?.split(":")[1];
      const vendorId = data.text
        .split(";")
        .find((value) => value.includes("VendorId:"))
        ?.split(":")[1];
      setAmount(amount);
      setVendorIdState(vendorId);
      setQrScanned(true);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleOnConfirm = () => {
    const currentTime = () => {
      const currentTime = new Date();
      return currentTime.toLocaleTimeString();
    };
    const config = {
      maxBodyLength: Infinity,
      url: `http://localhost:3001/student/transaction`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        amount: amount,
        studentId: localStorage.getItem("studentId"),
        vendorId: vendorIdState,
        time: currentTime,
      },
    };

    axios
      .post(config.url, config.data, { headers: config.headers })
      .then((response) => {
        if (response.data.transaction) {
          navigate("/student/home");
        }
        navigate("/student/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!qrScanned && (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onResult={handleScan}
            style={{ width: "50%" }}
          />
          <button onClick={closeButton}>Close</button>
        </div>
      )}
      {qrScanned && (
        <div>
          <p>Would you like to proceed with transaction of {amount} rupees?</p>
          <button onClick={handleOnConfirm}>Confirm</button>
          <button onClick={closeButton}>Cancel</button>
        </div>
      )}
    </div>
  );
};
export default QrScannerPage;
