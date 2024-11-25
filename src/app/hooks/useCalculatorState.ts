'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Form, Site, CreditRow, CreditPayeeRow, DepenseRow, RetraitRow, ErrorKeys, Errors } from '../types/calculator.types'

export function useCalculatorState() {
  // State declarations
  const [mounted, setMounted] = useState(false)
  const [multiplier, setMultiplier] = useState('1.1')
  const [fond, setFond] = useState('')
  const [soldeALinstant, setSoldeALinstant] = useState('')
  const [site, setSite] = useState('')
  const [soldeDeDebut, setSoldeDeDebut] = useState('')
  const [creditRows, setCreditRows] = useState<CreditRow[]>([{ id: '1', totalClient: '', details: '', client: '' }])
  const [creditPayeeRows, setCreditPayeeRows] = useState<CreditPayeeRow[]>([{ id: '1', totalPayee: '', details: '', client: '' }])
  const [depenseRows, setDepenseRows] = useState<DepenseRow[]>([{ id: '1', totalDepense: '', details: '', client: '' }])
  const [retraitRows, setRetraitRows] = useState<RetraitRow[]>([{ id: '1', retraitPayee: '', retrait: '', client: '' }])
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
        siteColor: 'none', // Add default site color
        creditRows: [{ id: '1', totalClient: '', details: '', client: '' }],
        creditPayeeRows: [{ id: '1', totalPayee: '', details: '', client: '' }],
        depenseRows: [{ id: '1', totalDepense: '', details: '', client: '' }],
        retraitRows: [{ id: '1', retraitPayee: '', retrait: '', client: '' }],
        fond: '',
        soldeALinstant: '',
        soldeDeDebut: '',
        site: 'Default Site',
        multiplier: '1.1',
        calculationHistory: []
      }],
      statistics: {
        lastUpdated: new Date().toISOString()
      }
    }
  ])
  const [currentSiteIndex, setCurrentSiteIndex] = useLocalStorage('current-site-index', 0)
  const [currentFormIndex, setCurrentFormIndex] = useLocalStorage('current-form-index', 0)

  // Form state initialization and persistence
  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }

    if (sites[currentSiteIndex]) {
      const currentForm = sites[currentSiteIndex].forms[currentFormIndex]
      if (currentForm) {
        setMultiplier(currentForm.multiplier || '1.1')
        setFond(currentForm.fond || '')
        setSoldeALinstant(currentForm.soldeALinstant || '')
        setSite(sites[currentSiteIndex].name || '')
        setSoldeDeDebut(currentForm.soldeDeDebut || '')
        setCreditRows(currentForm.creditRows.length > 0 ? currentForm.creditRows : [{ id: '1', totalClient: '', details: '', client: '' }])
        setCreditPayeeRows(currentForm.creditPayeeRows.length > 0 ? currentForm.creditPayeeRows : [{ id: '1', totalPayee: '', details: '', client: '' }])
        setDepenseRows(currentForm.depenseRows.length > 0 ? currentForm.depenseRows : [{ id: '1', totalDepense: '', details: '', client: '' }])
        setRetraitRows(currentForm.retraitRows.length > 0 ? currentForm.retraitRows : [{ id: '1', retraitPayee: '', retrait: '', client: '' }])
        setResult(currentForm.result || '')
      }
    }
  }, [mounted, currentSiteIndex, currentFormIndex, sites])

  // Debounced save effect
  useEffect(() => {
    if (!mounted) return

    const saveTimeout = setTimeout(() => {
      try {
        const updatedSites = [...sites]
        const currentForm = {
          ...updatedSites[currentSiteIndex].forms[currentFormIndex],
          id: updatedSites[currentSiteIndex].forms[currentFormIndex].id || crypto.randomUUID(),
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
          timestamp: new Date().toISOString()
        }

        updatedSites[currentSiteIndex].forms[currentFormIndex] = currentForm
        updatedSites[currentSiteIndex].statistics.lastUpdated = new Date().toISOString()
        
        setSites(updatedSites)
      } catch (error) {
        console.error('Error saving state:', error)
      }
    }, 500)

    return () => clearTimeout(saveTimeout)
  }, [
    mounted,
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
    currentFormIndex,
    currentSiteIndex,
    setSites,
    sites
  ])

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

  const handleCalculate = (e?: React.FormEvent) => {
    e?.preventDefault()
    const validatedSoldeALinstant = validateInput(soldeALinstant, 'soldeALinstant') || 0
    const validatedFond = validateInput(fond, 'fond') || 0
    const validatedSoldeDeDebut = validateInput(soldeDeDebut, 'soldeDeDebut', true)

    if (validatedSoldeDeDebut === null) return

    const totalRetrait = retraitRows.reduce((total: number, row: RetraitRow) => 
      total + parseFloat(row.retrait || '0'), 0)
    const totalRetraitPayee = retraitRows.reduce((total: number, row: RetraitRow) => {
      if (row.retraitPayee === 'OK') {
        return total + parseFloat(row.retrait || '0')
      }
      return total + parseFloat(row.retraitPayee || '0')
    }, 0)

    const totalCredit = creditRows.reduce((total: number, row: CreditRow) => 
      total + parseFloat(row.totalClient || '0'), 0)
    const totalCreditPayee = creditPayeeRows.reduce((total: number, row: CreditPayeeRow) => 
      total + parseFloat(row.totalPayee || '0'), 0)
    const totalDepense = depenseRows.reduce((total: number, row: DepenseRow) => 
      total + parseFloat(row.totalDepense || '0'), 0)

    const finalResult = (
      validatedSoldeDeDebut +
      totalCredit +
      totalCreditPayee -
      totalDepense -
      totalRetrait -
      totalRetraitPayee +
      validatedFond +
      validatedSoldeALinstant
    )

    setResult(finalResult.toString())
    return finalResult
  }

  const loadForm = (form: Form) => {
    if (!form) return
    try {
      setMultiplier(form.multiplier || '1.1')
      setFond(form.fond || '')
      setSoldeALinstant(form.soldeALinstant || '')
      setSite(form.site || '')
      setSoldeDeDebut(form.soldeDeDebut || '')
      setCreditRows(form.creditRows.length > 0 ? form.creditRows : [{ id: '1', totalClient: '', details: '', client: '' }])
      setCreditPayeeRows(form.creditPayeeRows.length > 0 ? form.creditPayeeRows : [{ id: '1', totalPayee: '', details: '', client: '' }])
      setDepenseRows(form.depenseRows.length > 0 ? form.depenseRows : [{ id: '1', totalDepense: '', details: '', client: '' }])
      setRetraitRows(form.retraitRows.length > 0 ? form.retraitRows : [{ id: '1', retraitPayee: '', retrait: '', client: '' }])
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
    setSoldeDeDebut('')
    setCreditRows([{ id: '1', totalClient: '', details: '', client: '' }])
    setCreditPayeeRows([{ id: '1', totalPayee: '', details: '', client: '' }])
    setDepenseRows([{ id: '1', totalDepense: '', details: '', client: '' }])
    setRetraitRows([{ id: '1', retraitPayee: '', retrait: '', client: '' }])
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

  return {
    // State
    mounted,
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
    loadForm,
    handleReset
  }
}
