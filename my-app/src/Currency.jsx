import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import "./styles.css"; // Import the CSS file

const Currency = () => {
  const [currency, setCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-bold-gravity-395018.cloudfunctions.net/DNB-BACKEND-APPLICATION/currencies"
        );
        setCurrency(response.data);
        if (response.data.length > 0) {
          setSelectedCurrency(response.data[0].baseCurrency); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const selectedCurrencyData = currency.find((item) => item.baseCurrency === selectedCurrency);
  const selectedUpdatedDate = selectedCurrencyData ? selectedCurrencyData.updatedDate : null;
  //const selectedAmount = selectedCurrencyData ? selectedCurrencyData.amount : null;
  const selectedRate = selectedCurrencyData ? selectedCurrencyData.buyRateTransfer : null;


  return (
    <div className="overlay"> {
    <div className="currency-container">
      <h1 className="title">NOK Currency Converter:</h1>
      <p>Se hvor mye den norske kronen er verdt</p>
       <p>(<i>Basert på data fra DNB</i>)</p>
      <FormControl className="select-container">
        <InputLabel>Select Currency</InputLabel>
        <Select value={selectedCurrency} onChange={handleCurrencyChange}>
          {currency.map((value, index) => (
            <MenuItem key={index} value={value.baseCurrency}>
              {value.baseCurrency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography className="info-text">Selected Currency: {selectedCurrency}</Typography>
      <Typography className="info-text">Updated Date: {selectedUpdatedDate}</Typography>
      {/*<Typography className="info-text">Amount: {selectedAmount} - {selectedCurrency}</Typography>*/}
      <Typography className="info-text">1 Nok = {selectedRate} - {selectedCurrency}</Typography>

    </div>
}</div>
  );
};

export default Currency;
