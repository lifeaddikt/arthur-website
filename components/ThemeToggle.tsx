'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Moon from './icons/Moon'
import Sun from './icons/Sun'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='flex items-center justify-center w-12 h-6 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 transition-colors duration-200 bg-gray-200 dark:bg-gray-700'
      aria-label={theme === 'dark' ? 'Use light mode' : 'Use dark mode'}>
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-2' : '-translate-x-2'
        }`}>
        {theme === 'dark' ? (
          <Moon />
        ) : (
          <Sun />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
