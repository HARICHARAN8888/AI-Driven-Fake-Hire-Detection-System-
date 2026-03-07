'use client'

import { useState } from 'react'
import { Hexagon, CheckCircle2, ShieldAlert } from 'lucide-react'

export default function RecruiterRegistry() {
  const [wallet, setWallet] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!wallet.startsWith('0x')) {
        setResult({ success: false });
        setLoading(false);
        return;
      }
      
      const response = await fetch(`http://localhost:8000/recruiter/verify/${wallet}`);
      
      if (!response.ok) {
        setResult({ success: false });
        return;
      }
      
      const data = await response.json();
      setResult({
          success: true,
          fullName: data.full_name,
          companyDomain: data.company_domain || "verified-partner.com",
          isVerified: data.verified_badge,
          trustScore: data.trust_score
      });
    } catch (err) {
      console.error(err);
      setResult({ success: false });
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] to-[#00D1FF]">
            Verified Recruiter Registry
        </h1>
        <p className="text-gray-400">Powered by Polygon Blockchain to prevent impersonation and identity theft.</p>
      </div>

      <div className="glass p-8 rounded-2xl flex flex-col items-center space-y-6">
        <div className="w-16 h-16 bg-[#00FFA3]/10 rounded-full flex items-center justify-center text-[#00FFA3] shadow-[0_0_30px_rgba(0,255,163,0.3)]">
            <Hexagon size={32} />
        </div>
        
        <form onSubmit={handleVerify} className="w-full max-w-lg flex flex-col space-y-4">
            <input 
                type="text" 
                placeholder="Enter Recruiter Polygon Wallet ID (0x...)" 
                required
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full bg-[#0B0B1A]/80 border border-[#00FFA3]/30 rounded-lg px-4 py-3 focus:outline-none focus:border-[#00FFA3] transition-colors font-mono text-sm"
            />
            <button type="submit" className="bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] transition-all">
                Validate Identity
            </button>
        </form>

        {result && (
            <div className="w-full max-w-lg mt-6 pt-6 border-t border-gray-800">
                {result.success ? (
                    <div className="flex items-start space-x-4 bg-[#00FFA3]/10 p-4 rounded-xl border border-[#00FFA3]/30">
                        <CheckCircle2 className="text-[#00FFA3] mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="text-[#00FFA3] font-bold">Identity Confirmed</h4>
                            <p className="text-sm text-gray-300 mt-1">
                                <span className="text-white font-medium">{result.fullName}</span> is an official recruiter for <span className="text-white font-medium">{result.companyDomain}</span>.
                            </p>
                            <div className="mt-3 flex items-center space-x-2">
                                <div className="text-xs bg-[#00FFA3]/20 px-2 py-1 rounded text-[#00FFA3]">Blockchain Verified</div>
                                <div className="text-xs bg-[#6C63FF]/20 px-2 py-1 rounded text-[#6C63FF]">Trust Score: {result.trustScore}/100</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start space-x-4 bg-[#FF4D6D]/10 p-4 rounded-xl border border-[#FF4D6D]/30">
                        <ShieldAlert className="text-[#FF4D6D] mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="text-[#FF4D6D] font-bold">Unrecognized Identity</h4>
                            <p className="text-sm text-gray-300 mt-1">This wallet address is not registered in our global trust network. Proceed with extreme caution.</p>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>

    </div>
  )
}
