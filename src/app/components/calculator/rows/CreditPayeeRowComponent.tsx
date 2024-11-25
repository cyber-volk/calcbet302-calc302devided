'use client'

import React from 'react'
import { useStyles } from '../../../hooks/useStyles'
import { CreditPayeeRow, VoiceLanguage } from '../../../types/calculator.types'
import { VoiceInputButton } from '../voice/VoiceComponents'
import { Trash2 } from 'lucide-react'

interface CreditPayeeRowProps {
  row: CreditPayeeRow
  onUpdate: (updatedRow: CreditPayeeRow) => void
  onRemove: (id: string) => void
  voiceLanguage: VoiceLanguage
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
}

export const CreditPayeeRowComponent: React.FC<CreditPayeeRowProps> = ({
  row,
  onUpdate,
  onRemove,
  voiceLanguage,
  onVoiceInput
}) => {
  const styles = useStyles()

  const handleInputChange = (field: keyof CreditPayeeRow, value: string) => {
    onUpdate({ ...row, [field]: value })
  }

  return (
    <div className={styles.row}>
      <div className="space-y-2">
        <label htmlFor={`totalPayee-${row.id}`} className={styles.totalLabel}>
          Total Payee
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={`totalPayee-${row.id}`}
            type="text"
            value={row.totalPayee}
            onChange={(e) => handleInputChange('totalPayee', e.target.value)}
            className={styles.input}
          />
          <VoiceInputButton
            onVoiceInput={(callback) => onVoiceInput(callback, true)}
            language={voiceLanguage}
            isNumberField={true}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`details-${row.id}`} className={styles.totalLabel}>
          Details
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={`details-${row.id}`}
            type="text"
            value={row.details}
            onChange={(e) => handleInputChange('details', e.target.value)}
            className={styles.input}
          />
          <VoiceInputButton
            onVoiceInput={(callback) => onVoiceInput(callback)}
            language={voiceLanguage}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`client-${row.id}`} className={styles.totalLabel}>
          Client
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={`client-${row.id}`}
            type="text"
            value={row.client}
            onChange={(e) => handleInputChange('client', e.target.value)}
            className={styles.input}
          />
          <VoiceInputButton
            onVoiceInput={(callback) => onVoiceInput(callback)}
            language={voiceLanguage}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(row.id)}
        className={styles.removeButton}
        aria-label="Remove row"
      >
        <Trash2 className="w-5 h-5" />
        <span className="sr-only">Remove row</span>
      </button>
    </div>
  )
}
