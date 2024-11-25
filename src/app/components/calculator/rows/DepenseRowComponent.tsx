import React from 'react'
import { Trash2 } from 'lucide-react'
import { useStyles } from '../../../hooks/useStyles'
import { DepenseRow, VoiceLanguage } from '../../../types/calculator.types'
import { VoiceInputButton } from '../voice/VoiceComponents'

interface DepenseRowProps {
  row: DepenseRow
  onUpdate: (updatedRow: DepenseRow) => void
  onRemove: (id: string) => void
  voiceLanguage: VoiceLanguage
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
}

export const DepenseRowComponent: React.FC<DepenseRowProps> = ({
  row,
  onUpdate,
  onRemove,
  voiceLanguage,
  onVoiceInput
}) => {
  const styles = useStyles()

  const handleInputChange = (field: keyof DepenseRow, value: string) => {
    onUpdate({ ...row, [field]: value })
  }

  return (
    <div className={styles.row}>
      <div className="space-y-2">
        <label htmlFor={`totalDepense-${row.id}`} className={styles.totalLabel}>
          Total Depense
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={`totalDepense-${row.id}`}
            type="text"
            value={row.totalDepense}
            onChange={(e) => handleInputChange('totalDepense', e.target.value)}
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
        aria-label="Remove depense row"
      >
        <Trash2 className="w-5 h-5" />
        <span className="sr-only">Remove row</span>
      </button>
    </div>
  )
}
