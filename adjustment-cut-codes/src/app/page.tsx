'use client'

import { useState, useMemo } from 'react'
import { CodeTable } from '@/components/code-table'
import { AddCodeDialog } from '@/components/add-code-dialog'
import { BulkActionsBar } from '@/components/bulk-actions-bar'
import { StatsCards } from '@/components/stats-cards'
import { SidebarFilters } from '@/components/sidebar-filters'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, BarChart3, TrendingUp, Activity } from 'lucide-react'

// Mock data - in real app this would come from API
const mockCodes = [
  {
    id: '1',
    code: 'ADJ001',
    description: 'Inventory Count Adjustment',
    wms: 'HighJump',
    instance: 'PROD',
    facility: 'DC-001',
    customer: 'All Customers',
    category: 'Adjustment',
    impactType: 'AMC',
    status: 'Active',
    createdDate: '2024-01-15',
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    code: 'CUT001',
    description: 'Product Discontinued',
    wms: 'RedPrairie',
    instance: 'PROD',
    facility: 'DC-002',
    customer: 'Customer A',
    category: 'Cut',
    impactType: 'Customer',
    status: 'Active',
    createdDate: '2024-01-10',
    lastModified: '2024-01-20'
  },
  {
    id: '3',
    code: 'ADJ002',
    description: 'Damage Adjustment',
    wms: 'JDA',
    instance: 'ARCHIVE',
    facility: 'DC-003',
    customer: 'All Customers',
    category: 'Adjustment',
    impactType: 'No Impact',
    status: 'Archived',
    createdDate: '2023-12-01',
    lastModified: '2024-01-01'
  },
  {
    id: '4',
    code: 'CUT002',
    description: 'Seasonal Item End',
    wms: 'Vision',
    instance: 'PROD',
    facility: 'DC-001',
    customer: 'Customer B',
    category: 'Cut',
    impactType: 'Customer',
    status: 'Active',
    createdDate: '2024-01-05',
    lastModified: '2024-01-25'
  }
]

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

export default function HomePage() {
  const [selectedCodes, setSelectedCodes] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    status: [],
    wms: [],
    facility: [],
    category: [],
    impactType: [],
    customer: [],
    dateRange: { from: '', to: '' }
  })

  // Advanced filter and search logic
  const filteredCodes = useMemo(() => {
    return mockCodes.filter(code => {
      // Search query filter
      const matchesSearch = filters.searchQuery === '' || 
        code.code.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        code.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        code.wms.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        code.facility.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        code.customer.toLowerCase().includes(filters.searchQuery.toLowerCase())
      
      // Status filter
      const matchesStatus = filters.status.length === 0 || 
        filters.status.some(status => code.status.toLowerCase() === status.toLowerCase())
      
      // WMS filter
      const matchesWms = filters.wms.length === 0 || 
        filters.wms.includes(code.wms)
      
      // Facility filter
      const matchesFacility = filters.facility.length === 0 || 
        filters.facility.includes(code.facility)
      
      // Category filter
      const matchesCategory = filters.category.length === 0 || 
        filters.category.includes(code.category)
      
      // Impact Type filter
      const matchesImpact = filters.impactType.length === 0 || 
        filters.impactType.includes(code.impactType)
      
      // Date range filter
      const matchesDateRange = (!filters.dateRange.from && !filters.dateRange.to) ||
        (filters.dateRange.from && code.createdDate >= filters.dateRange.from) &&
        (filters.dateRange.to && code.createdDate <= filters.dateRange.to)
      
      return matchesSearch && matchesStatus && matchesWms && 
             matchesFacility && matchesCategory && matchesImpact && matchesDateRange
    })
  }, [filters])

  // Enhanced stats calculation
  const stats = useMemo(() => {
    const total = filteredCodes.length
    const active = filteredCodes.filter(c => c.status === 'Active').length
    const archived = filteredCodes.filter(c => c.status === 'Archived').length
    const duplicates = 0 // Would be calculated based on duplicate detection logic
    
    return { total, active, archived, duplicates }
  }, [filteredCodes])

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.searchQuery) count++
    if (filters.status.length > 0) count++
    if (filters.wms.length > 0) count++
    if (filters.facility.length > 0) count++
    if (filters.category.length > 0) count++
    if (filters.impactType.length > 0) count++
    if (filters.dateRange.from || filters.dateRange.to) count++
    return count
  }, [filters])

  const handleBulkDelete = () => {
    // Implementation for bulk delete
    console.log('Bulk delete:', selectedCodes)
    setSelectedCodes([])
  }

  const handleBulkArchive = () => {
    // Implementation for bulk archive
    console.log('Bulk archive:', selectedCodes)
    setSelectedCodes([])
  }

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      status: [],
      wms: [],
      facility: [],
      category: [],
      impactType: [],
      customer: [],
      dateRange: { from: '', to: '' }
    })
  }

  const handleExport = () => {
    console.log('Export data:', filteredCodes)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onAddCode={() => setIsAddDialogOpen(true)}
        onExport={handleExport}
        onShowDashboard={() => setShowDashboard(!showDashboard)}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Filters */}
        <SidebarFilters 
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Dashboard View */}
          {showDashboard && (
            <div className="p-6 border-b bg-muted/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Codes</p>
                      <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Archived</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.archived}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Filtered</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Filters Applied</p>
                      <p className="text-2xl font-bold text-purple-600">{activeFiltersCount}</p>
                    </div>
                    <Search className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
              {/* Quick Search Bar */}
              <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Quick search..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                    className="pl-10"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {filteredCodes.length} of {mockCodes.length} codes
                </div>
              </div>

              {/* Bulk Actions Bar */}
              {selectedCodes.length > 0 && (
                <BulkActionsBar
                  selectedCount={selectedCodes.length}
                  onDelete={handleBulkDelete}
                  onArchive={handleBulkArchive}
                  onClearSelection={() => setSelectedCodes([])}
                />
              )}

              {/* Main Table */}
              <div className="bg-card rounded-lg border">
                <CodeTable
                  codes={filteredCodes}
                  selectedCodes={selectedCodes}
                  onSelectionChange={setSelectedCodes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Code Dialog */}
      <AddCodeDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  )
}
