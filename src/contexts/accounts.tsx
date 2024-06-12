import { FC, createContext, ReactNode, useEffect, useState } from "react";
import { IAccountContext, IAcount } from "../types/account.type";

export const AccountContext = createContext<IAccountContext>({
  accounts: [],
  isLoading: true,
  totalBonuses: 0,
  setAccounts: () => {},
  saveAccounts: () => {},
});

export const AccountsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalBonuses, setTotalBonuses] = useState(0)
  const [accounts, setAccounts] = useState<IAcount[]>([]);

  const getAccounts = () => {
    const accountsJson = window.localStorage.getItem("accounts");

    if (accountsJson) {
      const accounts: IAcount[] = JSON.parse(accountsJson);

      setAccounts(accounts);
      setIsLoading(false)
      calculateBonuses()
    }
  };

  const calculateBonuses = () => {
    const bonuses = accounts.reduce((acc, prev) => {
      return acc + prev.bonus
    }, 0)

    setTotalBonuses(bonuses)
  }

  const saveAccounts = () => {
    window.localStorage.setItem('accounts', JSON.stringify(accounts))
    calculateBonuses()
  }

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    if(accounts.length) {
      saveAccounts()
    }
  }, [accounts])

  return (
    <AccountContext.Provider
      value={{
        accounts,
        isLoading,
        totalBonuses,
        setAccounts,
        saveAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
