'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle,
  Clock,
  User,
  Settings,
  Download
} from 'lucide-react'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationsProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
  onClearAll: () => void
}

export function NotificationDropdown({ 
  notifications, 
  onMarkAsRead, 
  onDismiss, 
  onClearAll 
}: NotificationsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />
      case 'info': return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getBorderColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'border-l-green-500'
      case 'warning': return 'border-l-yellow-500'
      case 'error': return 'border-l-red-500'
      case 'info': return 'border-l-blue-500'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-12 w-96 max-h-96 z-50 shadow-lg border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {unreadCount} new
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onClearAll}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-l-4 hover:bg-muted/50 transition-colors ${
                        getBorderColor(notification.type)
                      } ${!notification.read ? 'bg-muted/20' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-foreground">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              
                              {notification.action && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => {
                                    notification.action!.onClick()
                                    onMarkAsRead(notification.id)
                                  }}
                                >
                                  {notification.action.label}
                                </Button>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 ml-2">
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDismiss(notification.id)}
                                className="h-6 w-6 opacity-60 hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatTimeAgo(notification.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

// Mock notification generator for demo
export const createMockNotifications = (): Notification[] => [
  {
    id: '1',
    title: 'New Code Added',
    message: 'ADJ003 has been successfully created for DC-001',
    type: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    action: {
      label: 'View Code',
      onClick: () => console.log('View ADJ003')
    }
  },
  {
    id: '2',
    title: 'Bulk Archive Completed',
    message: '15 codes have been archived successfully',
    type: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false
  },
  {
    id: '3',
    title: 'Validation Warning',
    message: 'Duplicate code detected: CUT005 already exists in RedPrairie PROD',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    action: {
      label: 'Resolve',
      onClick: () => console.log('Resolve duplicate')
    }
  },
  {
    id: '4',
    title: 'Export Failed',
    message: 'CSV export failed due to server timeout. Please try again.',
    type: 'error',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    action: {
      label: 'Retry Export',
      onClick: () => console.log('Retry export')
    }
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 11 PM to 1 AM EST',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
]
