// Speech Recognition Utility

// Declare the SpeechRecognition interface
export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
  stop: () => void;
  onstart?: () => void;
  onend?: () => void;
  onerror?: (event: Event) => void;
}

// Declare the SpeechRecognitionEvent interface
export interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

// Create a function to get speech recognition instance
export function getSpeechRecognition(): SpeechRecognition | null {
  // Check for browser support
  const SpeechRecognition = 
    (window as any).SpeechRecognition || 
    (window as any).webkitSpeechRecognition || 
    (window as any).mozSpeechRecognition || 
    (window as any).msSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech recognition is not supported in this browser.');
    return null;
  }

  return new SpeechRecognition();
}

// Utility function to process voice input
export function processVoiceInput(transcript: string, isNumberField = true): string {
  if (!isNumberField) {
    return transcript.trim();
  }

  const numberWords: { [key: string]: string } = {
    'zéro': '0', 'un': '1', 'deux': '2', 'trois': '3', 'quatre': '4',
    'cinq': '5', 'six': '6', 'sept': '7', 'huit': '8', 'neuf': '9',
    'dix': '10', 'onze': '11', 'douze': '12', 'treize': '13', 'quatorze': '14',
    'quinze': '15', 'seize': '16', 'vingt': '20', 'trente': '30',
    'quarante': '40', 'cinquante': '50', 'soixante': '60',
    'soixante-dix': '70', 'quatre-vingt': '80', 'quatre-vingt-dix': '90',
    'cent': '100', 'cents': '100', 'mille': '1000',
    'صفر': '0', 'واحد': '1', 'اثنين': '2', 'ثلاثة': '3', 'اربعة': '4',
    'خمسة': '5', 'ستة': '6', 'سبعة': '7', 'ثمانية': '8', 'تسعة': '9',
    'عشرة': '10', 'عشرين': '20', 'ثلاثين': '30', 'اربعين': '40',
    'خمسين': '50', 'ستين': '60', 'سبعين': '70', 'ثمانين': '80',
    'تسعين': '90', 'مية': '100', 'الف': '1000'
  };

  let processed = transcript.toLowerCase().trim();

  const corrections: { [key: string]: string } = {
    'virgule': '.', 'point': '.', 'plus': '+', 'et': '+', 'euro': '', 'euros': '',
    'zéros': 'zéro', 'OK': 'ok', 'فاصلة': '.', 'نقطة': '.', 'زائد': '+',
    'و': '+', 'دينار': '', 'دنانير': '', 'موافق': 'ok', 'عم': 'ok'
  };

  const arabicToEnglishNumbers: { [key: string]: string } = {
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
  };

  // Number word processing logic (similar to the original implementation)
  Object.entries(numberWords).forEach(([word, number]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    processed = processed.replace(regex, number);
  });

  // Additional processing for corrections and number conversions
  Object.entries(corrections).forEach(([word, replacement]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    processed = processed.replace(regex, replacement);
  });

  Object.entries(arabicToEnglishNumbers).forEach(([arabic, english]) => {
    processed = processed.replace(new RegExp(arabic, 'g'), english);
  });

  return processed;
}
