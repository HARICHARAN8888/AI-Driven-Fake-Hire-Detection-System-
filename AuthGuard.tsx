'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children, requiredRole = 'Admin' }: { children: React.ReactNode, requiredRole?: string }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Basic Supabase Auth token check mock/implementation
    const token = localStorage.getItem('supabase.auth.token')
    
    if (!token) {
      // In a real app, redirect to login
      // router.push('/login')
      
      // For demonstration, we allow development pass-through
      console.warn("AuthGuard: No token found. Bypassing for dev environment.")
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#070718]">
            <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="w-12 h-12 rounded-full border-t-2 border-[#6C63FF] animate-spin"></div>
                <p className="text-gray-400">Verifying Identity...</p>
            </div>
        </div>
    )
  }

  return <>{children}</>
}
