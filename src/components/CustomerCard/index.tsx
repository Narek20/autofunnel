import { FC, useContext, useEffect, useRef, useState } from 'react'
import { AccountContext } from '../../contexts/accounts'

import styles from './styles.module.scss'

interface IProps {
  name: string
  bonus: number
  email: string
  image?: string
}

const AccountCard: FC<IProps> = ({ name, bonus, email, image }) => {
  const [imageUrl, setImageUrl] = useState(image)
  const [bonusAmount, setBonusAmount] = useState(bonus)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [isBonusAvailable, setIsBonusAvailable] = useState(true)

  const { accounts, setAccounts } = useContext(AccountContext)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddBonus = () => {
    setBonusAmount((prev) => prev + 1)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setAccounts(accounts.filter((account) => account.email !== email))
  }

  useEffect(() => {
    setAccounts(
      accounts.map((account) =>
        account.email === email
          ? {
              ...account,
              image: imageUrl,
              bonus: bonusAmount,
              progress: progressPercentage,
            }
          : account
      )
    )
  }, [bonusAmount, imageUrl, progressPercentage])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressPercentage((prevProgress) => {
        const newProgress = Math.min(prevProgress + 1, 100)
        if (newProgress === 100) {
          clearInterval(interval)
          setIsBonusAvailable(false)
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.accountCard}>
      <div className={styles.header}>
        <button className={styles.deleteBtn} onClick={handleRemove}>
          X
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.accountInfo}>
          <div className={styles.infoContainer}>
            <span className={styles.label}>Name: </span>
            <span className={styles.info}>{name}</span>
          </div>
          <div className={styles.infoContainer}>
            <span className={styles.label}>Bonus:</span>
            <span className={styles.info}>{bonusAmount}</span>
          </div>
          <div className={styles.infoContainer}>
            <span className={styles.label}>Email:</span>
            <span className={styles.info}>{email}</span>
          </div>
          <button
            className={styles.bonusBtn}
            onClick={handleAddBonus}
            disabled={!isBonusAvailable}
          >
            Add bonus
          </button>
        </div>
        <div>
          <div className={styles.uploadContainer} onClick={handleUploadClick}>
          <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={handleUpload}
                />
            {imageUrl ? (
              <img
                className={styles.image}
                src={imageUrl}
                alt={`${name} photo`}
              />
            ) : (
              <>
                
                <span>Upload Photo</span>
              </>
            )}
          </div>
        </div>
      </div>
      {isBonusAvailable && (
        <div className={styles.progress}>
          <div
            className={styles.indicator}
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <span className={styles.label}>Progress {progressPercentage}%</span>
        </div>
      )}
    </div>
  )
}

export default AccountCard
