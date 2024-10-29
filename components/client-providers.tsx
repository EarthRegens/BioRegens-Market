'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Providers = dynamic(
  () => import('@/components/providers').then(mod => mod.Providers),
  { ssr: false }
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading state if you prefer
  }

  return <Providers>{children}</Providers>
} 