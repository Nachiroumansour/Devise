import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(amount);

  useEffect(() => {
    axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${fromCurrency}_${toCurrency}&compact=ultra`)
      .then(response => {
        const rate = response.data[`${fromCurrency}_${toCurrency}`];
        setExchangeRate(rate);
      })
      .catch(error => {
        console.error('Error fetching exchange rate:', error);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  const handleAmountChange = event => {
    const newAmount = parseFloat(event.target.value);
    setAmount(newAmount);
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} class="form-control" aria-describedby="passwordHelpInline" />
      </div>
      <div>
        <label>From:</label>
        <select value={fromCurrency} onChange={event => setFromCurrency(event.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add other currency options here */}
        </select>
      </div>
      <div>
        <label>To:</label>
        <select value={toCurrency} onChange={event => setToCurrency(event.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add other currency options here */}
        </select>
      </div>
      <div>
        <h2>Converted Amount:</h2>
        <p>{convertedAmount.toFixed(2)} {toCurrency}</p>
      </div>
    </div>
  );
}
export default App;