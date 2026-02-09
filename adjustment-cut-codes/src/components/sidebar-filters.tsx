'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  Building2,
  Server,
  Tag,
  User,
  AlertCircle,
  RefreshCw,
  Save,
  Bookmark
} from 'lucide-react'

interface FilterState {
  searchQuery: string
  status: string[]
  wms: string[]
  facility: string[]
  category: string[]
  impactType: string[]
  customer: string[]
  dateRange: {
    from: string
    to: string
  }
}

interface SidebarFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
  activeFiltersCount: number
}

export function SidebarFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  activeFiltersCount 
}: SidebarFiltersProps) {
  const [savedFilters, setSavedFilters] = useState<string[]>([])
  const [filterName, setFilterName] = useState('')

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const updateArrayFilter = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = filters[key] as string[]
    if (checked) {
      updateFilter(key, [...currentArray, value])
    } else {
      updateFilter(key, currentArray.filter(item => item !== value))
    }
  }

  const saveCurrentFilters = () => {
    if (filterName.trim()) {
      setSavedFilters([...savedFilters, filterName.trim()])
      setFilterName('')
    }
  }

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'archived', label: 'Archived', color: 'bg-orange-100 text-orange-800' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
  ]

  const wmsOptions = ['HighJump', 'RedPrairie', 'JDA', 'Vision', 'Manhattan', 'Oracle']
  const facilityOptions = ['DC-001', 'DC-002', 'DC-003', 'DC-004', 'DC-005']
  const categoryOptions = ['Adjustment', 'Cut', 'Transfer', 'Return']
  const impactOptions = ['AMC', 'Customer', 'No Impact']

  return (
    <div className="w-80 h-full bg-background border-r border-border overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filters</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search codes, descriptions..."
                value={filters.searchQuery}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Status Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {statusOptions.map((status) => (
              <div key={status.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status.value}`}
                  checked={filters.status.includes(status.value)}
                  onCheckedChange={(checked) => 
                    updateArrayFilter('status', status.value, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`status-${status.value}`} 
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  <Badge className={status.color}>{status.label}</Badge>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* WMS Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Server className="h-4 w-4 mr-2" />
              WMS System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-40 overflow-y-auto">
            {wmsOptions.map((wms) => (
              <div key={wms} className="flex items-center space-x-2">
                <Checkbox
                  id={`wms-${wms}`}
                  checked={filters.wms.includes(wms)}
                  onCheckedChange={(checked) => 
                    updateArrayFilter('wms', wms, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`wms-${wms}`} 
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {wms}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Facility Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Facility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {facilityOptions.map((facility) => (
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox
                  id={`facility-${facility}`}
                  checked={filters.facility.includes(facility)}
                  onCheckedChange={(checked) => 
                    updateArrayFilter('facility', facility, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`facility-${facility}`} 
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {facility}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Category Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categoryOptions.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.category.includes(category)}
                  onCheckedChange={(checked) => 
                    updateArrayFilter('category', category, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`category-${category}`} 
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {category}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Impact Type Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <User className="h-4 w-4 mr-2" />
              Impact Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {impactOptions.map((impact) => (
              <div key={impact} className="flex items-center space-x-2">
                <Checkbox
                  id={`impact-${impact}`}
                  checked={filters.impactType.includes(impact)}
                  onCheckedChange={(checked) => 
                    updateArrayFilter('impactType', impact, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`impact-${impact}`} 
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {impact}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Date Range Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="date-from" className="text-xs text-muted-foreground">From</Label>
              <Input
                id="date-from"
                type="date"
                value={filters.dateRange.from}
                onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, from: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date-to" className="text-xs text-muted-foreground">To</Label>
              <Input
                id="date-to"
                type="date"
                value={filters.dateRange.to}
                onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, to: e.target.value })}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Saved Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Filter name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="text-sm"
              />
              <Button 
                size="sm" 
                onClick={saveCurrentFilters}
                disabled={!filterName.trim()}
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
            {savedFilters.length > 0 && (
              <div className="space-y-1">
                {savedFilters.map((filter, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm"
                    onClick={() => {/* Load saved filter logic */}}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reset Filters Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClearFilters}
          disabled={activeFiltersCount === 0}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset All Filters
        </Button>
      </div>
    </div>
  )
}
