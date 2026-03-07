'use client'

import { Activity, ShieldAlert, Users, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', scams: 400, prevented: 240 },
  { name: 'Tue', scams: 300, prevented: 139 },
  { name: 'Wed', scams: 550, prevented: 480 },
  { name: 'Thu', scams: 900, prevented: 890 },
  { name: 'Fri', scams: 650, prevented: 600 },
  { name: 'Sat', scams: 400, prevented: 380 },
  { name: 'Sun', scams: 800, prevented: 790 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Global Command Center</h1>
        <div className="flex items-center space-x-2 bg-[#6C63FF]/20 px-3 py-1.5 rounded text-sm text-[#6C63FF] border border-[#6C63FF]/30">
            <Activity size={16} className="animate-pulse" />
            <span>Live Threat Intelligence</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
            { label: "Active Fraud Networks", value: "14", icon: ShieldAlert, color: "#FF4D6D" },
            { label: "Verified Recruiters", value: "2,405", icon: Users, color: "#00FFA3" },
            { label: "Scams Blocked (24h)", value: "8,942", icon: ShieldAlert, color: "#00D1FF" },
            { label: "AI Confidence Avg", value: "94.2%", icon: TrendingUp, color: "#6C63FF" },
        ].map((kpi, idx) => (
            <div key={idx} className="glass p-5 rounded-xl border-l-4" style={{ borderColor: kpi.color }}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">{kpi.label}</p>
                        <h3 className="text-3xl font-bold text-white mt-1">{kpi.value}</h3>
                    </div>
                    <kpi.icon size={20} color={kpi.color} />
                </div>
            </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl col-span-2">
            <h3 className="font-semibold text-lg mb-4">Threat Vectors Detected</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0B0B1A', borderColor: '#6C63FF', borderRadius: '8px' }}
                            itemStyle={{ color: '#EAEAF0' }}
                        />
                        <Line type="monotone" dataKey="scams" stroke="#FF4D6D" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="prevented" stroke="#00FFA3" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        <div className="glass p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-4">Autonomous Agents Status</h3>
            <div className="space-y-4">
                {[
                    { name: 'Job Scam Hunter', status: 'Running', time: '5m ago' },
                    { name: 'Phishing Domain', status: 'Running', time: '1m ago' },
                    { name: 'Dark Web Monitor', status: 'Sleeping', time: '2h ago' },
                    { name: 'Network Discovery', status: 'Analyzing', time: 'Now' }
                ].map((agent, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-[#ffffff05] rounded-lg border border-white/5">
                        <div>
                            <p className="font-medium text-sm text-[#EAEAF0]">{agent.name}</p>
                            <p className="text-xs text-gray-500">Last activity: {agent.time}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${agent.status === 'Evaluating' || agent.status === 'Running' || agent.status === 'Analyzing' ? 'bg-[#00FFA3]/20 text-[#00FFA3]' : 'bg-gray-800 text-gray-400'}`}>
                            {agent.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  )
}
