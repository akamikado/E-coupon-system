import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
const QrScannerPage = () => {
  const navigate = useNavigate();
  const closeButton = () => {
    navigate("/student/home");
  };
  const handleScan = (data) => {
    if (data) {
      const values = data.split(";");
      const money = values
        .find((value) => value.includes("Amount="))
        ?.split("=")[1];
      const vendorId = values
        .find((value) => value.includes("VendorId="))
        ?.split("=")[1];
      const date = new Date();
      date.setTime(date.getTime() + 2000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `money=${money}; vendorId=${vendorId}; ${expires}; path=/student/confirm-transaction`;
      navigate("/student/home/confirm-transaction");
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <button onClick={closeButton}>Close</button>
    </div>
  );
};
export default QrScannerPage;
