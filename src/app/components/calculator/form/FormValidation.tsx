'use client'

import React from 'react'
import { useStyles } from '../../../hooks/useStyles'
import { Form, VoiceLanguage } from '../../../types/calculator.types'
import { FormInput } from './FormInput'

interface FormValidationProps {
  form: Form
  onUpdateForm: (updatedForm: Partial<Form>) => void
  errors: Record<string, string>
  voiceLanguage: VoiceLanguage
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
}

export const FormValidation: React.FC<FormValidationProps> = ({
  form,
  onUpdateForm,
  errors,
  voiceLanguage,
  onVoiceInput
}) => {
  const styles = useStyles()

  const validateForm = (): boolean => {
    const requiredFields = [
      'fond',
      'soldeALinstant',
      'soldeDeDebut',
      'creditRows',
      'creditPayeeRows',
      'depenseRows',
      'retraitRows'
    ]

    return requiredFields.every(field => {
      if (Array.isArray(form[field as keyof Form])) {
        return (form[field as keyof Form] as any[]).length > 0
      }
      return !!form[field as keyof Form]
    })
  }

  const formFields = [
    { id: 'multiplier', label: 'Multiplier', value: form.multiplier, isNumberField: true },
    { id: 'fond', label: 'Fond', value: form.fond, isNumberField: true },
    { id: 'soldeALinstant', label: 'Solde à l\'instant', value: form.soldeALinstant, isNumberField: true },
    { id: 'soldeDeDebut', label: 'Solde de début', value: form.soldeDeDebut, isNumberField: true }
  ]

  return (
    <div className={styles.validationContainer}>
      {formFields.map((field) => (
        <FormInput
          key={field.id}
          id={field.id}
          label={field.label}
          value={field.value}
          onChange={(value) => onUpdateForm({ [field.id]: value })}
          onVoiceInput={onVoiceInput}
          voiceLanguage={voiceLanguage}
          error={errors[field.id]}
          isNumberField={field.isNumberField}
        />
      ))}
      
      {!validateForm() && (
        <div className={styles.errorMessage}>
          Please fill in all required fields
        </div>
      )}
    </div>
  )
}
