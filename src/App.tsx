import { useContext } from 'react'
import AccountForm from './components/AccountForm'
import AccountCard from './components/CustomerCard'
import { AccountContext } from './contexts/accounts'

import './App.css'

function App() {
  const { accounts, totalBonuses } = useContext(AccountContext)

  return (
    <div className="App">
      <AccountForm />
      <div className="accounts">
        <div className="bonusContainer">
          <span>Total Bonuses: {totalBonuses}</span>
        </div>
        {accounts.map((account) => (
          <AccountCard key={account.email} {...account} />
        ))}
      </div>
    </div>
  )
}

export default App
