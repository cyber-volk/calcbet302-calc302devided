'use client'

export function useStyles() {
  return {
    calculationContainer: 'space-y-4 p-4 bg-white rounded-lg shadow',
    totalsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    totalItem: 'flex justify-between items-center p-3 bg-gray-50 rounded',
    totalLabel: 'font-medium text-gray-700',
    totalValue: 'text-lg font-semibold text-blue-600',
    row: 'flex items-center space-x-4 p-4 bg-white rounded-lg shadow',
    input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
    button: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    removeButton: 'text-red-500 hover:text-red-700',
    errorText: 'mt-1 text-sm text-red-600',
    errorMessage: 'text-red-600 font-medium p-2 bg-red-50 rounded-md',
    validationContainer: 'space-y-4 p-4 bg-white rounded-lg shadow',
    rowManagerContainer: 'space-y-8',
    rowSection: 'space-y-4',
    sectionTitle: 'text-lg font-semibold text-gray-900',
    addButton: 'w-full flex justify-center items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600',
    result: 'bg-gray-50 p-4 rounded-lg',
    resultLabel: 'text-sm font-medium text-gray-500',
    resultValue: 'text-lg font-semibold text-gray-900',
    calculateButton: 'w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700',
    formContainer: 'space-y-6 p-4 bg-white rounded-lg shadow-md'
  }
}
