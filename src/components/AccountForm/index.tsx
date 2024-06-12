import { useContext, useState } from 'react'
import { AccountContext } from '../../contexts/accounts'
import { validateEmail, validateName } from '../../utils/functions'

import styles from './styles.module.scss'

const AccountForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { accounts, setAccounts } = useContext(AccountContext)

  const handleAdd = () => {
    if (!validateName(name)) {
      setErrorMessage('Name is invalid')

      return
    }

    if (!validateEmail(email)) {
      setErrorMessage('Email is invalid')

      return
    }

    setErrorMessage('')
    setAccounts([...accounts, { name, email, bonus: 0 }])
    setEmail('')
    setName('')
  }

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.inpContainer}>
          <span className={styles.label}>Name:</span>
          <input
            className={styles.input}
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div className={styles.inpContainer}>
          <span className={styles.label}>Email:</span>
          <input
            value={email}
            className={styles.input}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
      <button className={styles.addBtn} onClick={handleAdd}>
        Add
      </button>
    </div>
  )
}

export default AccountForm
