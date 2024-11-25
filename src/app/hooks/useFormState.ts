'use client'

import { useState, useCallback } from 'react'
import type { Form } from '../types/calculator.types'

export const useFormState = (initialForm: Form) => {
  const [form, setForm] = useState<Form>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateInput = useCallback((value: string, field: string, isMandatory = false) => {
    let parsedValue: number | null = null
    const newErrors = { ...errors }

    if (field === 'soldeALinstant' || field === 'soldeDeDebut') {
      const numbers = value.split('+').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
      parsedValue = numbers.reduce((acc, num) => acc + num, 0)
    } else {
      parsedValue = parseFloat(value)
    }

    if (value === '' && !isMandatory) {
      newErrors[field] = ''
      setErrors(newErrors)
      return { isValid: true, errorMessage: '' }
    } else if (isMandatory && (value === '' || parsedValue === 0 || isNaN(parsedValue))) {
      newErrors[field] = 'svp insérer un solde de début'
      setErrors(newErrors)
      return { isValid: false, errorMessage: newErrors[field] }
    } else if (isNaN(parsedValue)) {
      newErrors[field] = 'Please enter a valid number'
      setErrors(newErrors)
      return { isValid: false, errorMessage: newErrors[field] }
    }

    newErrors[field] = ''
    setErrors(newErrors)
    return { isValid: true, errorMessage: '' }
  }, [errors])

  const updateForm = useCallback((fieldOrForm: string | Partial<Form>, value?: string) => {
    if (typeof fieldOrForm === 'string' && value !== undefined) {
      // Single field update
      setForm(prevForm => ({
        ...prevForm,
        [fieldOrForm]: value
      }))
    } else if (typeof fieldOrForm === 'object') {
      // Partial form update
      setForm(prevForm => ({
        ...prevForm,
        ...fieldOrForm
      }))
    }
  }, [])

  const resetForm = useCallback(() => {
    setForm(initialForm)
    setErrors({})
  }, [initialForm])

  return {
    form,
    setForm,
    errors,
    setErrors,
    validateInput,
    updateForm,
    resetForm
  }
}
