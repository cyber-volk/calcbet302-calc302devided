'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Mic } from 'lucide-react'
import { Form, CreditRow, CreditPayeeRow, DepenseRow, RetraitRow, RowField, SiteColor, VoiceLanguage } from '../../../types/calculator.types'
import { VoiceInputButton } from '../voice/VoiceComponents'
import { SITE_COLORS } from '../../../utils/constants'

interface RowComponentProps {
  row: CreditRow | CreditPayeeRow | DepenseRow | RetraitRow
  onUpdate: (field: string, value: string) => void
  onDelete: () => void
  showVoiceInput?: boolean
  voiceLanguage: VoiceLanguage
  handleVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
}

export function FormRow({ row, onUpdate, onDelete, showVoiceInput = true, voiceLanguage, handleVoiceInput }: RowComponentProps) {
  const getInputs = () => {
    if ('totalClient' in row) {
      return [
        { label: 'Total Client', value: row.totalClient, field: 'totalClient', isNumber: true },
        { label: 'Details', value: row.details, field: 'details', isNumber: false },
        { label: 'Client', value: row.client, field: 'client', isNumber: false },
      ]
    } else if ('totalPayee' in row) {
      return [
        { label: 'Total Payee', value: row.totalPayee, field: 'totalPayee', isNumber: true },
        { label: 'Details', value: row.details, field: 'details', isNumber: false },
        { label: 'Client', value: row.client, field: 'client', isNumber: false },
      ]
    } else if ('totalDepense' in row) {
      return [
        { label: 'Total Depense', value: row.totalDepense, field: 'totalDepense', isNumber: true },
        { label: 'Details', value: row.details, field: 'details', isNumber: false },
        { label: 'Client', value: row.client, field: 'client', isNumber: false },
      ]
    } else {
      return [
        { label: 'Retrait Payee', value: row.retraitPayee, field: 'retraitPayee', isNumber: true },
        { label: 'Retrait', value: row.retrait, field: 'retrait', isNumber: true },
        { label: 'Client', value: row.client, field: 'client', isNumber: false },
      ]
    }
  }

  return (
    <div className="flex items-center space-x-4 mb-2">
      {getInputs().map((input, index) => (
        <div key={input.field} className="flex-1">
          <div className="flex items-center space-x-2">
            <input
              type={input.isNumber ? 'number' : 'text'}
              value={input.value}
              onChange={(e) => onUpdate(input.field, e.target.value)}
              placeholder={input.label}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showVoiceInput && (
              <VoiceInputButton
                onVoiceInput={() => {}}
                language={voiceLanguage}
                isNumberField={false}
              />
            )}
          </div>
        </div>
      ))}
      <button
        onClick={onDelete}
        className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}

interface FormPreviewProps {
  form: Form
  onClose: () => void
  onRestore: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  isFirstForm: boolean
  isLastForm: boolean
  siteColor: SiteColor
  removeRow: (tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait', index: number) => void
  updateRow: (tableType: keyof RowField, index: number, field: RowField[typeof tableType], value: string) => void
  handleVoiceInputWithFeedback: (callback: (value: string) => void, isNumberField?: boolean) => void
  voiceLanguage: VoiceLanguage
  addRow: (tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait') => void
}

export function FormPreview(props: FormPreviewProps) {
  const {
    form,
    onClose,
    onRestore,
    onNavigate,
    isFirstForm,
    isLastForm,
    siteColor,
    removeRow,
    updateRow,
    handleVoiceInputWithFeedback,
    voiceLanguage,
    addRow,
  } = props

  return (
    <div className={`p-6 ${SITE_COLORS[siteColor].bg} rounded-lg shadow-lg`}>
      <div className="space-y-6">
        {/* Credit Rows */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Credit Rows</h3>
          {form.creditRows.map((row, index) => (
            <FormRow
              key={row.id}
              row={row}
              onUpdate={(field, value) => updateRow('credit', index, field as keyof CreditRow, value)}
              onDelete={() => removeRow('credit', index)}
              voiceLanguage={voiceLanguage}
              handleVoiceInput={handleVoiceInputWithFeedback}
            />
          ))}
          <button
            onClick={() => addRow('credit')}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Credit Row</span>
          </button>
        </div>

        {/* Credit Payee Rows */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Credit Payee Rows</h3>
          {form.creditPayeeRows.map((row, index) => (
            <FormRow
              key={row.id}
              row={row}
              onUpdate={(field, value) => updateRow('creditPayee', index, field as keyof CreditPayeeRow, value)}
              onDelete={() => removeRow('creditPayee', index)}
              voiceLanguage={voiceLanguage}
              handleVoiceInput={handleVoiceInputWithFeedback}
            />
          ))}
          <button
            onClick={() => addRow('creditPayee')}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Credit Payee Row</span>
          </button>
        </div>

        {/* Depense Rows */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Depense Rows</h3>
          {form.depenseRows.map((row, index) => (
            <FormRow
              key={row.id}
              row={row}
              onUpdate={(field, value) => updateRow('depense', index, field as keyof DepenseRow, value)}
              onDelete={() => removeRow('depense', index)}
              voiceLanguage={voiceLanguage}
              handleVoiceInput={handleVoiceInputWithFeedback}
            />
          ))}
          <button
            onClick={() => addRow('depense')}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Depense Row</span>
          </button>
        </div>

        {/* Retrait Rows */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Retrait Rows</h3>
          {form.retraitRows.map((row, index) => (
            <FormRow
              key={row.id}
              row={row}
              onUpdate={(field, value) => updateRow('retrait', index, field as keyof RetraitRow, value)}
              onDelete={() => removeRow('retrait', index)}
              voiceLanguage={voiceLanguage}
              handleVoiceInput={handleVoiceInputWithFeedback}
            />
          ))}
          <button
            onClick={() => addRow('retrait')}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Retrait Row</span>
          </button>
        </div>
      </div>
    </div>
  )
}
