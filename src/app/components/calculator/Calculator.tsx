'use client'

import React, { useState } from 'react'
import { useSpring } from '@react-spring/web'
import { FormManager } from './form/FormManager'
import { useFormState } from '../../hooks/useFormState'
import { useSiteState } from '../../hooks/useSiteState'
import { useCalculationState } from '../../hooks/useCalculationState'
import { useVoiceInput } from '../../hooks/useVoiceInput'
import { processFormVoiceInput } from '../../utils/formVoiceInput'
import { CalculationProcessor, ResultDisplay } from './calculation/CalculationComponents'
import { CalculationStats } from './calculation/CalculationStats'
import { CalculationHistory } from './calculation/CalculationHistory'
import type { Form as VoiceForm, VoiceLanguage as VoiceInputVoiceLanguage } from '../../types/voice.types'
import type { Form } from '../../types/calculator.types'

interface CalculatorProps {
  initialForm?: Form;
  onFormUpdate?: (form: Form) => void;
  readOnly?: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({
  initialForm,
  onFormUpdate,
  readOnly = false
}) => {
  // State Management
  const {
    sites,
    currentSiteIndex,
    currentFormIndex,
    setCurrentSiteIndex,
    setCurrentFormIndex,
    updateForm: updateSiteForm
  } = useSiteState()

  const currentSite = sites[currentSiteIndex]
  const currentForm = initialForm || currentSite?.forms[currentFormIndex] || {
    id: '1',
    result: '',
    timestamp: new Date().toISOString(),
    creditRows: [{ totalClient: '', details: '', client: '' }],
    creditPayeeRows: [{ totalPayee: '', details: '', client: '' }],
    depenseRows: [{ totalDepense: '', details: '', client: '' }],
    retraitRows: [{ retraitPayee: '', retrait: '', client: '' }],
    fond: '',
    soldeALinstant: '',
    soldeDeDebut: '',
    site: currentSite?.name || 'Default Site',
    multiplier: '1.1',
    calculationHistory: []
  }

  const {
    form,
    errors,
    validateInput,
    updateForm,
    resetForm
  } = useFormState(currentForm)

  const { calculateResult } = useCalculationState(form, updateForm)

  // Voice Input
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceInputVoiceLanguage>('none')
  const { startListening, stopListening, isListening } = useVoiceInput(voiceLanguage, (transcript) => {
    processFormVoiceInput(transcript, form, updateForm)
  })

  // Animation
  const containerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 }
  })

  // Event Handlers
  const handleFormUpdate = (updatedForm: Partial<Form>) => {
    updateForm(updatedForm)
    if (onFormUpdate) onFormUpdate(updatedForm as Form)
    updateSiteForm(currentSiteIndex, currentFormIndex, updatedForm)
  }

  const handleCalculate = () => {
    const validatedSoldeDeDebut = validateInput(form.soldeDeDebut, 'soldeDeDebut', true)
    if (validatedSoldeDeDebut === null) return

    calculateResult()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FormManager
          form={form}
          onUpdateForm={handleFormUpdate}
          onVoiceInput={startListening}
          voiceLanguage={voiceLanguage}
          onCalculate={handleCalculate}
          errors={errors}
          readOnly={readOnly}
        />
      </main>
    </div>
  )
}

export default Calculator;
