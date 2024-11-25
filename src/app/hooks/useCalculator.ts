'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Form, Site, VoiceLanguage, ErrorKeys, Errors, SpeechRecognition } from '../types/calculator.types'
import { processVoiceInput } from '../utils/voiceUtils'
import { v4 as uuidv4 } from 'uuid'

const initialCreditRow = {
  id: uuidv4(),
  totalClient: '',
  details: '',
  client: ''
}

const initialCreditPayeeRow = {
  id: uuidv4(),
  totalPayee: '',
  details: '',
  client: ''
}

const initialDepenseRow = {
  id: uuidv4(),
  totalDepense: '',
  details: '',
  client: ''
}

const initialRetraitRow = {
  id: uuidv4(),
  retraitPayee: '',
  retrait: '',
  client: ''
}

export function useCalculator() {
  // State declarations
  const [mounted, setMounted] = useState(false)
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceLanguage>('fr-FR')
  const [multiplier, setMultiplier] = useState('1.1')
  const [fond, setFond] = useState('')
  const [soldeALinstant, setSoldeALinstant] = useState('')
  const [site, setSite] = useState('')
  const [soldeDeDebut, setSoldeDeDebut] = useState('')
  const [creditRows, setCreditRows] = useState([initialCreditRow])
  const [creditPayeeRows, setCreditPayeeRows] = useState([initialCreditPayeeRow])
  const [depenseRows, setDepenseRows] = useState([initialDepenseRow])
  const [retraitRows, setRetraitRows] = useState([initialRetraitRow])
  const [result, setResult] = useState('')
  const [errors, setErrors] = useState<Errors>({
    fond: '',
    soldeALinstant: '',
    soldeDeDebut: '',
    credit: '',
    creditPayee: '',
    depense: '',
    retrait: ''
  })

  // LocalStorage hooks
  const [sites, setSites] = useLocalStorage<Site[]>('calculator-sites', [
    {
      id: '1',
      name: 'Default Site',
      color: 'none',
      forms: [{
        id: '1',
        result: '',
        timestamp: new Date().toISOString(),
        creditRows: [initialCreditRow],
        creditPayeeRows: [initialCreditPayeeRow],
        depenseRows: [initialDepenseRow],
        retraitRows: [initialRetraitRow],
        fond: '',
        soldeALinstant: '',
        soldeDeDebut: '',
        site: 'Default Site',
        multiplier: '1.1',
        siteColor: 'none',
        calculationHistory: []
      }],
      statistics: {
        lastUpdated: new Date().toISOString()
      }
    }
  ])
  const [currentSiteIndex, setCurrentSiteIndex] = useLocalStorage('current-site-index', 0)
  const [currentFormIndex, setCurrentFormIndex] = useLocalStorage('current-form-index', 0)

  // Validation function
  const validateInput = (value: string, errorKey: ErrorKeys, isMandatory = false) => {
    let parsedValue: number | null = null
    const newErrors = { ...errors }

    if (errorKey === 'soldeALinstant' || errorKey === 'soldeDeDebut') {
      const numbers = value.split('+').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
      parsedValue = numbers.reduce((acc, num) => acc + num, 0)
    } else {
      parsedValue = parseFloat(value)
    }

    if (value === '' && !isMandatory) {
      newErrors[errorKey] = ''
      setErrors(newErrors)
      return 0
    } else if (isMandatory && (value === '' || parsedValue === 0 || isNaN(parsedValue))) {
      newErrors[errorKey] = 'svp insérer un solde de début'
      setErrors(newErrors)
      return null
    } else if (isNaN(parsedValue)) {
      newErrors[errorKey] = 'Please enter a valid number'
      setErrors(newErrors)
      return null
    }

    newErrors[errorKey] = ''
    setErrors(newErrors)
    return parsedValue
  }

  // Calculation function
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const validatedSoldeALinstant = validateInput(soldeALinstant, 'soldeALinstant') || 0
    const validatedFond = validateInput(fond, 'fond') || 0
    const validatedSoldeDeDebut = validateInput(soldeDeDebut, 'soldeDeDebut', true)

    if (validatedSoldeDeDebut === null) return

    const totalRetrait = retraitRows.reduce((total, row) => 
      total + parseFloat(row.retrait || '0'), 0)
    const totalRetraitPayee = retraitRows.reduce((total, row) => {
      if (row.retraitPayee === 'OK') {
        return total + parseFloat(row.retrait || '0')
      }
      return total + parseFloat(row.retraitPayee || '0')
    }, 0)

    const totalCredit = creditRows.reduce((total, row) => 
      total + parseFloat(row.totalClient || '0'), 0)
    const totalCreditPayee = creditPayeeRows.reduce((total, row) => 
      total + parseFloat(row.totalPayee || '0'), 0)
    const totalDepense = depenseRows.reduce((total, row) => 
      total + parseFloat(row.totalDepense || '0'), 0)
    const selectedMultiplier = parseFloat(multiplier)

    const total = ((validatedSoldeDeDebut + totalRetrait) - validatedSoldeALinstant) * selectedMultiplier - totalRetraitPayee - totalDepense - totalCredit + totalCreditPayee + validatedFond

    const newResult = `Total: ${total.toFixed(1)}`
    setResult(newResult)

    // Create history entry
    const historyEntry = createHistoryEntry({
      id: sites[currentSiteIndex].forms[currentFormIndex].id,
      result: newResult,
      timestamp: new Date().toISOString(),
      creditRows: creditRows.map(row => ({...row})),
      creditPayeeRows: creditPayeeRows.map(row => ({...row})),
      depenseRows: depenseRows.map(row => ({...row})),
      retraitRows: retraitRows.map(row => ({...row})),
      fond,
      soldeALinstant,
      soldeDeDebut,
      site: sites[currentSiteIndex].name,
      multiplier,
      siteColor: sites[currentSiteIndex].color,
      calculationHistory: []
    })

    // Update forms
    const updatedForms = updateForms(sites[currentSiteIndex].forms, currentFormIndex, {
      id: sites[currentSiteIndex].forms[currentFormIndex].id,
      result: newResult,
      timestamp: new Date().toISOString(),
      creditRows: creditRows.map(row => ({...row})),
      creditPayeeRows: creditPayeeRows.map(row => ({...row})),
      depenseRows: depenseRows.map(row => ({...row})),
      retraitRows: retraitRows.map(row => ({...row})),
      fond,
      soldeALinstant,
      soldeDeDebut,
      site: sites[currentSiteIndex].name,
      multiplier,
      siteColor: sites[currentSiteIndex].color,
      calculationHistory: []
    })

    const updatedSite = {
      ...sites[currentSiteIndex],
      forms: updatedForms,
      statistics: {
        ...sites[currentSiteIndex].statistics,
        lastUpdated: new Date().toISOString()
      }
    }
    handleUpdateSite(currentSiteIndex, updatedSite)
  }

  // Voice input handling
  const handleVoiceInput = useCallback((
    callback: (value: string) => void,
    isNumberField: boolean = true
  ) => {
    if (!window.webkitSpeechRecognition) {
      alert('Speech recognition is not supported in this browser')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = voiceLanguage === 'none' ? 'en-US' : voiceLanguage
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      const processed = processVoiceInput(transcript, voiceLanguage, isNumberField)
      callback(processed)
    }

    recognition.start()
  }, [voiceLanguage])

  const handleVoiceInputWithFeedback = useCallback((
    callback: (value: string) => void,
    isNumberField: VoiceLanguage | boolean = true
  ) => {
    // If a boolean is passed, use the default language
    const numberField = typeof isNumberField === 'boolean' ? isNumberField : true
    handleVoiceInput(callback, numberField)
  }, [handleVoiceInput])

  // Site management functions
  const handleUpdateSite = (siteIndex: number, updatedSite: Site) => {
    const newSites = [...sites]
    newSites[siteIndex] = updatedSite
    setSites(newSites)
    
    if (siteIndex === currentSiteIndex) {
      setSite(updatedSite.name)
    }
  }

  const handleSiteChange = (index: number) => {
    setCurrentSiteIndex(index)
    setCurrentFormIndex(0)
    loadForm(sites[index].forms[0])
  }

  // Form management functions
  const loadForm = (form: Form) => {
    if (!form) return
    try {
      setMultiplier(form.multiplier || '1.1')
      setFond(form.fond || '')
      setSoldeALinstant(form.soldeALinstant || '')
      setSite(form.site || '')
      setSoldeDeDebut(form.soldeDeDebut || '')
      setCreditRows(form.creditRows.length > 0 ? form.creditRows : [initialCreditRow])
      setCreditPayeeRows(form.creditPayeeRows.length > 0 ? form.creditPayeeRows : [initialCreditPayeeRow])
      setDepenseRows(form.depenseRows.length > 0 ? form.depenseRows : [initialDepenseRow])
      setRetraitRows(form.retraitRows.length > 0 ? form.retraitRows : [initialRetraitRow])
      setResult(form.result || '')
    } catch (error) {
      console.error('Error loading form:', error)
      handleReset()
    }
  }

  const handleReset = () => {
    setMultiplier('1.1')
    setFond('')
    setSoldeALinstant('')
    setSite('')
    setSoldeDeDebut('')
    setCreditRows([initialCreditRow])
    setCreditPayeeRows([initialCreditPayeeRow])
    setDepenseRows([initialDepenseRow])
    setRetraitRows([initialRetraitRow])
    setResult('')
    setErrors({
      fond: '',
      soldeALinstant: '',
      soldeDeDebut: '',
      credit: '',
      creditPayee: '',
      depense: '',
      retrait: ''
    })
  }

  // Row management functions
  const addRow = (tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait') => {
    switch (tableType) {
      case 'credit':
        setCreditRows([...creditRows, initialCreditRow])
        break
      case 'creditPayee':
        setCreditPayeeRows([...creditPayeeRows, initialCreditPayeeRow])
        break
      case 'depense':
        setDepenseRows([...depenseRows, initialDepenseRow])
        break
      case 'retrait':
        setRetraitRows([...retraitRows, initialRetraitRow])
        break
    }
  }

  const removeRow = (tableType: 'credit' | 'creditPayee' | 'depense' | 'retrait', index: number) => {
    switch (tableType) {
      case 'credit':
        if (creditRows.length > 1) {
          setCreditRows(creditRows.filter((_, i) => i !== index))
        }
        break
      case 'creditPayee':
        if (creditPayeeRows.length > 1) {
          setCreditPayeeRows(creditPayeeRows.filter((_, i) => i !== index))
        }
        break
      case 'depense':
        if (depenseRows.length > 1) {
          setDepenseRows(depenseRows.filter((_, i) => i !== index))
        }
        break
      case 'retrait':
        if (retraitRows.length > 1) {
          setRetraitRows(retraitRows.filter((_, i) => i !== index))
        }
        break
    }
  }

  const createHistoryEntry = (form: Form): string => {
    const historyEntry = `${new Date().toLocaleString()}: ${form.result}`
    return historyEntry
  }

  const updateForms = (updatedForms: Form[], currentFormIndex: number, form: Form) => {
    const newForms = [...updatedForms]
    newForms[currentFormIndex] = {
      ...form,
      calculationHistory: [
        ...(form.calculationHistory || []),
        createHistoryEntry(form)
      ]
    }
    return newForms
  }

  return {
    // State
    mounted,
    voiceLanguage,
    multiplier,
    fond,
    soldeALinstant,
    site,
    soldeDeDebut,
    creditRows,
    creditPayeeRows,
    depenseRows,
    retraitRows,
    result,
    errors,
    sites,
    currentSiteIndex,
    currentFormIndex,

    // Setters
    setMounted,
    setVoiceLanguage,
    setMultiplier,
    setFond,
    setSoldeALinstant,
    setSite,
    setSoldeDeDebut,
    setCreditRows,
    setCreditPayeeRows,
    setDepenseRows,
    setRetraitRows,
    setResult,
    setErrors,
    setSites,
    setCurrentSiteIndex,
    setCurrentFormIndex,

    // Functions
    validateInput,
    handleCalculate,
    handleVoiceInput,
    handleVoiceInputWithFeedback,
    handleUpdateSite,
    handleSiteChange,
    loadForm,
    handleReset,
    addRow,
    removeRow
  }
}
