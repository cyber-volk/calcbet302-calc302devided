import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Form, Site, SiteColor } from '../../types/calculator.types';

interface HistorySliderProps {
  sites: Site[];
  currentSiteIndex: number;
  setCurrentSiteIndex: (index: number) => void;
  currentFormIndex: number;
  setCurrentFormIndex: (index: number) => void;
  setSites: React.Dispatch<React.SetStateAction<Site[]>>;
}

const SITE_COLORS: { [key in SiteColor]: { bg: string; hover: string; ring: string } } = {
  none: { bg: 'bg-white', hover: 'hover:bg-gray-50', ring: 'ring-gray-200' },
  blue: { bg: 'bg-blue-100', hover: 'hover:bg-blue-200', ring: 'ring-blue-300' },
  green: { bg: 'bg-green-100', hover: 'hover:bg-green-200', ring: 'ring-green-300' },
  yellow: { bg: 'bg-yellow-100', hover: 'hover:bg-yellow-200', ring: 'ring-yellow-300' },
  red: { bg: 'bg-red-100', hover: 'hover:bg-red-200', ring: 'ring-red-300' }
};

const HistorySlider: React.FC<HistorySliderProps> = ({
  sites,
  currentSiteIndex,
  setCurrentSiteIndex,
  currentFormIndex,
  setCurrentFormIndex,
  setSites
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentSite = sites[currentSiteIndex];
  const forms = currentSite?.forms || [];

  const handleFormSelect = (index: number) => {
    if (index === currentFormIndex) return;
    setCurrentFormIndex(index);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="bg-white shadow-lg rounded-t-xl p-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Form History</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
        >
          {forms.map((form, index) => (
            <div
              key={form.id}
              className={`flex-shrink-0 w-64 p-4 rounded-lg cursor-pointer transition-all
                ${SITE_COLORS[currentSite.color].bg}
                ${index === currentFormIndex ? 'ring-2 ring-blue-500' : ''}
              `}
              onClick={() => handleFormSelect(index)}
            >
              <p className="font-medium mb-2">Form {index + 1}</p>
              <p className="text-sm text-gray-600">
                {formatDistanceToNow(new Date(form.timestamp))} ago
              </p>
              <p className="text-sm font-medium mt-2">
                Result: {form.result || 'No result'}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute -top-12 left-1/2 transform -translate-x-1/2
          bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow
          ${isOpen ? 'rotate-180' : ''}`}
      >
        <Book className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default HistorySlider;
