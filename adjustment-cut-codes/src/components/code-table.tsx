'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Edit, Trash2, Archive, Eye } from 'lucide-react'

interface Code {
  id: string
  code: string
  description: string
  wms: string
  instance: string
  facility: string
  customer: string
  category: string
  impactType: string
  status: string
  createdDate: string
  lastModified: string
}

interface CodeTableProps {
  codes: Code[]
  selectedCodes: string[]
  onSelectionChange: (selected: string[]) => void
}

export function CodeTable({ codes, selectedCodes, onSelectionChange }: CodeTableProps) {
  const [sortField, setSortField] = useState<keyof Code>('code')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(codes.map(code => code.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectCode = (codeId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedCodes, codeId])
    } else {
      onSelectionChange(selectedCodes.filter(id => id !== codeId))
    }
  }

  const handleSort = (field: keyof Code) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedCodes = [...codes].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    const direction = sortDirection === 'asc' ? 1 : -1
    
    if (aValue < bValue) return -1 * direction
    if (aValue > bValue) return 1 * direction
    return 0
  })

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case 'archived':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Archived</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getImpactBadge = (impactType: string) => {
    switch (impactType.toLowerCase()) {
      case 'amc':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">AMC</Badge>
      case 'customer':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Customer</Badge>
      case 'no impact':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">No Impact</Badge>
      default:
        return <Badge variant="secondary">{impactType}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                <Checkbox
                  checked={selectedCodes.length === codes.length && codes.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th 
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('code')}
              >
                Code {sortField === 'code' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('description')}
              >
                Description {sortField === 'description' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                WMS/Instance
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Facility
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Customer
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Category
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Impact
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCodes.map((code) => (
              <tr key={code.id} className="border-b hover:bg-muted/50">
                <td className="p-4 align-middle">
                  <Checkbox
                    checked={selectedCodes.includes(code.id)}
                    onCheckedChange={(checked) => handleSelectCode(code.id, checked as boolean)}
                  />
                </td>
                <td className="p-4 align-middle font-mono font-medium">
                  {code.code}
                </td>
                <td className="p-4 align-middle max-w-xs">
                  <div className="truncate" title={code.description}>
                    {code.description}
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="text-sm">
                    <div className="font-medium">{code.wms}</div>
                    <div className="text-muted-foreground">{code.instance}</div>
                  </div>
                </td>
                <td className="p-4 align-middle text-sm">
                  {code.facility}
                </td>
                <td className="p-4 align-middle text-sm">
                  {code.customer}
                </td>
                <td className="p-4 align-middle">
                  <Badge variant="outline">{code.category}</Badge>
                </td>
                <td className="p-4 align-middle">
                  {getImpactBadge(code.impactType)}
                </td>
                <td className="p-4 align-middle">
                  {getStatusBadge(code.status)}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {codes.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No codes found matching your criteria.
        </div>
      )}
    </div>
  )
}
