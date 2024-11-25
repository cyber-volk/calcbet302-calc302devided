'use client'

import React from 'react'
import { Trash2, Plus } from 'lucide-react'
import { animated } from '@react-spring/web'
import { useScaleAnimation } from '../../utils/animationUtils'
import { VoiceInputButton } from './voice/VoiceComponents'
import { Form, VoiceLanguage, CreditRow as CreditRowType, CreditPayeeRow as CreditPayeeRowType, DepenseRow as DepenseRowType, RetraitRow as RetraitRowType } from '../../types/calculator.types'

interface RowProps {
  index: number
  onRemove: () => void
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
  language: VoiceLanguage
  error?: string
}

interface CreditRowProps extends RowProps {
  totalClient: string
  details: string
  client: string
  onTotalClientChange: (value: string) => void
  onDetailsChange: (value: string) => void
  onClientChange: (value: string) => void
}

export function CreditRow({
  index,
  totalClient,
  details,
  client,
  onTotalClientChange,
  onDetailsChange,
  onClientChange,
  onRemove,
  onVoiceInput,
  language,
  error
}: CreditRowProps) {
  const scaleAnimation = useScaleAnimation()

  return (
    <animated.div
      style={scaleAnimation}
      className="flex items-start space-x-4 mb-4"
    >
      <div className="flex-1">
        <input
          type="text"
          value={totalClient}
          onChange={(e) => onTotalClientChange(e.target.value)}
          placeholder="Total Client"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder="Details"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={client}
            onChange={(e) => onClientChange(e.target.value)}
            placeholder="Client"
            className="w-full px-3 py-2 border rounded-md"
          />
          <VoiceInputButton
            onVoiceInput={onVoiceInput}
            language={language}
          />
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
        aria-label="Remove row"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </animated.div>
  )
}

interface CreditPayeeRowProps extends RowProps {
  totalPayee: string
  details: string
  client: string
  onTotalPayeeChange: (value: string) => void
  onDetailsChange: (value: string) => void
  onClientChange: (value: string) => void
}

export function CreditPayeeRow({
  index,
  totalPayee,
  details,
  client,
  onTotalPayeeChange,
  onDetailsChange,
  onClientChange,
  onRemove,
  onVoiceInput,
  language,
  error
}: CreditPayeeRowProps) {
  const scaleAnimation = useScaleAnimation()

  return (
    <animated.div
      style={scaleAnimation}
      className="flex items-start space-x-4 mb-4"
    >
      <div className="flex-1">
        <input
          type="text"
          value={totalPayee}
          onChange={(e) => onTotalPayeeChange(e.target.value)}
          placeholder="Total Payee"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder="Details"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={client}
            onChange={(e) => onClientChange(e.target.value)}
            placeholder="Client"
            className="w-full px-3 py-2 border rounded-md"
          />
          <VoiceInputButton
            onVoiceInput={onVoiceInput}
            language={language}
          />
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
        aria-label="Remove row"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </animated.div>
  )
}

interface DepenseRowProps extends RowProps {
  totalDepense: string
  details: string
  client: string
  onTotalDepenseChange: (value: string) => void
  onDetailsChange: (value: string) => void
  onClientChange: (value: string) => void
}

export function DepenseRow({
  index,
  totalDepense,
  details,
  client,
  onTotalDepenseChange,
  onDetailsChange,
  onClientChange,
  onRemove,
  onVoiceInput,
  language,
  error
}: DepenseRowProps) {
  const scaleAnimation = useScaleAnimation()

  return (
    <animated.div
      style={scaleAnimation}
      className="flex items-start space-x-4 mb-4"
    >
      <div className="flex-1">
        <input
          type="text"
          value={totalDepense}
          onChange={(e) => onTotalDepenseChange(e.target.value)}
          placeholder="Total Depense"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder="Details"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={client}
            onChange={(e) => onClientChange(e.target.value)}
            placeholder="Client"
            className="w-full px-3 py-2 border rounded-md"
          />
          <VoiceInputButton
            onVoiceInput={onVoiceInput}
            language={language}
          />
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
        aria-label="Remove row"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </animated.div>
  )
}

