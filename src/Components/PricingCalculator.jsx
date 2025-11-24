import React, { useState } from 'react';

const PricingCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState(null);
  const [total, setTotal] = useState(null);

  const MAX_LIMIT = 5000000;

  const handleChange = (e) => {
    let value = e.target.value;

    // Remove leading zeroes
    if (value.startsWith('0') && value.length > 1) {
      value = value.replace(/^0+/, '');
    }

    let num = parseFloat(value);

    if (isNaN(num) || num < 0) {
      setAmount('');
      setFee(null);
      setTotal(null);
      return;
    }

    // Cap to max allowed amount
    if (num > MAX_LIMIT) {
      num = MAX_LIMIT;
      value = MAX_LIMIT.toString();
    }

    setAmount(value);

    const feeAmount = num >= 200000 ? 3000 : (num * 0.02) + 100;
    setFee(feeAmount.toFixed(2));
    setTotal((num + feeAmount).toFixed(2));
  };

  return (
    <div style={styles.container}>
      {/* <h4>Pricing Calculator</h4> */}
      {/* <h4>Pricing Calculator (2.0% + ₦100)</h4> */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={handleChange}
        style={styles.input}
      />
      {total && (
        <div style={styles.result}>
          <p>Fee: <strong>₦{fee}</strong></p>
          <p>Total to Charge: <strong>₦{total}</strong></p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '1px auto',
    padding: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '12px',
    fontFamily: 'Arial, sans-serif',
    // backgroundColor: '#f9f9f9'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  result: {
    backgroundColor: '#e7f4e4',
    padding: '1rem',
    borderRadius: '8px',
  }
};

export default PricingCalculator;
