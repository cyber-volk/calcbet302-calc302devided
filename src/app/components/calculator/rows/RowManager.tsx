'use client'

import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CreditRow, CreditPayeeRow, DepenseRow, RetraitRow } from '../../../types/calculator.types'
import { VoiceLanguage } from '../../../types/voice.types'
import { CreditRowComponent } from './CreditRowComponent'
import { CreditPayeeRowComponent } from './CreditPayeeRowComponent'
import { DepenseRowComponent } from './DepenseRowComponent'
import { RetraitRowComponent } from './RetraitRowComponent'

interface RowManagerProps {
  creditRows: CreditRow[]
  creditPayeeRows: CreditPayeeRow[]
  depenseRows: DepenseRow[]
  retraitRows: RetraitRow[]
  onUpdateCreditRow: (id: string, field: keyof CreditRow, value: string) => void
  onUpdateCreditPayeeRow: (id: string, field: keyof CreditPayeeRow, value: string) => void
  onUpdateDepenseRow: (id: string, field: keyof DepenseRow, value: string) => void
  onUpdateRetraitRow: (id: string, field: keyof RetraitRow, value: string) => void
  onRemoveCreditRow: (id: string) => void
  onRemoveCreditPayeeRow: (id: string) => void
  onRemoveDepenseRow: (id: string) => void
  onRemoveRetraitRow: (id: string) => void
  onAddCreditRow: () => void
  onAddCreditPayeeRow: () => void
  onAddDepenseRow: () => void
  onAddRetraitRow: () => void
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
  voiceLanguage: VoiceLanguage
}

export const RowManager: React.FC<RowManagerProps> = ({
  creditRows,
  creditPayeeRows,
  depenseRows,
  retraitRows,
  onUpdateCreditRow,
  onUpdateCreditPayeeRow,
  onUpdateDepenseRow,
  onUpdateRetraitRow,
  onRemoveCreditRow,
  onRemoveCreditPayeeRow,
  onRemoveDepenseRow,
  onRemoveRetraitRow,
  onAddCreditRow,
  onAddCreditPayeeRow,
  onAddDepenseRow,
  onAddRetraitRow,
  onVoiceInput,
  voiceLanguage
}) => {
  return (
    <div className="space-y-8">
      {/* Credit Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Credits</h3>
          <button
            onClick={onAddCreditRow}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Credit
          </button>
        </div>
        <div className="space-y-2">
          {creditRows.map((row) => (
            <CreditRowComponent
              key={row.id}
              row={row}
              onUpdate={(updatedRow) => onUpdateCreditRow(row.id, 'totalClient', updatedRow.totalClient)}
              onRemove={() => onRemoveCreditRow(row.id)}
              onVoiceInput={(callback, isNumberField = false) => onVoiceInput(callback, isNumberField)}
              voiceLanguage={voiceLanguage}
            />
          ))}
        </div>
      </section>

      {/* Credit Payee Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Credit Payee</h3>
          <button
            onClick={onAddCreditPayeeRow}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Credit Payee
          </button>
        </div>
        <div className="space-y-2">
          {creditPayeeRows.map((row) => (
            <CreditPayeeRowComponent
              key={row.id}
              row={row}
              onUpdate={(updatedRow) => onUpdateCreditPayeeRow(row.id, 'totalPayee', updatedRow.totalPayee)}
              onRemove={() => onRemoveCreditPayeeRow(row.id)}
              onVoiceInput={(callback, isNumberField = false) => onVoiceInput(callback, isNumberField)}
              voiceLanguage={voiceLanguage}
            />
          ))}
        </div>
      </section>

      {/* Depense Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Depenses</h3>
          <button
            onClick={onAddDepenseRow}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Add Depense
          </button>
        </div>
        <div className="space-y-2">
          {depenseRows.map((row) => (
            <DepenseRowComponent
              key={row.id}
              row={row}
              onUpdate={(updatedRow) => onUpdateDepenseRow(row.id, 'totalDepense', updatedRow.totalDepense)}
              onRemove={() => onRemoveDepenseRow(row.id)}
              onVoiceInput={(callback, isNumberField = false) => onVoiceInput(callback, isNumberField)}
              voiceLanguage={voiceLanguage}
            />
          ))}
        </div>
      </section>

      {/* Retrait Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Retraits</h3>
          <button
            onClick={onAddRetraitRow}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Add Retrait
          </button>
        </div>
        <div className="space-y-2">
          {retraitRows.map((row) => (
            <RetraitRowComponent
              key={row.id}
              row={row}
              onUpdate={(updatedRow) => onUpdateRetraitRow(row.id, 'retrait', updatedRow.retrait)}
              onRemove={() => onRemoveRetraitRow(row.id)}
              onVoiceInput={(callback, isNumberField = false) => onVoiceInput(callback, isNumberField)}
              voiceLanguage={voiceLanguage}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
