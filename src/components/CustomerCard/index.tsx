import { FC, useContext, useEffect, useRef, useState } from 'react'
import { AccountContext } from '../../contexts/accounts'

import styles from './styles.module.scss'

interface IProps {
  name: string
  bonus: number
  email: string
  progress: number
  image?: string
}

const AccountCard: FC<IProps> = ({ name, bonus, progress, email, image }) => {
  const [progressPercentage, setProgressPercentage] = useState(progress)
  const [bonusAmount, setBonusAmount] = useState(bonus)
  const [imageUrl, setImageUrl] = useState(image)

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

  const handleProgress = () => {
    setProgressPercentage((prevProgress) => Math.min(prevProgress + 20, 100))
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
          <button className={styles.bonusBtn} onClick={handleAddBonus}>
            Add bonus
          </button>
        </div>
        <div>
          <div className={styles.uploadContainer} onClick={handleUploadClick}>
            {imageUrl ? (
              <img
                className={styles.image}
                src={imageUrl}
                alt={`${name} photo`}
              />
            ) : (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={handleUpload}
                />
                <span>Upload Photo</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.progress} onClick={handleProgress}>
        <div
          className={styles.indicator}
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <span className={styles.label}>Progress {progressPercentage}%</span>
      </div>
    </div>
  )
}

export default AccountCard
