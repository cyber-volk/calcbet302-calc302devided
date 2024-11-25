import { Form } from '../types/calculator.types';
import { processVoiceInput } from './speechRecognition';

// Utility function to process voice input for form fields
export function processFormVoiceInput(
  transcript: string, 
  form: Form, 
  updateForm: (updatedForm: Partial<Form>) => void
) {
  // Process the transcript based on the current focused input
  const processedTranscript = processVoiceInput(transcript);

  // Determine which field to update based on context or last focused input
  const fieldMappings: { [key: string]: keyof Form } = {
    'solde': 'soldeDeDebut',
    'fond': 'fond',
    'crédit': 'creditRows',
    'dépense': 'depenseRows',
    // Add more mappings as needed
  };

  // Find the most likely field to update
  const matchedField = Object.keys(fieldMappings).find(key => 
    transcript.toLowerCase().includes(key)
  );

  if (matchedField) {
    const formField = fieldMappings[matchedField];
    
    // Special handling for different field types
    if (formField === 'creditRows' || formField === 'depenseRows') {
      // Logic to add a new row or update existing row
      updateForm({
        [formField]: [
          ...(form[formField] || []),
          { 
            totalClient: processedTranscript,
            details: '',
            client: '',
            id: Date.now().toString() 
          }
        ]
      });
    } else {
      // Update simple string fields
      updateForm({ [formField]: processedTranscript });
    }
  } else {
    // Fallback: try to update the most recently focused or empty field
    console.log('Unhandled voice input:', processedTranscript);
  }
}
