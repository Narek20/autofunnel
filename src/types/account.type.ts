import { Dispatch, SetStateAction } from "react";

export interface IAccountContext {
  accounts: IAcount[]
  isLoading: boolean
  totalBonuses: number
  saveAccounts: () => void
  setAccounts: Dispatch<SetStateAction<IAcount[]>>
}

export interface IAcount {
  name: string;
  email: string;
  bonus: number;
  progress: number
  image?: string
}