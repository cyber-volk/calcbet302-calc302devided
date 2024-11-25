import React, { useRef, useState } from 'react'
import { animated } from '@react-spring/web'
import { useCalculator } from '../../../hooks/useCalculator'
import { useKeyboardShortcuts, DEFAULT_SHORTCUTS } from '../../../utils/keyboardUtils'
import { useSlideAnimation } from '../../../utils/animationUtils'
import { notify } from '../../../utils/notificationUtils'
import { VoiceInputButton } from '../voice/VoiceComponents'
import { Form, VoiceLanguage, CreditRow, CreditPayeeRow, DepenseRow, RetraitRow } from '../../../types/calculator.types'
import { LanguageSelector, VoiceFeedback } from '../voice/VoiceComponents'
import { SiteCarousel } from '../site/SiteComponents'
import { ExportActions } from '../export/ExportComponents'
import { FormPreview } from '../preview/FormPreview'
import { 
  CreditRow as CreditRowComponent, 
  CreditPayeeRow as CreditPayeeRowComponent, 
  DepenseRow as DepenseRowComponent, 
  RetraitRow as RetraitRowComponent 
} from '../RowComponents'
import { v4 as uuidv4 } from 'uuid'

interface CalculatorFormProps {
  initialForm?: Form
  onSubmit?: (result: string) => void
  onNew?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onClear?: () => void
  className?: string
}

const defaultForm: Form = {
  id: uuidv4(),
  result: '',
  timestamp: new Date().toISOString(),
  calculationHistory: [],
  creditRows: [],
  creditPayeeRows: [],
  depenseRows: [],
  retraitRows: [],
  fond: '',
  soldeALinstant: '',
  soldeDeDebut: '',
  site: '',
  multiplier: '',
  siteColor: 'none'
}

