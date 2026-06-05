'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ThemeSwitcher } from './ThemeSwitcher'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/40 border-b border-border dark:border-surface-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline text-slate-900 dark:text-white">Lopam AI</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-slate-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                whileHover={{ color: '#10B981' }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link href="/auth">
              <Button size="sm" className="hidden sm:flex">
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 flex flex-col gap-3 pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-slate-950 dark:text-white font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/auth" className="w-full" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
