'use client'

import { Button } from '@/components/ui/button'
import { Trash2, Archive, X } from 'lucide-react'

interface BulkActionsBarProps {
  selectedCount: number
  onDelete: () => void
  onArchive: () => void
  onClearSelection: () => void
}

export function BulkActionsBar({ selectedCount, onDelete, onArchive, onClearSelection }: BulkActionsBarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onArchive}>
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onClearSelection}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
