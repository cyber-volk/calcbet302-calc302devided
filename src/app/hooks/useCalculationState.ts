'use client'

import { useCallback } from 'react'
import type { Form } from '../types/calculator.types'

export const useCalculationState = (form: Form, onUpdateForm: (updatedForm: Partial<Form>) => void) => {
  const calculateTotalCreditRows = useCallback((form: Form): number => {
    return form.creditRows.reduce((total: number, row) => {
      const rowTotal = parseFloat(row.totalClient || '0');
      return total + rowTotal;
    }, 0);
  }, [form.creditRows])

  const calculateTotalCreditPayeeRows = useCallback((form: Form): number => {
    return form.creditPayeeRows.reduce((total: number, row) => {
      const rowTotal = parseFloat(row.totalPayee || '0');
      return total + rowTotal;
    }, 0);
  }, [form.creditPayeeRows])

  const calculateTotalDepenseRows = useCallback((form: Form): number => {
    return form.depenseRows.reduce((total: number, row) => {
      const rowTotal = parseFloat(row.totalDepense || '0');
      return total + rowTotal;
    }, 0);
  }, [form.depenseRows])

  const calculateTotalRetraitRows = useCallback((form: Form): number => {
    return form.retraitRows.reduce((total: number, row) => {
      const rowTotal = parseFloat(row.retrait || '0');
      return total + rowTotal;
    }, 0);
  }, [form.retraitRows])

  const calculateTotalRetraitPayeeRows = useCallback((form: Form): number => {
    return form.retraitRows.reduce((total: number, row) => {
      if (row.retraitPayee === 'OK') {
        return total + (parseFloat(row.retrait) || 0)
      }
      return total + (parseFloat(row.retraitPayee) || 0)
    }, 0);
  }, [form.retraitRows])

  const calculateResult = useCallback(() => {
    const soldeALinstant = parseFloat(form.soldeALinstant) || 0
    const fond = parseFloat(form.fond) || 0
    const soldeDeDebut = parseFloat(form.soldeDeDebut) || 0
    const multiplier = parseFloat(form.multiplier) || 1.1

    const totalCredit = calculateTotalCreditRows(form)
    const totalCreditPayee = calculateTotalCreditPayeeRows(form)
    const totalDepense = calculateTotalDepenseRows(form)
    const totalRetrait = calculateTotalRetraitRows(form)
    const totalRetraitPayee = calculateTotalRetraitPayeeRows(form)

    const result = (
      (soldeALinstant + fond - soldeDeDebut + totalCredit - totalCreditPayee - totalDepense - totalRetrait + totalRetraitPayee) *
      multiplier
    ).toFixed(2)

    onUpdateForm({ result })
    return result
  }, [
    form.soldeALinstant,
    form.fond,
    form.soldeDeDebut,
    form.multiplier,
    calculateTotalCreditRows,
    calculateTotalCreditPayeeRows,
    calculateTotalDepenseRows,
    calculateTotalRetraitRows,
    calculateTotalRetraitPayeeRows,
    onUpdateForm
  ])

  return {
    calculateTotalCreditRows,
    calculateTotalCreditPayeeRows,
    calculateTotalDepenseRows,
    calculateTotalRetraitRows,
    calculateTotalRetraitPayeeRows,
    calculateResult
  }
}
