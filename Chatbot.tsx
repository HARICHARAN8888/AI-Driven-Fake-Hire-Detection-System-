'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, X, Bot, ShieldAlert, ScanEye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CyberAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am Cyber AI. I can check job offers, verify recruiters, or answer questions about recruitment safety. How can I protect you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulating AI Response logic
    setTimeout(() => {
      let botResponse = ""
      const q = userMessage.text.toLowerCase()
      
      if (q.includes("verify") || q.includes("check")) {
        botResponse = "I can certainly help with that. Please paste the job URL or recruiter's email address here, and I'll run it through my threat intelligence scanner."
      } else if (q.includes("scam") || q.includes("fake")) {
        botResponse = "Be careful! Common signs of recruitment scams include: asking for payment for 'training', immediate job offers without interviews, and use of Telegram/WhatsApp for official business."
      } else {
        botResponse = "I've analyzed your query. As your Cyber AI protector, I recommend always verifying recruiter IDs through our Blockchain Registry before sharing personal documents."
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass w-80 md:w-96 h-[450px] mb-4 rounded-2xl flex flex-col overflow-hidden shadow-2xl border-[#6C63FF]/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="text-white" size={20} />
                <span className="font-bold text-white text-sm">CYBER AI ASSISTANT</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#070718]/90">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'user' ? 'bg-[#6C63FF] text-white shadow-[0_2px_10px_rgba(108,99,255,0.3)]' : 'bg-white/5 text-gray-200 border border-white/10'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0B0B1A] border-t border-white/5 flex items-center space-x-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Cyber AI..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#6C63FF]"
              />
              <button onClick={handleSend} className="bg-[#6C63FF] p-2 rounded-lg text-white hover:bg-[#5B54E6]">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(108,99,255,0.5)] hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <ScanEye size={32} className="group-hover:animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FFA3] rounded-full border-2 border-[#070718] animate-ping"></div>
          </div>
        )}
      </button>
    </div>
  )
}

