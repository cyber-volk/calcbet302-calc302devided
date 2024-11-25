'use client'

import React from 'react'
import { useStyles } from '../../../hooks/useStyles'
import type { Form, CreditRow, CreditPayeeRow, DepenseRow, RetraitRow } from '../../../types/calculator.types'

interface FormCalculationProps {
  form: Form
  onCalculate: () => void
}

export const FormCalculation: React.FC<FormCalculationProps> = ({
  form,
  onCalculate
}) => {
  const styles = useStyles()

  const calculateTotalCredit = (total: number, row: CreditRow): number => {
    return total + (parseFloat(row.totalClient) || 0)
  }

  const calculateTotalCreditPayee = (total: number, row: CreditPayeeRow): number => {
    return total + (parseFloat(row.totalPayee) || 0)
  }

  const calculateTotalDepense = (total: number, row: DepenseRow): number => {
    return total + (parseFloat(row.totalDepense) || 0)
  }

  const calculateTotalRetrait = (total: number, row: RetraitRow): number => {
    return total + (parseFloat(row.retraitPayee) || 0)
  }

  const calculateTotalRetraitPayee = () => {
    return form.retraitRows.reduce((total, row) => {
      if (row.retraitPayee === 'OK') {
        return total + (parseFloat(row.retrait) || 0)
      }
      return total + (parseFloat(row.retraitPayee) || 0)
    }, 0)
  }

  return (
    <div className={styles.calculationContainer}>
      <div className={styles.totalsGrid}>
        <div className={styles.totalItem}>
          <span className={styles.totalLabel}>Total Credit:</span>
          <span className={styles.totalValue}>{form.creditRows.reduce(calculateTotalCredit, 0).toFixed(2)}</span>
        </div>
        <div className={styles.totalItem}>
          <span className={styles.totalLabel}>Total Credit Payee:</span>
          <span className={styles.totalValue}>{form.creditPayeeRows.reduce(calculateTotalCreditPayee, 0).toFixed(2)}</span>
        </div>
        <div className={styles.totalItem}>
          <span className={styles.totalLabel}>Total Depense:</span>
          <span className={styles.totalValue}>{form.depenseRows.reduce(calculateTotalDepense, 0).toFixed(2)}</span>
        </div>
        <div className={styles.totalItem}>
          <span className={styles.totalLabel}>Total Retrait:</span>
          <span className={styles.totalValue}>{form.retraitRows.reduce(calculateTotalRetrait, 0).toFixed(2)}</span>
        </div>
        <div className={styles.totalItem}>
          <span className={styles.totalLabel}>Total Retrait Payee:</span>
          <span className={styles.totalValue}>{calculateTotalRetraitPayee().toFixed(2)}</span>
        </div>
      </div>

      <div className={styles.result}>
        <span className={styles.resultLabel}>Result:</span>
        <span className={styles.resultValue}>{form.result}</span>
      </div>

      <button
        onClick={onCalculate}
        className={styles.calculateButton}
      >
        Calculate
      </button>
    </div>
  )
}
