'use client'

import React from 'react'
import { Mic, Languages } from 'lucide-react'
import { VoiceLanguage } from '../../../types/calculator.types'

interface VoiceInputButtonProps {
  onVoiceInput: (callback: (value: string) => void, isNumberField?: boolean) => void
  language?: VoiceLanguage
  isNumberField?: boolean
}

export function VoiceInputButton({ onVoiceInput, language, isNumberField }: VoiceInputButtonProps) {
  if (language === 'none') return null

  return (
    <button
      type="button"
      onClick={() => onVoiceInput((value) => console.log(value), isNumberField)}
      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      title="Voice Input"
    >
      <Mic className="w-5 h-5" />
    </button>
  )
}

interface VoiceFeedbackProps {
  isListening: boolean
  language: VoiceLanguage
}

export function VoiceFeedback({ isListening, language }: VoiceFeedbackProps) {
  if (!isListening || language === 'none') return null

  let displayLanguage = language;
  if (language === 'en-US' || language === 'fr-FR' || language === 'es-ES') {
    // Existing language check
  } else if (language === 'ar-SA') {
    // Handle Arabic language case
    displayLanguage = 'en-US'; // Fallback to a supported language
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-4">
          <Mic className="w-8 h-8 text-blue-500 animate-pulse" />
          <span className="text-lg font-medium">Listening...</span>
        </div>
      </div>
    </div>
  )
}

interface LanguageSelectorProps {
  selectedLanguage: VoiceLanguage
  onLanguageChange: (lang: VoiceLanguage) => void
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => onLanguageChange(selectedLanguage === 'none' ? 'en-US' : 'none')}
        title="Toggle Voice Input"
      >
        <Languages className="w-5 h-5" />
        {selectedLanguage !== 'none' && (
          <span className="text-sm font-medium">
            {selectedLanguage === 'en-US' ? 'EN' : selectedLanguage === 'fr-FR' ? 'FR' : 'AR'}
          </span>
        )}
      </button>
      {selectedLanguage !== 'none' && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedLanguage === 'en-US' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => onLanguageChange('en-US')}
            >
              English
            </button>
            <button
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedLanguage === 'fr-FR' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => onLanguageChange('fr-FR')}
            >
              Français
            </button>
            <button
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedLanguage === 'ar-SA' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => onLanguageChange('ar-SA')}
            >
              العربية
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
