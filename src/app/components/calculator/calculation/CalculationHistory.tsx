import React, { useMemo } from 'react'
import { animated } from '@react-spring/web'
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSlideAnimation } from '../../../utils/animationUtils'
import { Form } from '../../../types/calculator.types'
import { format } from 'date-fns'

interface CalculationHistoryProps {
  forms: Form[]
  currentFormIndex: number
  onFormSelect: (index: number) => void
  className?: string
}

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  forms,
  currentFormIndex,
  onFormSelect,
  className = ''
}) => {
  const slideAnimation = useSlideAnimation()
  const [selectedFormIndex, setSelectedFormIndex] = React.useState(currentFormIndex)

  const handleFormSelect = (index: number) => {
    setSelectedFormIndex(index)
    onFormSelect(index)
  }

  const handlePrevious = () => {
    if (currentFormIndex > 0) {
      handleFormSelect(currentFormIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentFormIndex < forms.length - 1) {
      handleFormSelect(currentFormIndex + 1)
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return format(date, 'dd/MM/yyyy HH:mm')
  }

  const sortedForms = useMemo(() => {
    return [...forms].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return dateB - dateA
    })
  }, [forms])

  return (
    <animated.div
      style={slideAnimation}
      className={`bg-white rounded-lg shadow-lg p-4 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Calculation History</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentFormIndex === 0}
            className={`p-2 rounded-lg transition-colors ${
              currentFormIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentFormIndex === forms.length - 1}
            className={`p-2 rounded-lg transition-colors ${
              currentFormIndex === forms.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedForms.map((form, index) => (
          <button
            key={form.id || index}
            onClick={() => handleFormSelect(index)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              index === selectedFormIndex
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Result: {form.result || 'N/A'}</div>
                <div className="text-sm text-gray-500">
                  Site: {form.site || 'N/A'}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                {formatDate(form.timestamp)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </animated.div>
  )
}
