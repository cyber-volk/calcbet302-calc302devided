'use client'

import React from 'react'
import { useStyles } from '../../../hooks/useStyles'
import { RowManager } from '../rows/RowManager'
import { FormValidation } from './FormValidation'
import { FormCalculation } from './FormCalculation'
import type { Form, CreditRow, CreditPayeeRow, DepenseRow, RetraitRow } from '../../../types/calculator.types'
import { VoiceLanguage as VoiceInputVoiceLanguage } from '../../../types/voice.types'
import { v4 as uuidv4 } from 'uuid'

interface FormManagerProps {
  form: Form
  onUpdateForm: (updatedForm: Partial<Form>) => void
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
  voiceLanguage: VoiceInputVoiceLanguage
  onCalculate: () => void
  errors: Record<string, string>
}

const createCreditRow = (): CreditRow => ({
  id: uuidv4(),
  totalClient: '',
  details: '',
  client: ''
})

const createCreditPayeeRow = (): CreditPayeeRow => ({
  id: uuidv4(),
  totalPayee: '',
  details: '',
  client: ''
})

const createDepenseRow = (): DepenseRow => ({
  id: uuidv4(),
  totalDepense: '',
  details: '',
  client: ''
})

const createRetraitRow = (): RetraitRow => ({
  id: uuidv4(),
  retraitPayee: '',
  retrait: '',
  client: ''
})

const updateCreditRow = (rows: CreditRow[], id: string, field: keyof CreditRow, value: string): CreditRow[] => {
  const newRows = [...rows]
  const index = newRows.findIndex(row => row.id === id)
  if (index !== -1) {
    newRows[index] = { ...newRows[index], [field]: value }
  }
  return newRows
}

const updateCreditPayeeRow = (rows: CreditPayeeRow[], id: string, field: keyof CreditPayeeRow, value: string): CreditPayeeRow[] => {
  const newRows = [...rows]
  const index = newRows.findIndex(row => row.id === id)
  if (index !== -1) {
    newRows[index] = { ...newRows[index], [field]: value }
  }
  return newRows
}

const updateDepenseRow = (rows: DepenseRow[], id: string, field: keyof DepenseRow, value: string): DepenseRow[] => {
  const newRows = [...rows]
  const index = newRows.findIndex(row => row.id === id)
  if (index !== -1) {
    newRows[index] = { ...newRows[index], [field]: value }
  }
  return newRows
}

const updateRetraitRow = (rows: RetraitRow[], id: string, field: keyof RetraitRow, value: string): RetraitRow[] => {
  const newRows = [...rows]
  const index = newRows.findIndex(row => row.id === id)
  if (index !== -1) {
    newRows[index] = { ...newRows[index], [field]: value }
  }
  return newRows
}

export const FormManager: React.FC<FormManagerProps> = ({
  form,
  onUpdateForm,
  onVoiceInput,
  voiceLanguage,
  onCalculate,
  errors
}) => {
  const styles = useStyles()

  const handleUpdateCreditRow = (id: string, field: keyof CreditRow, value: string) => {
    const updatedRows = updateCreditRow(form.creditRows, id, field, value)
    onUpdateForm({ creditRows: updatedRows })
  }

  const handleUpdateCreditPayeeRow = (id: string, field: keyof CreditPayeeRow, value: string) => {
    const updatedRows = updateCreditPayeeRow(form.creditPayeeRows, id, field, value)
    onUpdateForm({ creditPayeeRows: updatedRows })
  }

  const handleUpdateDepenseRow = (id: string, field: keyof DepenseRow, value: string) => {
    const updatedRows = updateDepenseRow(form.depenseRows, id, field, value)
    onUpdateForm({ depenseRows: updatedRows })
  }

  const handleUpdateRetraitRow = (id: string, field: keyof RetraitRow, value: string) => {
    const updatedRows = updateRetraitRow(form.retraitRows, id, field, value)
    onUpdateForm({ retraitRows: updatedRows })
  }

  const handleRemoveCreditRow = (id: string) => {
    const updatedRows = form.creditRows.filter(row => row.id !== id)
    onUpdateForm({ creditRows: updatedRows })
  }

  const handleRemoveCreditPayeeRow = (id: string) => {
    const updatedRows = form.creditPayeeRows.filter(row => row.id !== id)
    onUpdateForm({ creditPayeeRows: updatedRows })
  }

  const handleRemoveDepenseRow = (id: string) => {
    const updatedRows = form.depenseRows.filter(row => row.id !== id)
    onUpdateForm({ depenseRows: updatedRows })
  }

  const handleRemoveRetraitRow = (id: string) => {
    const updatedRows = form.retraitRows.filter(row => row.id !== id)
    onUpdateForm({ retraitRows: updatedRows })
  }

  const handleAddCreditRow = () => {
    onUpdateForm({
      creditRows: [...form.creditRows, createCreditRow()]
    })
  }

  const handleAddCreditPayeeRow = () => {
    onUpdateForm({
      creditPayeeRows: [...form.creditPayeeRows, createCreditPayeeRow()]
    })
  }

  const handleAddDepenseRow = () => {
    onUpdateForm({
      depenseRows: [...form.depenseRows, createDepenseRow()]
    })
  }

  const handleAddRetraitRow = () => {
    onUpdateForm({
      retraitRows: [...form.retraitRows, createRetraitRow()]
    })
  }

  return (
    <div className={styles.formContainer}>
      <FormValidation
        form={form}
        onUpdateForm={onUpdateForm}
        onVoiceInput={onVoiceInput}
        voiceLanguage={voiceLanguage}
        errors={errors}
      />

      <RowManager
        creditRows={form.creditRows}
        creditPayeeRows={form.creditPayeeRows}
        depenseRows={form.depenseRows}
        retraitRows={form.retraitRows}
        onUpdateCreditRow={handleUpdateCreditRow}
        onUpdateCreditPayeeRow={handleUpdateCreditPayeeRow}
        onUpdateDepenseRow={handleUpdateDepenseRow}
        onUpdateRetraitRow={handleUpdateRetraitRow}
        onRemoveCreditRow={handleRemoveCreditRow}
        onRemoveCreditPayeeRow={handleRemoveCreditPayeeRow}
        onRemoveDepenseRow={handleRemoveDepenseRow}
        onRemoveRetraitRow={handleRemoveRetraitRow}
        onAddCreditRow={handleAddCreditRow}
        onAddCreditPayeeRow={handleAddCreditPayeeRow}
        onAddDepenseRow={handleAddDepenseRow}
        onAddRetraitRow={handleAddRetraitRow}
        onVoiceInput={onVoiceInput}
        voiceLanguage={voiceLanguage}
      />

      <FormCalculation
        form={form}
        onCalculate={onCalculate}
      />
    </div>
  )
}
