'use client';

import React, { useState } from 'react';
import Calculator from '../components/calculator/Calculator';
import SiteCarousel from './components/SiteCarousel';
import HistorySlider from './components/HistorySlider';
import { Site, Form, SiteColor } from '../types/calculator.types';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const sampleSites: Site[] = [
  {
    id: '1',
    name: 'Site 1',
    color: 'blue' as SiteColor,
    forms: [],
    statistics: {
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: '2',
    name: 'Site 2',
    color: 'red' as SiteColor,
    forms: [],
    statistics: {
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: '3',
    name: 'Site 3',
    color: 'green' as SiteColor,
    forms: [],
    statistics: {
      lastUpdated: new Date().toISOString()
    }
  },
];

const createEmptyForm = (siteId: string, siteColor: SiteColor): Form => ({
  id: Date.now().toString(),
  result: '',
  timestamp: new Date().toISOString(),
  calculationHistory: [],
  creditRows: [{ id: '1', totalClient: '', details: '', client: '' }],
  creditPayeeRows: [{ id: '1', totalPayee: '', details: '', client: '' }],
  depenseRows: [{ id: '1', totalDepense: '', details: '', client: '' }],
  retraitRows: [{ id: '1', retraitPayee: '', retrait: '', client: '' }],
  fond: '',
  soldeALinstant: '',
  soldeDeDebut: '',
  site: siteId,
  multiplier: '1.1',
  siteColor: siteColor
});

const ModularPage = () => {
  const [sites, setSites] = useState<Site[]>(sampleSites);
  const [currentSiteIndex, setCurrentSiteIndex] = useState(0);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  const currentSite = sites[currentSiteIndex];
  const currentForm = currentSite?.forms[currentFormIndex];

  const handleAddSite = () => {
    const newSite: Site = {
      id: Date.now().toString(),
      name: `Site ${sites.length + 1}`,
      color: 'blue' as SiteColor,
      forms: [],
      statistics: {
        lastUpdated: new Date().toISOString()
      }
    };
    setSites([...sites, newSite]);
  };

  const handleFormUpdate = (updatedForm: Form) => {
    setSites(prevSites => {
      const newSites = [...prevSites];
      const currentSite = newSites[currentSiteIndex];
      if (!currentSite) return prevSites;

      const forms = [...currentSite.forms];
      forms[currentFormIndex] = updatedForm;

      newSites[currentSiteIndex] = {
        ...currentSite,
        forms,
        statistics: {
          ...currentSite.statistics,
          lastUpdated: new Date().toISOString()
        }
      };
      return newSites;
    });
  };

  const handleAddForm = () => {
    if (!currentSite) return;

    setSites(prevSites => {
      const newSites = [...prevSites];
      const currentSite = newSites[currentSiteIndex];
      if (!currentSite) return prevSites;

      const newForm = createEmptyForm(currentSite.id, currentSite.color);
      const forms = [...currentSite.forms, newForm];

      newSites[currentSiteIndex] = {
        ...currentSite,
        forms,
        statistics: {
          ...currentSite.statistics,
          lastUpdated: new Date().toISOString()
        }
      };
      return newSites;
    });
    setCurrentFormIndex(currentSite.forms.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <SiteCarousel
            sites={sites}
            currentSiteIndex={currentSiteIndex}
            onSiteChange={setCurrentSiteIndex}
            setSites={setSites}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 relative">
          {currentForm ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Form {currentFormIndex + 1}
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentFormIndex(Math.max(0, currentFormIndex - 1))}
                    disabled={currentFormIndex === 0}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentFormIndex(Math.min(currentSite.forms.length - 1, currentFormIndex + 1))}
                    disabled={currentFormIndex === currentSite.forms.length - 1}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <Calculator
                key={currentForm.id}
                initialForm={currentForm}
                onFormUpdate={handleFormUpdate}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No forms created yet</p>
              <button
                onClick={handleAddForm}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Form
              </button>
            </div>
          )}

          {currentSite && currentSite.forms.length < 3 && currentForm && (
            <button
              onClick={handleAddForm}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <HistorySlider
        sites={sites}
        currentSiteIndex={currentSiteIndex}
        setCurrentSiteIndex={setCurrentSiteIndex}
        currentFormIndex={currentFormIndex}
        setCurrentFormIndex={setCurrentFormIndex}
        setSites={setSites}
      />
    </div>
  );
};

export default ModularPage;
