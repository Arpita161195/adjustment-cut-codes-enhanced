'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AddCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCodeDialog({ open, onOpenChange }: AddCodeDialogProps) {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    wms: '',
    instance: 'PROD',
    facility: '',
    customer: 'All Customers',
    category: 'Adjustment',
    impactType: 'AMC'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      code: '',
      description: '',
      wms: '',
      instance: 'PROD',
      facility: '',
      customer: 'All Customers',
      category: 'Adjustment',
      impactType: 'AMC'
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Code</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="e.g., ADJ001"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Adjustment">Adjustment</SelectItem>
                  <SelectItem value="Cut">Cut</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the code"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wms">WMS *</Label>
              <Select value={formData.wms} onValueChange={(value) => handleInputChange('wms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select WMS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HighJump">HighJump</SelectItem>
                  <SelectItem value="RedPrairie">RedPrairie</SelectItem>
                  <SelectItem value="JDA">JDA</SelectItem>
                  <SelectItem value="Vision">Vision</SelectItem>
                  <SelectItem value="PAU/APAC">PAU/APAC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instance">Instance</Label>
              <Select value={formData.instance} onValueChange={(value) => handleInputChange('instance', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PROD">PROD</SelectItem>
                  <SelectItem value="TEST">TEST</SelectItem>
                  <SelectItem value="ARCHIVE">ARCHIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facility">Facility *</Label>
              <Input
                id="facility"
                value={formData.facility}
                onChange={(e) => handleInputChange('facility', e.target.value)}
                placeholder="e.g., DC-001"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => handleInputChange('customer', e.target.value)}
                placeholder="Customer name or 'All Customers'"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="impactType">Impact Type *</Label>
            <Select value={formData.impactType} onValueChange={(value) => handleInputChange('impactType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AMC">AMC</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="No Impact">No Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Code
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
