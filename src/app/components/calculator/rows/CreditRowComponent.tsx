import React from 'react'
import { Trash2 } from 'lucide-react'
import { useStyles } from '../../../hooks/useStyles'
import { CreditRow, VoiceLanguage } from '../../../types/calculator.types'
import { VoiceInputButton } from '../voice/VoiceComponents'

interface CreditRowProps {
  row: CreditRow
  onUpdate: (updatedRow: CreditRow) => void
  onRemove: (id: string) => void
  voiceLanguage: VoiceLanguage
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
  disabled?: boolean
}

export const CreditRowComponent: React.FC<CreditRowProps> = ({
  row,
  onUpdate,
  onRemove,
  voiceLanguage,
  onVoiceInput,
  disabled = false
}) => {
  const styles = useStyles()

  const handleInputChange = (field: keyof CreditRow, value: string) => {
    onUpdate({ ...row, [field]: value })
  }

  return (
    <div className={styles.row}>
      <div className="space-y-2">
        <label htmlFor={`totalClient-${row.id}`} className={styles.totalLabel}>
          Total Client
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={`totalClient-${row.id}`}
            type="text"
            value={row.totalClient}
            onChange={(e) => handleInputChange('totalClient', e.target.value)}
            className={styles.input}
            disabled={disabled}
          />
          <VoiceInputButton
            onVoiceInput={(callback) => onVoiceInput(callback, true)}
            language={voiceLanguage}
            isNumberField={true}
            disabled={disabled}
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
            disabled={disabled}
          />
          <VoiceInputButton
            onVoiceInput={(callback) => onVoiceInput(callback)}
            language={voiceLanguage}
            disabled={disabled}
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
            disabled={disabled}
          />
          <VoiceInputButton
            onVoiceInput={(callback) => onVoiceInput(callback)}
            language={voiceLanguage}
            disabled={disabled}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(row.id)}
        className={styles.removeButton}
        aria-label="Remove credit row"
        disabled={disabled}
      >
        <Trash2 className="w-5 h-5" />
        <span className="sr-only">Remove row</span>
      </button>
    </div>
  )
}