interface RetraitRowProps extends RowProps {
  retraitPayee: string
  retrait: string
  client: string
  onRetraitPayeeChange: (value: string) => void
  onRetraitChange: (value: string) => void
  onClientChange: (value: string) => void
}

export function RetraitRow({
  index,
  retraitPayee,
  retrait,
  client,
  onRetraitPayeeChange,
  onRetraitChange,
  onClientChange,
  onRemove,
  onVoiceInput,
  language,
  error
}: RetraitRowProps) {
  const scaleAnimation = useScaleAnimation()

  return (
    <animated.div
      style={scaleAnimation}
      className="flex items-start space-x-4 mb-4"
    >
      <div className="flex-1">
        <input
          type="text"
          value={retraitPayee}
          onChange={(e) => onRetraitPayeeChange(e.target.value)}
          placeholder="Retrait Payee"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={retrait}
          onChange={(e) => onRetraitChange(e.target.value)}
          placeholder="Retrait"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={client}
            onChange={(e) => onClientChange(e.target.value)}
            placeholder="Client"
            className="w-full px-3 py-2 border rounded-md"
          />
          <VoiceInputButton
            onVoiceInput={onVoiceInput}
            language={language}
          />
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
        aria-label="Remove row"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </animated.div>
  )
}

interface RowContainerProps {
  title: string
  onAddRow: () => void
  children: React.ReactNode
}

export function RowContainer({ title, onAddRow, children }: RowContainerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <button
          onClick={onAddRow}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          aria-label="Add row"
        >
          <Plus className="w-4 h-4" />
          <span>Add Row</span>
        </button>
      </div>
      {children}
    </div>
  )
}

interface RowsProps {
  form: Form
  onUpdate: (form: Form) => void
  voiceLanguage: VoiceLanguage
  handleVoiceInputWithFeedback: (callback: (value: string) => void, isNumberField?: boolean) => void
}

