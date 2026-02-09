'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ]

  const currentTheme = themes.find(t => t.name === theme) || themes[0]

  const toggleTheme = () => {
    const currentIndex = themes.findIndex(t => t.name === theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex].name as any)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9"
        title={`Current theme: ${currentTheme.label}`}
      >
        <currentTheme.icon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
