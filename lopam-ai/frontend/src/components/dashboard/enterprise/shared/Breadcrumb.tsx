'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm mb-6">
      <Link href="/dashboard/admin" className="flex items-center text-blue-400 hover:text-blue-300 transition">
        <Home className="w-4 h-4 mr-1" />
        Dashboard
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="w-4 h-4 text-gray-500" />
          {item.href ? (
            <Link href={item.href} className="text-blue-400 hover:text-blue-300 transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-300">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
