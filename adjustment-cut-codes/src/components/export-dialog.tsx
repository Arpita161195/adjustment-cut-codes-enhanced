'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  FilePdf,
  Loader2,
  Check
} from 'lucide-react'

interface ExportDialogProps {
  data: any[]
  filename?: string
  trigger?: React.ReactNode
}

interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf'
  columns: string[]
  includeFiltered: boolean
  includeArchived: boolean
}

export function ExportDialog({ data, filename = 'codes', trigger }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    columns: ['code', 'description', 'wms', 'instance', 'facility', 'customer', 'category', 'impactType', 'status'],
    includeFiltered: true,
    includeArchived: false
  })

  const availableColumns = [
    { key: 'code', label: 'Code' },
    { key: 'description', label: 'Description' },
    { key: 'wms', label: 'WMS' },
    { key: 'instance', label: 'Instance' },
    { key: 'facility', label: 'Facility' },
    { key: 'customer', label: 'Customer' },
    { key: 'category', label: 'Category' },
    { key: 'impactType', label: 'Impact Type' },
    { key: 'status', label: 'Status' },
    { key: 'createdDate', label: 'Created Date' },
    { key: 'lastModified', label: 'Last Modified' }
  ]

  const formatOptions = [
    { 
      value: 'csv', 
      label: 'CSV', 
      icon: FileText, 
      description: 'Comma-separated values for spreadsheets',
      extension: '.csv'
    },
    { 
      value: 'excel', 
      label: 'Excel', 
      icon: FileSpreadsheet, 
      description: 'Microsoft Excel format with formatting',
      extension: '.xlsx'
    },
    { 
      value: 'pdf', 
      label: 'PDF', 
      icon: FilePdf, 
      description: 'Formatted document for reports',
      extension: '.pdf'
    }
  ]

  const handleColumnToggle = (columnKey: string, checked: boolean) => {
    if (checked) {
      setOptions(prev => ({
        ...prev,
        columns: [...prev.columns, columnKey]
      }))
    } else {
      setOptions(prev => ({
        ...prev,
        columns: prev.columns.filter(col => col !== columnKey)
      }))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setOptions(prev => ({
        ...prev,
        columns: availableColumns.map(col => col.key)
      }))
    } else {
      setOptions(prev => ({
        ...prev,
        columns: []
      }))
    }
  }

  const filterData = () => {
    let filteredData = [...data]
    
    if (!options.includeArchived) {
      filteredData = filteredData.filter(item => item.status !== 'Archived')
    }
    
    return filteredData.map(item => {
      const filtered: any = {}
      options.columns.forEach(col => {
        filtered[col] = item[col]
      })
      return filtered
    })
  }

  const generateCSV = (data: any[]) => {
    const headers = options.columns.map(col => 
      availableColumns.find(c => c.key === col)?.label || col
    )
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        options.columns.map(col => {
          const value = row[col] || ''
          // Escape commas and quotes
          return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
            ? `"${value.replace(/"/g, '""')}"` 
            : value
        }).join(',')
      )
    ].join('\n')
    
    return csvContent
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExport = async () => {
    if (options.columns.length === 0) {
      alert('Please select at least one column to export')
      return
    }

    setIsExporting(true)
    setExportSuccess(false)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const filteredData = filterData()
      const selectedFormat = formatOptions.find(f => f.value === options.format)
      
      switch (options.format) {
        case 'csv':
          const csvContent = generateCSV(filteredData)
          downloadFile(csvContent, `${filename}${selectedFormat?.extension}`, 'text/csv')
          break
          
        case 'excel':
          // In a real app, you'd use a library like xlsx
          const excelContent = generateCSV(filteredData)
          downloadFile(excelContent, `${filename}${selectedFormat?.extension}`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          break
          
        case 'pdf':
          // In a real app, you'd use a library like jspdf or pdfmake
          const pdfContent = `PDF Export\n\nData:\n${JSON.stringify(filteredData, null, 2)}`
          downloadFile(pdfContent, `${filename}${selectedFormat?.extension}`, 'application/pdf')
          break
      }
      
      setExportSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        setExportSuccess(false)
      }, 2000)
      
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const selectedFormat = formatOptions.find(f => f.value === options.format)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
            <Badge variant="secondary">{data.length} records</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {formatOptions.map((format) => {
                const Icon = format.icon
                return (
                  <div
                    key={format.value}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-muted/50 ${
                      options.format === format.value
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-muted-foreground/30'
                    }`}
                    onClick={() => setOptions(prev => ({ ...prev, format: format.value as any }))}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${
                        options.format === format.value ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {format.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Column Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-medium">Columns to Export</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={options.columns.length === availableColumns.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm">
                  Select All ({availableColumns.length})
                </Label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
              {availableColumns.map((column) => (
                <div key={column.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`column-${column.key}`}
                    checked={options.columns.includes(column.key)}
                    onCheckedChange={(checked) => handleColumnToggle(column.key, checked as boolean)}
                  />
                  <Label htmlFor={`column-${column.key}`} className="text-sm flex-1">
                    {column.label}
                  </Label>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground mt-2">
              {options.columns.length} of {availableColumns.length} columns selected
            </div>
          </div>

          {/* Export Options */}
          <div>
            <Label className="text-base font-medium mb-3 block">Export Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-archived"
                  checked={options.includeArchived}
                  onCheckedChange={(checked) => 
                    setOptions(prev => ({ ...prev, includeArchived: checked as boolean }))
                  }
                />
                <Label htmlFor="include-archived" className="text-sm">
                  Include archived records
                </Label>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Export Summary</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>Format: <span className="font-medium text-foreground">{selectedFormat?.label}</span></div>
              <div>Records: <span className="font-medium text-foreground">{filterData().length}</span></div>
              <div>Columns: <span className="font-medium text-foreground">{options.columns.length}</span></div>
              <div>Filename: <span className="font-medium text-foreground">{filename}{selectedFormat?.extension}</span></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isExporting}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleExport}
              disabled={isExporting || options.columns.length === 0}
              className="min-w-[120px]"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : exportSuccess ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Success!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
