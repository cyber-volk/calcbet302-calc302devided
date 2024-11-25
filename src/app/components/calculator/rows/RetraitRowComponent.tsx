import React from 'react'
import { Trash2 } from 'lucide-react'
import { useStyles } from '../../../hooks/useStyles'
import { RetraitRow, VoiceLanguage } from '../../../types/calculator.types'
import { VoiceInputButton } from '../voice/VoiceComponents'

interface RetraitRowProps {
  row: RetraitRow
  onUpdate: (updatedRow: RetraitRow) => void
  onRemove: (id: string) => void
  voiceLanguage: VoiceLanguage
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
}

export const RetraitRowComponent: React.FC<RetraitRowProps> = ({
  row,
  onUpdate,
  onRemove,
  voiceLanguage,
  onVoiceInput
}) => {
  const styles = useStyles()

  const handleInputChange = (field: keyof RetraitRow, value: string) => {
    onUpdate({ ...row, [field]: value })
  }

  return (
    <div className={styles.row}>
      <div className="space-y-2">
        <label htmlFor={`retraitPayee-${row.id}`} className={styles.totalLabel}>
          Retrait Payee
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={`retraitPayee-${row.id}`}
            type="text"
            value={row.retraitPayee}
            onChange={(e) => handleInputChange('retraitPayee', e.target.value)}
            className={styles.input}
          />
          <VoiceInputButton
            onVoiceInput={(callback) => onVoiceInput(callback)}
            language={voiceLanguage}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`retrait-${row.id}`} className={styles.totalLabel}>
          Retrait
        </label>
        <div className="flex items-center space-x-2">
          <input
            id={`retrait-${row.id}`}
            type="text"
            value={row.retrait}
            onChange={(e) => handleInputChange('retrait', e.target.value)}
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
