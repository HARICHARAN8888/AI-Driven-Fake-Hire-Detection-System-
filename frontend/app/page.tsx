'use client'

import { motion } from 'framer-motion'
import { ShieldAlert, Globe, Server, UserCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4 max-w-3xl"
      >
        <div className="inline-flex items-center space-x-2 bg-[#6C63FF]/10 text-[#6C63FF] px-4 py-1.5 rounded-full text-sm font-medium border border-[#6C63FF]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-pulse"></span>
            <span>Live Global Monitoring Active</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Detect & Stop <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#6C63FF]">
            Recruitment Scams
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          AI-Powered threat intelligence verifying job offers, protecting candidates, 
          and securing the global hiring ecosystem using Blockchain Trust.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl"
      >
        <div className="glass hover:glass-glow transition-all duration-300 p-6 rounded-xl flex flex-col items-center text-center space-y-4 cursor-pointer group">
          <div className="w-12 h-12 bg-[#FF4D6D]/10 rounded-full flex items-center justify-center text-[#FF4D6D] group-hover:scale-110 transition-transform">
            <ShieldAlert size={24} />
          </div>
          <h3 className="font-semibold text-lg text-[#EAEAF0]">Scam Detector</h3>
          <p className="text-sm text-gray-400">Scan emails, offers, and recruiter profiles using NLP models.</p>
        </div>

        <div className="glass hover:glass-glow transition-all duration-300 p-6 rounded-xl flex flex-col items-center text-center space-y-4 cursor-pointer group">
          <div className="w-12 h-12 bg-[#6C63FF]/10 rounded-full flex items-center justify-center text-[#6C63FF] group-hover:scale-110 transition-transform">
            <Globe size={24} />
          </div>
          <h3 className="font-semibold text-lg text-[#EAEAF0]">Phishing Radar</h3>
          <p className="text-sm text-gray-400">Analyze recruitment URLs against global threat feeds.</p>
        </div>

        <div className="glass hover:glass-glow transition-all duration-300 p-6 rounded-xl flex flex-col items-center text-center space-y-4 cursor-pointer group">
          <div className="w-12 h-12 bg-[#00D1FF]/10 rounded-full flex items-center justify-center text-[#00D1FF] group-hover:scale-110 transition-transform">
            <Server size={24} />
          </div>
          <h3 className="font-semibold text-lg text-[#EAEAF0]">AI Agents</h3>
          <p className="text-sm text-gray-400">Autonomous hunters scraping dark web & job boards 24/7.</p>
        </div>

        <div className="glass hover:glass-glow transition-all duration-300 p-6 rounded-xl flex flex-col items-center text-center space-y-4 cursor-pointer group">
          <div className="w-12 h-12 bg-[#00FFA3]/10 rounded-full flex items-center justify-center text-[#00FFA3] group-hover:scale-110 transition-transform">
            <UserCheck size={24} />
          </div>
          <h3 className="font-semibold text-lg text-[#EAEAF0]">Blockchain Trust</h3>
          <p className="text-sm text-gray-400">Immutable identity verification for genuine recruiters.</p>
        </div>
      </motion.div>

    </div>
  )
}
