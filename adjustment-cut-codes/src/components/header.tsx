'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Bell, Settings, User, Plus, Download, BarChart3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  onAddCode: () => void
  onExport: () => void
  onShowDashboard: () => void
}

export function Header({ onAddCode, onExport, onShowDashboard }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Adjustment & Cut Codes</h1>
              <p className="text-sm text-muted-foreground">WMS Management System</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={onShowDashboard}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button onClick={onAddCode}>
            <Plus className="h-4 w-4 mr-2" />
            Add Code
          </Button>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
              3
            </Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
