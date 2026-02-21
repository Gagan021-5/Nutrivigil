import { createContext, useContext, useState, useEffect, useRef } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Track whether the user has manually set a preference so we don't
  // override it when the OS theme changes.
  const userHasSetPreference = useRef(!!localStorage.getItem('nutriguard-theme-manual'))

  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('nutriguard-theme')
    if (saved) return saved

    // Fallback to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }

    return 'dark' // Default to dark
  })

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('nutriguard-theme', theme)

    // Set data-theme attribute on html element
    document.documentElement.setAttribute('data-theme', theme)

    // Add theme class to body for better control
    if (theme === 'dark') {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }
  }, [theme])

  // Listen for OS-level theme changes and sync automatically unless the
  // user has already made an explicit manual choice.
  useEffect(() => {
    if (!window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e) => {
      if (!userHasSetPreference.current) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  const toggleTheme = () => {
    // Mark that the user has explicitly chosen a theme so OS changes are ignored.
    userHasSetPreference.current = true
    localStorage.setItem('nutriguard-theme-manual', '1')
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

