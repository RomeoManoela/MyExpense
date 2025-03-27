import React from 'react'

export interface ErrorType {
  message?: string
  data?: string
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

export interface TransactionType {
  id: number
  montant: number
  type: string
  categorie: string
  description: string
  date: string
}

export interface TransactionState {
  transactions: TransactionType[]
  montant_max: null | number
  montant_actuel: null | number
}

export interface DashboardState {
  username: string
  transactions: TransactionType[]
}

export interface UserState {
  username: string
  budget: {
    solde: null | number
    depense: null | number
    budget: null | number
  }
}

interface CategoryData {
  categorie: string
  montant: number
}

interface DailyExpense {
  date: string
  montant: number
}

export interface AnalyticsState {
  categories: CategoryData[]
  dailyExpenses: DailyExpense[]
  loading: boolean
  error: string | null
  lastUpdated: number
}
