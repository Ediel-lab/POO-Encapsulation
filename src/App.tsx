import './App.css';
import { useState } from 'react';
import { Account } from './models/Account';
import accountsRaw from './data/accounts.json';

function App() {
  // Converte os dados JSON em instâncias da classe Account
  const initialAccounts = accountsRaw.map(
    (acc: { id: number; name: string; balance: number }) =>
      new Account(acc.id, acc.name, acc.balance)
  );

  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [selectedId, setSelectedId] = useState(accounts[0].id);
  const [amount, setAmount] = useState('');

  const selectedAccount = accounts.find((acc) => acc.id === selectedId)!;

  const updateBalance = (type: 'deposit' | 'withdraw') => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    try {
      if (type === 'deposit') {
        selectedAccount.deposit(value);
      } else {
        selectedAccount.withdraw(value);
      }

      // Força re-render criando novo array
      setAccounts([...accounts]);
      setAmount('');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Bank Account Pool</h2>

      <label>
        Select account:
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} (ID: {acc.id})
            </option>
          ))}
        </select>
      </label>

      <p>
        Balance for <strong>{selectedAccount.name}</strong>: $
        {selectedAccount.balance.toFixed(2)}
      </p>

      <input
        type="text"
        value={amount}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*\.?\d{0,2}$/.test(val) || val === '') {
            setAmount(val);
          }
        }}
        placeholder="Enter amount"
        style={{
          marginRight: '10px',
          padding: '5px',
          width: '120px',
          fontSize: '16px',
        }}
      />

      <button onClick={() => updateBalance('deposit')} style={{ marginRight: '5px' }}>
        Deposit
      </button>
      <button onClick={() => updateBalance('withdraw')}>Withdraw</button>
    </div>
  );
}

export default App;
