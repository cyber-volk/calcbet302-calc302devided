import { VoiceLanguage } from '../types/calculator.types'

export function processVoiceInput(transcript: string, language: VoiceLanguage, isNumberField = true): string {
  if (!transcript) return ''

  // Convert words to numbers in French
  const frenchNumbers: { [key: string]: string } = {
    'zéro': '0', 'un': '1', 'deux': '2', 'trois': '3', 'quatre': '4',
    'cinq': '5', 'six': '6', 'sept': '7', 'huit': '8', 'neuf': '9',
    'dix': '10', 'onze': '11', 'douze': '12', 'treize': '13', 'quatorze': '14',
    'quinze': '15', 'seize': '16', 'vingt': '20', 'trente': '30', 'quarante': '40',
    'cinquante': '50', 'soixante': '60', 'soixante-dix': '70', 'quatre-vingt': '80',
    'quatre-vingt-dix': '90', 'cent': '100', 'mille': '1000'
  }

  // Convert words to numbers in Arabic
  const arabicNumbers: { [key: string]: string } = {
    'صفر': '0', 'واحد': '1', 'اثنين': '2', 'ثلاثة': '3', 'أربعة': '4',
    'خمسة': '5', 'ستة': '6', 'سبعة': '7', 'ثمانية': '8', 'تسعة': '9',
    'عشرة': '10', 'عشرين': '20', 'ثلاثين': '30', 'أربعين': '40',
    'خمسين': '50', 'ستين': '60', 'سبعين': '70', 'ثمانين': '80',
    'تسعين': '90', 'مائة': '100', 'ألف': '1000'
  }

  let processedText = transcript.toLowerCase()

  if (isNumberField) {
    // Replace French number words with digits
    Object.entries(frenchNumbers).forEach(([word, number]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'g')
      processedText = processedText.replace(regex, number)
    })

    // Replace Arabic number words with digits
    Object.entries(arabicNumbers).forEach(([word, number]) => {
      const regex = new RegExp(`\\b${word}\\b`, 'g')
      processedText = processedText.replace(regex, number)
    })

    // Extract numbers and operators
    const numbers = processedText.match(/[0-9]+/g)
    if (numbers) {
      return numbers.join('')
    }
  }

  return processedText
}
