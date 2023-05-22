import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QrCode from "react-qr-code";

function QrCodeRequest() {
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = useForm();
  const [qrText, setQRText] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const vendorId = localStorage.getItem("vendorId");
  useEffect(() => {
    if (qrText) {
      setShowQrCode(true);
    } else {
      setShowQrCode(false);
    }
  }, [qrText]);
  const handleGenerate = async (data) => {
    reset();
    const amount = data.Amount;
    const text = `VendorId:${vendorId}; Amount:${amount}`;
    setQRText(text);
  };

  const handleCancel = () => {
    navigate("/vendor/home");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleGenerate)}>
          <input
            type="number"
            placeholder="Enter amount"
            {...register("Amount", { required: true })}
          />
          <button type="submit">Generate</button>
          <button type="button" onClick={handleCancel}>
            Home
          </button>
        </form>
      </div>
      <div>
        {showQrCode && (
          <div>
            <QrCode value={qrText} />
          </div>
        )}
      </div>
    </div>
  );
}

export default QrCodeRequest;
