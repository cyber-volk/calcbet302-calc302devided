'use client'

import { useState, useCallback } from 'react';
import { VoiceLanguage } from '../types/calculator.types';
import { getSpeechRecognition, SpeechRecognition, SpeechRecognitionEvent } from '../utils/speechRecognition';

export const useVoiceInput = (language: VoiceLanguage, onResult: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    // Use the new getSpeechRecognition utility function
    const recognitionInstance = getSpeechRecognition();
    
    if (!recognitionInstance) {
      console.error('Speech recognition not supported');
      return;
    }

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = language !== 'none' ? language : 'en-US';

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results;
      const transcript = Object.keys(results).map(key => 
        results[parseInt(key)][0].transcript
      ).join('');
      onResult(transcript);
    };

    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    recognitionInstance.onerror = (event: Event) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  }, [language, onResult]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return { startListening, stopListening, isListening };
}
