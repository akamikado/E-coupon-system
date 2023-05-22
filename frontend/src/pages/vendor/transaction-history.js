import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VendorTransactionHistory() {
  const navigate = useNavigate();
  const [transactionsState, setTransactionsState] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);
  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/vendor/transaction-history",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            studentId: localStorage.getItem("vendorId"),
          }),
        }
      );
      const textResponse = await response.text();
      console.log("Response:", textResponse);

      const transactions = JSON.parse(textResponse);
      console.log("Parsed Transactions:", transactions);

      setTransactionsState(transactions);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    navigate("/vendor/home");
  };

  return (
    <div>
      <h2>Previous Transactions</h2>
      {transactionsState.map((transaction) => (
        <div key={transaction._id}>
          <p>Amount : {transaction.amount}</p>
          <p>Transacted on : {transaction.transactionTime}</p>
          <p>
            Student Id : {transaction.studentId} Vendor Id :{" "}
            {transaction.vendorId}
          </p>
        </div>
      ))}
      <div>
        <button onClick={handleClick}>Go Home</button>
      </div>
    </div>
  );
}
export default VendorTransactionHistory;
