import React, { useState, useEffect } from "react";
import axios from "axios";

const Currency = () => {
  const [currency, setCurrency] = useState(null);
  console.log("🚀 ~ file: Currency.js:10 ~ Currency ~ currency:", currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/currencies");
        setCurrency(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>NOK Currency:</h2>
      {currency && currency.map((value) => (<p>{value.amount}</p>))}
    </div>
  );
};
export default Currency;
