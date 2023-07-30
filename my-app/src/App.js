import React, { useState, useEffect } from 'react';
import { DNBClient } from 'dnb-sdk'; // Replace with the actual DNB SDK import

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Initialize the DNB client with your API credentials
        const dnbClient = new DNBClient({
          apiKey: 'YOUR_API_KEY',
          apiSecret: 'YOUR_API_SECRET',
        });

        // Make the API call to fetch account data
        const accountData = await dnbClient.getAccounts();

        // Extract relevant information from the account data response
        const extractedData = accountData.map((account) => ({
          id: account.id,
          name: account.name,
          balance: account.balance,
        }));

        setAccounts(extractedData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div>
      <h1>Bank Account Balances</h1>
      {accounts.map((account) => (
        <div key={account.id}>
          <h3>{account.name}</h3>
          <p>Balance: {account.balance}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
