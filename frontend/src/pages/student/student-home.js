import Button from "../../components/button";
import CurrentBalance from "../../components/current-balance";

function StudentHomePage() {
  return (
    <div>
      <Button text="Qr Scanner" page="/student/home/qr-scanner" />
      <Button
        text="Transaction History"
        page="/student/home/transaction-history"
      />
      <Button text="Log out" page="/student/home/confirm-logout" />
      <CurrentBalance />
    </div>
  );
}
export default StudentHomePage;