export function RowComponents({
  form,
  onUpdate,
  voiceLanguage,
  handleVoiceInputWithFeedback
}: RowsProps) {
  const handleAddRow = (type: 'credit' | 'creditPayee' | 'depense' | 'retrait') => {
    const newForm = { ...form }
    switch (type) {
      case 'credit':
        newForm.creditRows = [...form.creditRows, { id: Date.now().toString(), totalClient: '', details: '', client: '' }]
        break
      case 'creditPayee':
        newForm.creditPayeeRows = [...form.creditPayeeRows, { id: Date.now().toString(), totalPayee: '', details: '', client: '' }]
        break
      case 'depense':
        newForm.depenseRows = [...form.depenseRows, { id: Date.now().toString(), totalDepense: '', details: '', client: '' }]
        break
      case 'retrait':
        newForm.retraitRows = [...form.retraitRows, { id: Date.now().toString(), retraitPayee: '', retrait: '', client: '' }]
        break
    }
    onUpdate(newForm)
  }

  const handleRemoveRow = (type: 'credit' | 'creditPayee' | 'depense' | 'retrait', index: number) => {
    const newForm = { ...form }
    switch (type) {
      case 'credit':
        newForm.creditRows = form.creditRows.filter((_, i) => i !== index)
        break
      case 'creditPayee':
        newForm.creditPayeeRows = form.creditPayeeRows.filter((_, i) => i !== index)
        break
      case 'depense':
        newForm.depenseRows = form.depenseRows.filter((_, i) => i !== index)
        break
      case 'retrait':
        newForm.retraitRows = form.retraitRows.filter((_, i) => i !== index)
        break
    }
    onUpdate(newForm)
  }

  const handleUpdateRow = (
    type: keyof Form,
    index: number,
    field: string,
    value: string
  ) => {
    const newForm = { ...form }
    const rows = Array.isArray(form[type]) ? [...form[type]] : []
    
    // Type-safe row update
    if (type === 'creditRows') {
      const updatedRows = rows as CreditRowType[]
      updatedRows[index] = { ...updatedRows[index], [field]: value }
      newForm[type] = updatedRows
    } else if (type === 'creditPayeeRows') {
      const updatedRows = rows as CreditPayeeRowType[]
      updatedRows[index] = { ...updatedRows[index], [field]: value }
      newForm[type] = updatedRows
    } else if (type === 'depenseRows') {
      const updatedRows = rows as DepenseRowType[]
      updatedRows[index] = { ...updatedRows[index], [field]: value }
      newForm[type] = updatedRows
    } else if (type === 'retraitRows') {
      const updatedRows = rows as RetraitRowType[]
      updatedRows[index] = { ...updatedRows[index], [field]: value }
      newForm[type] = updatedRows
    }

    onUpdate(newForm)
  }

  return (
    <div className="space-y-8">
      <RowContainer title="Credit" onAddRow={() => handleAddRow('credit')}>
        {form.creditRows.map((row, index) => (
          <CreditRow
            key={row.id}
            index={index}
            {...row}
            onTotalClientChange={(value) => handleUpdateRow('creditRows', index, 'totalClient', value)}
            onDetailsChange={(value) => handleUpdateRow('creditRows', index, 'details', value)}
            onClientChange={(value) => handleUpdateRow('creditRows', index, 'client', value)}
            onRemove={() => handleRemoveRow('credit', index)}
            onVoiceInput={(callback, isNumberField) => handleVoiceInputWithFeedback(callback, isNumberField)}
            language={voiceLanguage}
          />
        ))}
      </RowContainer>

      <RowContainer title="Credit Payee" onAddRow={() => handleAddRow('creditPayee')}>
        {form.creditPayeeRows.map((row, index) => (
          <CreditPayeeRow
            key={row.id}
            index={index}
            {...row}
            onTotalPayeeChange={(value) => handleUpdateRow('creditPayeeRows', index, 'totalPayee', value)}
            onDetailsChange={(value) => handleUpdateRow('creditPayeeRows', index, 'details', value)}
            onClientChange={(value) => handleUpdateRow('creditPayeeRows', index, 'client', value)}
            onRemove={() => handleRemoveRow('creditPayee', index)}
            onVoiceInput={(callback, isNumberField) => handleVoiceInputWithFeedback(callback, isNumberField)}
            language={voiceLanguage}
          />
        ))}
      </RowContainer>

      <RowContainer title="Depense" onAddRow={() => handleAddRow('depense')}>
        {form.depenseRows.map((row, index) => (
          <DepenseRow
            key={row.id}
            index={index}
            {...row}
            onTotalDepenseChange={(value) => handleUpdateRow('depenseRows', index, 'totalDepense', value)}
            onDetailsChange={(value) => handleUpdateRow('depenseRows', index, 'details', value)}
            onClientChange={(value) => handleUpdateRow('depenseRows', index, 'client', value)}
            onRemove={() => handleRemoveRow('depense', index)}
            onVoiceInput={(callback, isNumberField) => handleVoiceInputWithFeedback(callback, isNumberField)}
            language={voiceLanguage}
          />
        ))}
      </RowContainer>

      <RowContainer title="Retrait" onAddRow={() => handleAddRow('retrait')}>
        {form.retraitRows.map((row, index) => (
          <RetraitRow
            key={row.id}
            index={index}
            {...row}
            onRetraitPayeeChange={(value) => handleUpdateRow('retraitRows', index, 'retraitPayee', value)}
            onRetraitChange={(value) => handleUpdateRow('retraitRows', index, 'retrait', value)}
            onClientChange={(value) => handleUpdateRow('retraitRows', index, 'client', value)}
            onRemove={() => handleRemoveRow('retrait', index)}
            onVoiceInput={(callback, isNumberField) => handleVoiceInputWithFeedback(callback, isNumberField)}
            language={voiceLanguage}
          />
        ))}
      </RowContainer>
    </div>
  )
}
