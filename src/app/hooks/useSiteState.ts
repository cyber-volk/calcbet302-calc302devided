import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Site, Form, SiteColor } from '../types/calculator.types'
import { v4 as uuidv4 } from 'uuid'

type SiteStateHook = {
  sites: Site[];
  setSites: (value: Site[] | ((val: Site[]) => Site[])) => void;
  currentSiteIndex: number;
  currentFormIndex: number;
  setCurrentSiteIndex: Dispatch<SetStateAction<number>>;
  setCurrentFormIndex: Dispatch<SetStateAction<number>>;
  addSite: () => void;
  removeSite: () => void;
  updateSite: (name: string, color: SiteColor) => void;
  navigateSite: (direction: 'next' | 'prev') => void;
  updateForm: (siteIndex: number, formIndex: number, fieldOrForm: string | Partial<Form>, value?: string) => void;
}

export const useSiteState = (initialSite?: Site): SiteStateHook => {
  const [sites, setSites] = useLocalStorage<Site[]>('calculator-sites', [
    {
      id: uuidv4(),
      name: 'Default Site',
      color: 'none',
      forms: [{
        id: uuidv4(),
        result: '',
        timestamp: new Date().toISOString(),
        creditRows: [],
        creditPayeeRows: [],
        depenseRows: [],
        retraitRows: [],
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

  const [currentSiteIndex, setCurrentSiteIndex] = useState(0)
  const [currentFormIndex, setCurrentFormIndex] = useState(0)

  const addSite = useCallback(() => {
    if (sites.length >= 5) return // Max sites limit

    const newSite: Site = {
      id: uuidv4(),
      name: `Site ${sites.length + 1}`,
      color: 'none',
      forms: [{
        id: uuidv4(),
        result: '',
        timestamp: new Date().toISOString(),
        creditRows: [],
        creditPayeeRows: [],
        depenseRows: [],
        retraitRows: [],
        fond: '',
        soldeALinstant: '',
        soldeDeDebut: '',
        site: `Site ${sites.length + 1}`,
        multiplier: '1.1',
        siteColor: 'none',
        calculationHistory: []
      }],
      statistics: {
        lastUpdated: new Date().toISOString()
      }
    }

    setSites(prevSites => [...prevSites, newSite])
    setCurrentSiteIndex(sites.length)
    setCurrentFormIndex(0)
  }, [sites, setSites])

  const removeSite = useCallback(() => {
    if (sites.length <= 1) return // Prevent removing last site

    setSites(prevSites => {
      const updatedSites = [...prevSites]
      updatedSites.splice(currentSiteIndex, 1)
      return updatedSites
    })

    setCurrentSiteIndex(Math.max(0, currentSiteIndex - 1))
  }, [sites, currentSiteIndex, setSites])

  const updateSite = useCallback((name: string, color: SiteColor) => {
    setSites(prevSites => {
      const updatedSites = [...prevSites]
      const currentSite = updatedSites[currentSiteIndex]
      
      updatedSites[currentSiteIndex] = {
        ...currentSite,
        name,
        color,
        statistics: {
          lastUpdated: new Date().toISOString()
        }
      }
      
      return updatedSites
    })
  }, [setSites, currentSiteIndex])

  const navigateSite = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSiteIndex(Math.min(sites.length - 1, currentSiteIndex + 1))
    } else {
      setCurrentSiteIndex(Math.max(0, currentSiteIndex - 1))
    }
  }, [setSites, currentSiteIndex, setCurrentSiteIndex])

  const updateForm = useCallback((
    siteIndex: number, 
    formIndex: number, 
    fieldOrForm: string | Partial<Form>, 
    value?: string
  ) => {
    setSites(prevSites => {
      const updatedSites = [...prevSites]
      const updatedSite = { ...updatedSites[siteIndex] }
      const updatedForms = [...updatedSite.forms]

      if (typeof fieldOrForm === 'string' && value !== undefined) {
        // Single field update
        updatedForms[formIndex] = {
          ...updatedForms[formIndex],
          [fieldOrForm]: value
        }
      } else if (typeof fieldOrForm === 'object') {
        // Partial form update
        updatedForms[formIndex] = {
          ...updatedForms[formIndex],
          ...fieldOrForm
        }
      }

      updatedSite.forms = updatedForms
      updatedSites[siteIndex] = updatedSite

      return updatedSites
    })
  }, [setSites])

  return {
    sites,
    setSites,
    currentSiteIndex,
    currentFormIndex,
    setCurrentSiteIndex,
    setCurrentFormIndex,
    addSite,
    removeSite,
    updateSite,
    navigateSite,
    updateForm
  }
}
