import React, { useEffect, useState } from "react";
import QrCode from "react-qr-code";

function ShowQr() {
  const [text, setText] = useState("");

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const amount = cookies
      .find((cookie) => cookie.includes("amount="))
      ?.split("=")[1];
    const vendorId = cookies
      .find((cookie) => cookie.includes("vendorId="))
      ?.split("=")[1];
    const qrText = `VendorId= ${vendorId}; Amount= ${amount}`;
    setText(qrText);
  }, []);

  return (
    <div>
      <QrCode value={text} />
    </div>
  );
}

export default ShowQr;
