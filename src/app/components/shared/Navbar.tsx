'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, Layers } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-lg mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Calc302</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Original Version
              </Link>
              <Link
                href="/modular"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/modular')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Layers className="w-4 h-4 mr-2" />
                Modular Version
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              Compare Calculator Versions
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`flex items-center px-3 py-2 text-base font-medium ${
              isActive('/')
                ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
            }`}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Original Version
          </Link>
          <Link
            href="/modular"
            className={`flex items-center px-3 py-2 text-base font-medium ${
              isActive('/modular')
                ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-300'
            }`}
          >
            <Layers className="w-4 h-4 mr-2" />
            Modular Version
          </Link>
        </div>
      </div>
    </nav>
  )
}
