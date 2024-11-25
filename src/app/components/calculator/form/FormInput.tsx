import React from 'react'
import { useStyles } from '../../../hooks/useStyles'
import { VoiceInputButton } from '../voice/VoiceComponents'
import { VoiceLanguage } from '../../../types/voice.types'

interface FormInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
  voiceLanguage: VoiceLanguage
  error?: string
  isNumberField?: boolean
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  onVoiceInput,
  voiceLanguage,
  error,
  isNumberField = false
}) => {
  const styles = useStyles()

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
        <VoiceInputButton
          onVoiceInput={onVoiceInput}
          language={voiceLanguage}
          isNumberField={isNumberField}
        />
      </div>
      {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
    </div>
  )
}
