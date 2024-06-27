import './App.css';
import React, { useState } from 'react';

function App() {

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);

  const handleAdding = () => {
    const trimmedTitle = title.trim();
  
    if (trimmedTitle === '' || amount === 0) {
      alert('Please enter a valid title and amount.');
      return;
    }
  
    const newTransaction = {
      title: trimmedTitle,
      amount: parseFloat(amount),
      income: true
    };
  
    setTransactions([...transactions, newTransaction]);
  
    if (newTransaction.amount > 0) {
      setIncome(income + newTransaction.amount);
      setBalance(balance + newTransaction.amount);
    } else {
      newTransaction.income = false;
      setExpense(expense + Math.abs(newTransaction.amount));
      setBalance(balance + newTransaction.amount);
    }
  
    setTitle('');
    setAmount(0);
  };

  return (
    <div className="App">
      <h2 className="header">Expense Tracker</h2>
      <div className="balance">
        <span className='bal_tit'>YOUR BALANCE</span>
        <span className='bal_num'>${balance}</span>
      </div>
      <div className="inc_exp">
        <div className='inc'>
          <span>INCOME</span>
          <span className='inc_num'>${income}</span>
        </div>
        <div className='exp'>
          <span>EXPENSE</span>
          <span className='exp_num'>${expense}</span>
        </div>
      </div>
      <div className="history">
        <h4>History</h4>
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          transactions.slice(-3).reverse().map((transaction, index) => (
            <div key={index} className={transaction.amount > 0 ? 'greenbor' : ''}>
              <span>{transaction.title}</span>
              <span>{transaction.amount > 0 ? `+${transaction.amount}` : `${transaction.amount}`}</span>
            </div>
          ))
        )}
      </div>
      <div className="add_new">
        <h4>Add new transaction</h4>
        <div>
          <label>Title</label>
          <input 
            type="text" 
            placeholder="Enter title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div>
          <label>Amount ( use - for expense and + for incomes )</label>
          <input 
            type="number" 
            placeholder="Enter amount.." 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        <button onClick={handleAdding}>Add Transaction</button>
      </div>
    </div>
  );
}

export default App;
