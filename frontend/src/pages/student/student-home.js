import Button from "../../components/button";

function StudentHomePage() {
  return (
    <div>
      <Button text="Qr Scanner" page="/student/home/qr-scanner" />
      <Button
        text="Transaction History"
        page="/student/home/transaction-history"
      />
      <Button text="Log out" page="/student/home/confirm-logout" />
    </div>
  );
}
export default StudentHomePage;
