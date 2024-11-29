'use client';

import React from 'react';
import Calc302 from '../components/calc302';

export default function OriginalPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Original Calculator</h1>
      <Calc302 />
    </div>
  );
}
