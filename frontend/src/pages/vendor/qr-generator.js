import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function QrCodeRequest() {
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = useForm();
  const [vendorId, setVendorId] = useState("");

  const handleGenerate = async (data) => {
    reset();
    try {
      const response = await axios.post(
        "http://localhost:3001/vendor/transaction",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const parsedResponse = response.data;
      setVendorId(parsedResponse.vendorId);
      const expires = new Date();
      expires.setTime(expires.getTime() + 2000);
      document.cookie = `vendorId=${parsedResponse.vendorId}; amount=${
        data.Amount
      }; path=/vendor/home/generate-transaction/qr; expires=${expires.toUTCString()}`;
      navigate("/vendor/home/generate-transaction/qr");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/vendor/home");
  };

  return (
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
  );
}

export default QrCodeRequest;
