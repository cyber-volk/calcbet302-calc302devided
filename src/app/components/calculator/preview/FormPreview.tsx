'use client'

import React from 'react'
import { ChevronLeft, ChevronRight, X, Trash2, Mic } from 'lucide-react'
import { Form, RowField, VoiceLanguage, SiteColor } from '../../../types/calculator.types'
import { SITE_COLORS } from '../../../utils/constants'
import { VoiceInputButton } from '../voice/VoiceComponents'

interface FormPreviewProps {
  form: Form
  onClose: () => void
  onRestore: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  isFirstForm: boolean
  isLastForm: boolean
  siteColor: SiteColor
  removeRow: (
    tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait',
    index: number
  ) => void
  updateRow: (
    tableType: keyof RowField,
    index: number,
    field: RowField[typeof tableType],
    value: string
  ) => void
  handleVoiceInputWithFeedback: (
    callback: (value: string) => void,
    isNumberField?: boolean
  ) => void
  voiceLanguage: VoiceLanguage
  addRow: (
    tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait'
  ) => void
}

export function FormPreview({
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
  addRow
}: FormPreviewProps) {
  const colorClasses = SITE_COLORS[siteColor]

  const renderRow = (
    row: any,
    index: number,
    type: 'credit' | 'creditPayee' | 'depense' | 'retrait'
  ) => {
    const fields = Object.keys(row).filter((key) => key !== 'id')

    return (
      <div
        key={index}
        className="flex items-center space-x-4 p-2 bg-white rounded-lg shadow-sm"
      >
        {fields.map((field) => (
          <div key={field} className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              {field}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                value={row[field]}
                onChange={(e) =>
                  updateRow(
                    type as keyof RowField,
                    index,
                    field as any,
                    e.target.value
                  )
                }
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <VoiceInputButton
                onVoiceInput={() =>
                  handleVoiceInputWithFeedback(
                    (value) =>
                      updateRow(
                        type as keyof RowField,
                        index,
                        field as any,
                        value
                      ),
                    field.includes('total') || field.includes('retrait')
                  )
                }
                language={voiceLanguage}
                isNumberField={field.includes('total') || field.includes('retrait')}
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => removeRow(type, index)}
          className="p-2 text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className={`p-6 ${colorClasses.bg} rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Form Preview</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('prev')}
            disabled={isFirstForm}
            className={`p-2 rounded-full ${
              isFirstForm
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            disabled={isLastForm}
            className={`p-2 rounded-full ${
              isLastForm
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Credit Rows */}
        <div>
          <h3 className="text-lg font-medium mb-2">Credit</h3>
          <div className="space-y-2">
            {form.creditRows.map((row, index) =>
              renderRow(row, index, 'credit')
            )}
            <button
              onClick={() => addRow('credit')}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Credit Row
            </button>
          </div>
        </div>

        {/* Credit Payee Rows */}
        <div>
          <h3 className="text-lg font-medium mb-2">Credit Payee</h3>
          <div className="space-y-2">
            {form.creditPayeeRows.map((row, index) =>
              renderRow(row, index, 'creditPayee')
            )}
            <button
              onClick={() => addRow('creditPayee')}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Credit Payee Row
            </button>
          </div>
        </div>

        {/* Depense Rows */}
        <div>
          <h3 className="text-lg font-medium mb-2">Depense</h3>
          <div className="space-y-2">
            {form.depenseRows.map((row, index) =>
              renderRow(row, index, 'depense')
            )}
            <button
              onClick={() => addRow('depense')}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Depense Row
            </button>
          </div>
        </div>

        {/* Retrait Rows */}
        <div>
          <h3 className="text-lg font-medium mb-2">Retrait</h3>
          <div className="space-y-2">
            {form.retraitRows.map((row, index) =>
              renderRow(row, index, 'retrait')
            )}
            <button
              onClick={() => addRow('retrait')}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Retrait Row
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onRestore}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Restore This Form
          </button>
        </div>
      </div>
    </div>
  )
}
