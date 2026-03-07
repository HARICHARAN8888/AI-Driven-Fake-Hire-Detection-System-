import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthGuard from '@/components/AuthGuard'
import CyberAIChatbot from '@/components/Chatbot'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AI-Driven Fake Hire Detection System - Preventing Recruitment Scams',
  description: 'AI-Powered Fake Hire & Recruitment Scam Intelligence Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen bg-cyber-gradient text-[#EAEAF0] antialiased`}>
        <div className="flex flex-col min-h-screen">
            <header className="glass-glow z-40 bg-[#070718]/80 backdrop-blur-md sticky top-0 w-full p-4 flex justify-between items-center border-b border-[#6C63FF]/30">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#6C63FF] shadow-[0_0_15px_#6C63FF] animate-pulse"></div>
                    <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#00D1FF]">
                        CYBER AI
                    </span>
                </div>
                <nav className="space-x-6 text-sm font-medium">
                    <a href="/candidate" className="hover:text-[#00D1FF] transition-colors">Candidate Tools</a>
                    <a href="/recruiter" className="hover:text-[#6C63FF] transition-colors">Recruiter Registry</a>
                    <a href="/admin" className="hover:text-[#FF4D6D] transition-colors">Admin Console</a>
                </nav>
            </header>
            
            <main className="flex-1 container mx-auto px-6 py-8">
              {children}
            </main>
            <CyberAIChatbot />
            
            <footer className="glass border-t border-[#6C63FF]/20 p-6 text-center text-xs text-gray-500 mt-auto">
                AI-Driven Fake Hire Detection System &copy; {new Date().getFullYear()} - Identifying and Preventing Recruitment Scams
            </footer>
        </div>
      </body>
    </html>
  )
}
