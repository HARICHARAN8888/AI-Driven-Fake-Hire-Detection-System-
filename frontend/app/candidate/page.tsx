'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Target, ArrowRight } from 'lucide-react'

export default function CandidateTools() {
  const [url, setUrl] = useState('')
  const [riskData, setRiskData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulating API call to /api/candidate/scan
    try {
      const response = await fetch('http://localhost:8000/candidate/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });
      
      if (!response.ok) throw new Error('Scan failed');
      const data = await response.json();
      setRiskData(data);
    } catch (err) {
      console.error(err);
      // Fallback or error display
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D1FF] to-[#6C63FF]">
            Candidate Protection Suite
        </h1>
        <p className="text-gray-400">Verify job offers, recruiter domains, and emails against our global threat intelligence network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-glow p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Target className="text-[#00D1FF]" />
                <span>URL & Domain Scanner</span>
            </h2>
            <form onSubmit={handleScan} className="flex flex-col space-y-4">
                <input 
                    type="url" 
                    required
                    placeholder="e.g. https://careers-google-verify.com" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-[#0B0B1A]/50 border border-[#6C63FF]/30 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00D1FF] transition-colors"
                />
                <button 
                    disabled={loading}
                    type="submit" 
                    className="bg-[#6C63FF] hover:bg-[#5B54E6] text-white font-medium py-3 rounded-lg flex justify-center items-center space-x-2 transition-colors"
                >
                    {loading ? <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span> : <span>Scan Now</span>}
                </button>
            </form>
        </div>

        <div className="glass p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-4 border-dashed border-2 border-[#6C63FF]/20">
            <div className="w-16 h-16 bg-[#6C63FF]/10 rounded-full flex items-center justify-center text-[#6C63FF]">
                <ShieldCheck size={32} />
            </div>
            <h3 className="font-semibold text-lg">Document Verifier</h3>
            <p className="text-sm text-gray-400">Upload Offer Letter PDF to detect formatting anomalies and forged signatures.</p>
            <button className="text-[#00D1FF] text-sm font-medium hover:underline flex items-center space-x-1">
                <span>Upload Document</span> <ArrowRight size={16} />
            </button>
        </div>

      </div>

      {riskData && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border ${riskData.risk_level === 'CRITICAL' ? 'bg-[#FF4D6D]/10 border-[#FF4D6D]/50' : 'bg-[#00FFA3]/10 border-[#00FFA3]/50'}`}
        >
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <span>Threat Intelligence Report</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <p className="text-xs text-gray-500 uppercase">Risk Level</p>
                    <p className={`text-xl font-bold ${riskData.risk_level === 'CRITICAL' ? 'text-[#FF4D6D]' : 'text-[#00FFA3]'}`}>{riskData.risk_level}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase">Fraud Score</p>
                    <p className="text-xl font-bold text-white">{riskData.fraud_score} / 100</p>
                </div>
                <div className="col-span-2">
                    <p className="text-xs text-gray-500 uppercase">Recommendation</p>
                    <p className="text-md font-medium text-white">{riskData.recommended_action.replace(/_/g, ' ')}</p>
                </div>
            </div>
        </motion.div>
      )}

    </div>
  )
}
