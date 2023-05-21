import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import QrCode from "react-qr-code";

function QrCodeRequest() {
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = useForm();
  const [vendorId, setVendorId] = useState("");
  let text = "";
  const handleGenerate = async (data) => {
    reset();

    const amount = data.Amount;
    try {
      const response = await axios
        .post("http://localhost:3001/vendor/transaction", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          const parsedResponse = response.data;
          setVendorId(parsedResponse.vendorId);
          const expires = new Date();
          expires.setTime(expires.getTime() + 2000);
          text = `VendorId= ${vendorId}; Amount= ${amount}`;
        });
    } catch (error) {
      console.log(error);
    }
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
        <QrCode value={text} />
      </div>
    </div>
  );
}

export default QrCodeRequest;
