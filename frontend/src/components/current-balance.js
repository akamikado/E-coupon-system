import React, { useState, useEffect } from "react";
import classes from "./current-balance.module.css";

const CurrentBalance = () => {
  const [currentBalance, setCurrentBalance] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const studentId = localStorage.getItem("studentId");

    try {
      const response = await fetch(
        "http://localhost:3001/student/current-balance",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ studentId: studentId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch current balance");
      }

      const data = await response.json();
      setCurrentBalance(data.currentBalance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.center}>
      <div className={classes.container}>
        {currentBalance ? (
          <div>
            <p className={classes.text}>Current Balance: {currentBalance}</p>
          </div>
        ) : (
          <p className={classes.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CurrentBalance;