export function CalculatorForm({
  initialForm = defaultForm,
  onSubmit,
  onNew,
  onUndo,
  onRedo,
  onClear,
  className = ''
}: CalculatorFormProps) {
  const [form, setForm] = useState<Form>(initialForm)
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceLanguage>('none')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleVoiceInput = (callback: (value: string) => void, isNumberField?: boolean) => {
    // Voice input handling logic
  }

  const handleUpdateCreditRow = (updatedRow: CreditRow) => {
    setForm(prev => ({
      ...prev,
      creditRows: prev.creditRows.map(row => 
        row.id === updatedRow.id ? updatedRow : row
      )
    }))
  }

  const handleUpdateCreditPayeeRow = (updatedRow: CreditPayeeRow) => {
    setForm(prev => ({
      ...prev,
      creditPayeeRows: prev.creditPayeeRows.map(row => 
        row.id === updatedRow.id ? updatedRow : row
      )
    }))
  }

  const handleUpdateDepenseRow = (updatedRow: DepenseRow) => {
    setForm(prev => ({
      ...prev,
      depenseRows: prev.depenseRows.map(row => 
        row.id === updatedRow.id ? updatedRow : row
      )
    }))
  }

  const handleUpdateRetraitRow = (updatedRow: RetraitRow) => {
    setForm(prev => ({
      ...prev,
      retraitRows: prev.retraitRows.map(row => 
        row.id === updatedRow.id ? updatedRow : row
      )
    }))
  }

  const handleRemoveCreditRow = (id: string) => {
    setForm(prev => ({
      ...prev,
      creditRows: prev.creditRows.filter(r => r.id !== id)
    }))
  }

  const handleRemoveCreditPayeeRow = (id: string) => {
    setForm(prev => ({
      ...prev,
      creditPayeeRows: prev.creditPayeeRows.filter(r => r.id !== id)
    }))
  }

  const handleRemoveDepenseRow = (id: string) => {
    setForm(prev => ({
      ...prev,
      depenseRows: prev.depenseRows.filter(r => r.id !== id)
    }))
  }

  const handleRemoveRetraitRow = (id: string) => {
    setForm(prev => ({
      ...prev,
      retraitRows: prev.retraitRows.filter(r => r.id !== id)
    }))
  }

  const {
    multiplier,
    fond,
    soldeALinstant,
    soldeDeDebut,
    creditRows,
    creditPayeeRows,
    depenseRows,
    retraitRows,
    result,
    errors: calculatorErrors,
    voiceLanguage: calculatorVoiceLanguage,
    setMultiplier,
    setFond,
    setSoldeALinstant,
    setSoldeDeDebut,
    setCreditRows,
    setCreditPayeeRows,
    setDepenseRows,
    setRetraitRows,
    handleCalculate,
    handleVoiceInputWithFeedback,
    handleReset,
    addRow,
    removeRow,
  } = useCalculator()

  const formRef = useRef<HTMLDivElement>(null)
  const [isListening, setIsListening] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)
  const [newVoiceLanguage, setNewVoiceLanguage] = useState<VoiceLanguage>('none')

  const handleAddRow = (tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait') => {
    switch (tableType) {
      case 'credit':
        setForm(prev => ({
          ...prev,
          creditRows: [...prev.creditRows, { 
            id: uuidv4(), 
            totalClient: '', 
            details: '', 
            client: '' 
          }]
        }))
        break
      case 'creditPayee':
        setForm(prev => ({
          ...prev,
          creditPayeeRows: [...prev.creditPayeeRows, { 
            id: uuidv4(), 
            totalPayee: '', 
            details: '', 
            client: '' 
          }]
        }))
        break
      case 'depense':
        setForm(prev => ({
          ...prev,
          depenseRows: [...prev.depenseRows, { 
            id: uuidv4(), 
            totalDepense: '', 
            details: '', 
            client: '' 
          }]
        }))
        break
      case 'retrait':
        setForm(prev => ({
          ...prev,
          retraitRows: [...prev.retraitRows, { 
            id: uuidv4(), 
            retraitPayee: '', 
            retrait: '', 
            client: '' 
          }]
        }))
        break
      default:
        break
    }
  }

  const handleUpdateRow = (
    tableType: keyof Pick<Form, 'creditRows' | 'creditPayeeRows' | 'depenseRows' | 'retraitRows'>, 
    index: number, 
    field: string, 
    value: string
  ) => {
    switch (tableType) {
      case 'creditRows':
        setForm(prev => ({
          ...prev,
          creditRows: prev.creditRows.map((row, idx) => 
            idx === index ? { ...row, [field]: value } : row
          )
        }))
        break
      case 'creditPayeeRows':
        setForm(prev => ({
          ...prev,
          creditPayeeRows: prev.creditPayeeRows.map((row, idx) => 
            idx === index ? { ...row, [field]: value } : row
          )
        }))
        break
      case 'depenseRows':
        setForm(prev => ({
          ...prev,
          depenseRows: prev.depenseRows.map((row, idx) => 
            idx === index ? { ...row, [field]: value } : row
          )
        }))
        break
      case 'retraitRows':
        setForm(prev => ({
          ...prev,
          retraitRows: prev.retraitRows.map((row, idx) => 
            idx === index ? { ...row, [field]: value } : row
          )
        }))
        break
    }
  }

  const handleRemoveRow = (
    tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait', 
    index: number
  ) => {
    switch (tableType) {
      case 'credit':
        setForm(prev => ({
          ...prev,
          creditRows: prev.creditRows.filter((row, i) => i !== index)
        }))
        break
      case 'creditPayee':
        setForm(prev => ({
          ...prev,
          creditPayeeRows: prev.creditPayeeRows.filter((row, i) => i !== index)
        }))
        break
      case 'depense':
        setForm(prev => ({
          ...prev,
          depenseRows: prev.depenseRows.filter((row, i) => i !== index)
        }))
        break
      case 'retrait':
        setForm(prev => ({
          ...prev,
          retraitRows: prev.retraitRows.filter((row, i) => i !== index)
        }))
        break
      default:
        break
    }
  }

  // Initial rows with IDs
  const [creditRowsState, setCreditRowsState] = useState(form.creditRows)
  const [creditPayeeRowsState, setCreditPayeeRowsState] = useState(form.creditPayeeRows)
  const [depenseRowsState, setDepenseRowsState] = useState(form.depenseRows)
  const [retraitRowsState, setRetraitRowsState] = useState(form.retraitRows)

  // Load initial form if provided
  React.useEffect(() => {
    if (initialForm) {
      setMultiplier(initialForm.multiplier || defaultForm.multiplier)
      setFond(initialForm.fond || defaultForm.fond)
      setSoldeALinstant(initialForm.soldeALinstant || defaultForm.soldeALinstant)
      setSoldeDeDebut(initialForm.soldeDeDebut || defaultForm.soldeDeDebut)
      setCreditRowsState(initialForm.creditRows?.length ? initialForm.creditRows : defaultForm.creditRows)
      setCreditPayeeRowsState(initialForm.creditPayeeRows?.length ? initialForm.creditPayeeRows : defaultForm.creditPayeeRows)
      setDepenseRowsState(initialForm.depenseRows?.length ? initialForm.depenseRows : defaultForm.depenseRows)
      setRetraitRowsState(initialForm.retraitRows?.length ? initialForm.retraitRows : defaultForm.retraitRows)
    }
  }, [initialForm])

  // Setup keyboard shortcuts
  useKeyboardShortcuts([
    ...DEFAULT_SHORTCUTS,
    {
      key: 'Enter',
      ctrlKey: true,
      action: () => handleCalculate(new Event('submit') as any),
      description: 'Calculate Result'
    }
  ])

  // Animation
  const slideAnimation = useSlideAnimation('right')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCalculate(e)
    if (onSubmit && result) {
      onSubmit(result)
    }
  }

  const formState: Form = {
    id: uuidv4(),
    result: result,
    calculationHistory: [],
    creditRows: creditRowsState,
    creditPayeeRows: creditPayeeRowsState,
    depenseRows: depenseRowsState,
    retraitRows: retraitRowsState,
    fond: fond,
    soldeALinstant: soldeALinstant,
    soldeDeDebut: soldeDeDebut,
    site: '',
    multiplier: multiplier,
    timestamp: new Date().toISOString(),
    siteColor: 'none'
  }

  return (
    <div className={`calculator-form ${className}`}>
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <LanguageSelector
            selectedLanguage={newVoiceLanguage}
            onLanguageChange={setNewVoiceLanguage}
          />
          <ExportActions 
            formRef={formRef}
            form={form}
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onUndo}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Undo
          </button>
          <button
            onClick={onRedo}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Redo
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Form Content */}
      <animated.form
        onSubmit={handleSubmit}
        className={`space-y-6 ${className}`}
        style={slideAnimation}
      >
        {/* Multiplier Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Multiplier
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              step="0.1"
              min="1"
              max="2"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <VoiceInputButton
              onVoiceInput={handleVoiceInput}
              language={newVoiceLanguage}
              isNumberField={false}
            />
          </div>
        </div>

        {/* Main Input Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fond
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                value={fond}
                onChange={(e) => setFond(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <VoiceInputButton
                onVoiceInput={handleVoiceInput}
                language={newVoiceLanguage}
                isNumberField={false}
              />
            </div>
            {calculatorErrors.fond && (
              <p className="mt-1 text-sm text-red-600">{calculatorErrors.fond}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Solde à l'instant
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                value={soldeALinstant}
                onChange={(e) => setSoldeALinstant(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <VoiceInputButton
                onVoiceInput={handleVoiceInput}
                language={newVoiceLanguage}
                isNumberField={false}
              />
            </div>
            {calculatorErrors.soldeALinstant && (
              <p className="mt-1 text-sm text-red-600">{calculatorErrors.soldeALinstant}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Solde de début
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                value={soldeDeDebut}
                onChange={(e) => setSoldeDeDebut(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <VoiceInputButton
                onVoiceInput={handleVoiceInput}
                language={newVoiceLanguage}
                isNumberField={false}
              />
            </div>
            {calculatorErrors.soldeDeDebut && (
              <p className="mt-1 text-sm text-red-600">{calculatorErrors.soldeDeDebut}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="reset"
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <p className="text-lg font-medium text-green-800">{result}</p>
          </div>
        )}
      </animated.form>

      {/* Row Components */}
      <div className="form-rows">
        {form.creditRows.map((row, index) => (
          <CreditRowComponent
            key={row.id}
            index={index}
            totalClient={row.totalClient}
            details={row.details}
            client={row.client}
            onTotalClientChange={(value) => {
              setForm(prev => ({
                ...prev,
                creditRows: prev.creditRows.map(r => 
                  r.id === row.id ? { ...r, totalClient: value } : r
                )
              }))
            }}
            onDetailsChange={(value) => {
              setForm(prev => ({
                ...prev,
                creditRows: prev.creditRows.map(r => 
                  r.id === row.id ? { ...r, details: value } : r
                )
              }))
            }}
            onClientChange={(value) => {
              setForm(prev => ({
                ...prev,
                creditRows: prev.creditRows.map(r => 
                  r.id === row.id ? { ...r, client: value } : r
                )
              }))
            }}
            onRemove={() => handleRemoveCreditRow(row.id)}
            onVoiceInput={handleVoiceInput}
            language={newVoiceLanguage}
          />
        ))}

        {form.creditPayeeRows.map((row, index) => (
          <CreditPayeeRowComponent
            key={row.id}
            index={index}
            totalPayee={row.totalPayee}
            details={row.details}
            client={row.client}
            onTotalPayeeChange={(value) => {
              setForm(prev => ({
                ...prev,
                creditPayeeRows: prev.creditPayeeRows.map(r => 
                  r.id === row.id ? { ...r, totalPayee: value } : r
                )
              }))
            }}
            onDetailsChange={(value) => {
              setForm(prev => ({
                ...prev,
                creditPayeeRows: prev.creditPayeeRows.map(r => 
                  r.id === row.id ? { ...r, details: value } : r
                )
              }))
            }}
            onClientChange={(value) => {
              setForm(prev => ({
                ...prev,
                creditPayeeRows: prev.creditPayeeRows.map(r => 
                  r.id === row.id ? { ...r, client: value } : r
                )
              }))
            }}
            onRemove={() => handleRemoveCreditPayeeRow(row.id)}
            onVoiceInput={handleVoiceInput}
            language={newVoiceLanguage}
          />
        ))}
        
        {form.depenseRows.map((row, index) => (
          <DepenseRowComponent
            key={row.id}
            index={index}
            totalDepense={row.totalDepense}
            details={row.details}
            client={row.client}
            onTotalDepenseChange={(value) => {
              setForm(prev => ({
                ...prev,
                depenseRows: prev.depenseRows.map(r => 
                  r.id === row.id ? { ...r, totalDepense: value } : r
                )
              }))
            }}
            onDetailsChange={(value) => {
              setForm(prev => ({
                ...prev,
                depenseRows: prev.depenseRows.map(r => 
                  r.id === row.id ? { ...r, details: value } : r
                )
              }))
            }}
            onClientChange={(value) => {
              setForm(prev => ({
                ...prev,
                depenseRows: prev.depenseRows.map(r => 
                  r.id === row.id ? { ...r, client: value } : r
                )
              }))
            }}
            onRemove={() => handleRemoveDepenseRow(row.id)}
            onVoiceInput={handleVoiceInput}
            language={newVoiceLanguage}
          />
        ))}
        
        {form.retraitRows.map((row, index) => (
          <RetraitRowComponent
            key={row.id}
            index={index}
            retraitPayee={row.retraitPayee}
            retrait={row.retrait}
            client={row.client}
            onRetraitPayeeChange={(value) => {
              setForm(prev => ({
                ...prev,
                retraitRows: prev.retraitRows.map(r => 
                  r.id === row.id ? { ...r, retraitPayee: value } : r
                )
              }))
            }}
            onRetraitChange={(value) => {
              setForm(prev => ({
                ...prev,
                retraitRows: prev.retraitRows.map(r => 
                  r.id === row.id ? { ...r, retrait: value } : r
                )
              }))
            }}
            onClientChange={(value) => {
              setForm(prev => ({
                ...prev,
                retraitRows: prev.retraitRows.map(r => 
                  r.id === row.id ? { ...r, client: value } : r
                )
              }))
            }}
            onRemove={() => handleRemoveRetraitRow(row.id)}
            onVoiceInput={handleVoiceInput}
            language={newVoiceLanguage}
          />
        ))}
      </div>

      {/* Preview and Export Actions */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>

        <ExportActions 
          formRef={formRef}
          form={form}
        />
      </div>

      {/* Form Preview */}
      {showPreview && (
        <div className="mt-6">
          <FormPreview 
            form={form}
            onClose={() => setShowPreview(false)}
            onRestore={() => {/* Implement restore logic */}}
            onNavigate={(direction) => {/* Implement navigate logic */}}
            isFirstForm={false}
            isLastForm={false}
            siteColor={form.siteColor || 'blue'}
            removeRow={(tableType, index) => {
              switch (tableType) {
                case 'credit':
                  setForm(prev => ({
                    ...prev,
                    creditRows: prev.creditRows.filter((_, i) => i !== index)
                  }))
                  break
                case 'creditPayee':
                  setForm(prev => ({
                    ...prev,
                    creditPayeeRows: prev.creditPayeeRows.filter((_, i) => i !== index)
                  }))
                  break
                case 'depense':
                  setForm(prev => ({
                    ...prev,
                    depenseRows: prev.depenseRows.filter((_, i) => i !== index)
                  }))
                  break
                case 'retrait':
                  setForm(prev => ({
                    ...prev,
                    retraitRows: prev.retraitRows.filter((_, i) => i !== index)
                  }))
                  break
              }
            }}
            updateRow={(tableType, index, field, value) => {
              switch (tableType) {
                case 'credit':
                  setForm(prev => ({
                    ...prev,
                    creditRows: prev.creditRows.map((row, i) => 
                      i === index ? { ...row, [field]: value } : row
                    )
                  }))
                  break
                case 'creditPayee':
                  setForm(prev => ({
                    ...prev,
                    creditPayeeRows: prev.creditPayeeRows.map((row, i) => 
                      i === index ? { ...row, [field]: value } : row
                    )
                  }))
                  break
                case 'depense':
                  setForm(prev => ({
                    ...prev,
                    depenseRows: prev.depenseRows.map((row, i) => 
                      i === index ? { ...row, [field]: value } : row
                    )
                  }))
                  break
                case 'retrait':
                  setForm(prev => ({
                    ...prev,
                    retraitRows: prev.retraitRows.map((row, i) => 
                      i === index ? { ...row, [field]: value } : row
                    )
                  }))
                  break
              }
            }}
            handleVoiceInputWithFeedback={handleVoiceInput}
            voiceLanguage={newVoiceLanguage}
            addRow={handleAddRow}
          />
        </div>
      )}
    </div>
  )
}
