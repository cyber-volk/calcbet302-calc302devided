'use client'

import React from 'react'
import { Share2, Camera, FileText } from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { notify } from '../../../utils/notificationUtils'
import { Form } from '../../../types/calculator.types'

interface ShareData {
  files?: File[];
  title?: string;
  text?: string;
}

interface WebShareNavigator {
  share?: (data?: ShareData) => Promise<void>;
  canShare?: (data?: ShareData) => boolean;
}

declare global {
  interface Navigator extends WebShareNavigator {}
}

interface ExportActionsProps {
  formRef: React.RefObject<HTMLDivElement>
  form: Form
}

export function ExportActions({ formRef, form }: ExportActionsProps) {
  const handleScreenshot = async () => {
    try {
      if (!formRef.current) return

      const canvas = await html2canvas(formRef.current, {
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `calculator-${form.id}.png`
      link.href = dataUrl
      link.click()

      notify.success('Screenshot saved successfully')
    } catch (error) {
      console.error('Screenshot error:', error)
      notify.error('Failed to save screenshot')
    }
  }

  const handlePdfExport = async () => {
    try {
      if (!formRef.current) return

      const canvas = await html2canvas(formRef.current, {
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`calculator-${form.id}.pdf`)

      notify.success('PDF exported successfully')
    } catch (error) {
      console.error('PDF export error:', error)
      notify.error('Failed to export PDF')
    }
  }

  const handleShare = async () => {
    try {
      if (!formRef.current) return

      const canvas = await html2canvas(formRef.current, {
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png')
      })

      const file = new File([blob], `calculator-${form.id}.png`, {
        type: 'image/png'
      })

      const navigator = window.navigator as WebShareNavigator
      if (navigator.share && navigator.canShare) {
        const shareData: ShareData = {
          files: [file],
          title: 'Calculator Result',
          text: `Calculator result from ${new Date().toLocaleDateString()}`
        }

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData)
          notify.success('Shared successfully')
        } else {
          throw new Error('Sharing not supported')
        }
      } else {
        throw new Error('Web Share API not supported')
      }
    } catch (error) {
      console.error('Share error:', error)
      notify.error('Failed to share')
    }
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleScreenshot}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Take Screenshot"
      >
        <Camera className="w-5 h-5" />
      </button>
      <button
        onClick={handlePdfExport}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Export PDF"
      >
        <FileText className="w-5 h-5" />
      </button>
      <button
        onClick={handleShare}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  )
}
