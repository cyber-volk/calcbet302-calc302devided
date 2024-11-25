'use client'

import React from 'react'
import { Form, CalculationResult } from '../../../types/calculator.types'

interface CalculationProcessorProps {
  form: Form
  onResultCalculated: (result: CalculationResult) => void
}

export function CalculationProcessor({ form, onResultCalculated }: CalculationProcessorProps) {
  const calculateResults = (): CalculationResult => {
    // Calculate credit totals
    const creditTotal = form.creditRows.reduce((sum, row) => sum + (parseFloat(row.totalClient) || 0), 0)
    const creditPayeeTotal = form.creditPayeeRows.reduce((sum, row) => sum + (parseFloat(row.totalPayee) || 0), 0)
    
    // Calculate debit totals
    const depenseTotal = form.depenseRows.reduce((sum, row) => sum + (parseFloat(row.totalDepense) || 0), 0)
    const retraitTotal = form.retraitRows.reduce((sum, row) => {
      const payee = parseFloat(row.retraitPayee) || 0
      const retrait = parseFloat(row.retrait) || 0
      return sum + payee + retrait
    }, 0)

    // Calculate final totals
    const totalCredit = creditTotal + creditPayeeTotal
    const totalDebit = depenseTotal + retraitTotal
    const finalResult = totalCredit - totalDebit

    return {
      creditTotal,
      creditPayeeTotal,
      depenseTotal,
      retraitTotal,
      totalCredit,
      totalDebit,
      finalResult,
      timestamp: new Date().toISOString()
    }
  }

  React.useEffect(() => {
    const result = calculateResults()
    onResultCalculated(result)
  }, [form])

  return null // This is a logic-only component
}

interface ResultDisplayProps {
  result: CalculationResult
  multiplier?: string
}

export function ResultDisplay({ result, multiplier = '1' }: ResultDisplayProps) {
  const formatCurrency = (amount: number): string => {
    const multipliedAmount = amount * parseFloat(multiplier || '1')
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(multipliedAmount)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Calculation Results</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-600">Credits</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Client Credits:</span>
                <span className="font-medium">{formatCurrency(result.creditTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payee Credits:</span>
                <span className="font-medium">{formatCurrency(result.creditPayeeTotal)}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Total Credits:</span>
                <span>{formatCurrency(result.totalCredit)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">Debits</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Depenses:</span>
                <span className="font-medium">{formatCurrency(result.depenseTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Retraits:</span>
                <span className="font-medium">{formatCurrency(result.retraitTotal)}</span>
              </div>
              <div className="flex justify-between text-red-600 font-semibold">
                <span>Total Debits:</span>
                <span>{formatCurrency(result.totalDebit)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between text-xl font-bold">
            <span>Final Result:</span>
            <span className={result.finalResult >= 0 ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(result.finalResult)}
            </span>
          </div>
        </div>

        {multiplier !== '1' && (
          <div className="text-sm text-gray-500 mt-2">
            * All amounts are multiplied by {multiplier}
          </div>
        )}
      </div>
    </div>
  )
}
