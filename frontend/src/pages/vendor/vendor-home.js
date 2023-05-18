import Button from "../../components/button";

function VendorHomePage() {
  return (
    <div>
      <Button
        text="Generate QR Code"
        page="/vendor/home/generate-transaction"
      />
      <Button
        text="Transaction History"
        page="/vendor/home/transaction-history"
      />
      <Button text="Log out" page="/vendor/home/confirm-logout" />
    </div>
  );
}
export default VendorHomePage;
