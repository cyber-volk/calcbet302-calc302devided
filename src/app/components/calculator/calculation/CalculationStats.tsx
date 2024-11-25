'use client'

import React, { useMemo } from 'react'
import { animated } from '@react-spring/web'
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react'
import { useSlideAnimation } from '../../../utils/animationUtils'
import type { Form } from '../../../types/calculator.types'

interface CalculationStatsProps {
  forms: Form[]
  className?: string
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

function StatCard({ title, value, icon, trend, className = '' }: StatCardProps) {
  const scaleAnimation = useSlideAnimation()

  return (
    <animated.div
      style={scaleAnimation}
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-500">{icon}</div>
        {trend && (
          <div
            className={`flex items-center space-x-1 text-sm ${
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </animated.div>
  )
}

export function CalculationStats({ forms, className = '' }: CalculationStatsProps) {
  const calculateStats = () => {
    if (forms.length === 0) return null

    const totalTransactions = forms.reduce(
      (acc, form) =>
        acc +
        form.creditRows.length +
        form.creditPayeeRows.length +
        form.depenseRows.length +
        form.retraitRows.length,
      0
    )

    const totalAmount = forms.reduce((acc, form) => {
      const result = form.result ? parseFloat(form.result.replace('Total: ', '')) : 0
      return isNaN(result) ? acc : acc + result
    }, 0)

    const averageTransactionsPerForm = totalTransactions / forms.length
    const averageAmount = totalAmount / forms.length

    // Calculate trends (comparing last two forms)
    const calculateTrend = (current: number, previous: number) => {
      if (!previous) return 0
      return ((current - previous) / previous) * 100
    }

    const lastForm = forms[forms.length - 1]
    const previousForm = forms[forms.length - 2]

    const lastFormTransactions =
      lastForm.creditRows.length +
      lastForm.creditPayeeRows.length +
      lastForm.depenseRows.length +
      lastForm.retraitRows.length

    const previousFormTransactions = previousForm
      ? previousForm.creditRows.length +
        previousForm.creditPayeeRows.length +
        previousForm.depenseRows.length +
        previousForm.retraitRows.length
      : 0

    const transactionsTrend = calculateTrend(
      lastFormTransactions,
      previousFormTransactions
    )

    const lastAmount = lastForm.result ? parseFloat(lastForm.result.replace('Total: ', '')) : 0
    const previousAmount = previousForm
      ? previousForm.result ? parseFloat(previousForm.result.replace('Total: ', '')) : 0
      : 0

    const amountTrend = calculateTrend(lastAmount, previousAmount)

    return {
      totalTransactions,
      totalAmount,
      averageTransactionsPerForm,
      averageAmount,
      transactionsTrend,
      amountTrend
    }
  }

  const stats = calculateStats()

  if (!stats) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No statistics available</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      <StatCard
        title="Total Transactions"
        value={stats.totalTransactions}
        icon={<Activity className="w-6 h-6" />}
        trend={{
          value: stats.transactionsTrend,
          isPositive: stats.transactionsTrend >= 0
        }}
      />
      <StatCard
        title="Total Amount"
        value={`${stats.totalAmount.toFixed(2)}`}
        icon={<DollarSign className="w-6 h-6" />}
        trend={{
          value: stats.amountTrend,
          isPositive: stats.amountTrend >= 0
        }}
      />
      <StatCard
        title="Avg Transactions/Form"
        value={stats.averageTransactionsPerForm.toFixed(1)}
        icon={<Activity className="w-6 h-6" />}
      />
      <StatCard
        title="Avg Amount/Form"
        value={`${stats.averageAmount.toFixed(2)}`}
        icon={<DollarSign className="w-6 h-6" />}
      />
    </div>
  )
}
