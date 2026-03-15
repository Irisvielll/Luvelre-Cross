import React, { useState, useEffect, useRef } from 'react';
import { Mail, Book, Send, Coffee, ExternalLink, ShieldCheck, X, User, MessageSquare, Star, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [email, setSubEmail] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are the AI persona of Luvelre Cross, a Technical Noir novelist. 
      Your tone is mysterious, intellectual, and slightly gothic. 
      You are an "Architect of Shadows". 
      Answer the following message from a reader: "${userMsg}"`;

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ parts: [{ text: prompt }] }]
      });
      const responseText = result.text;
      
      setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => [...prev, { role: 'model', text: "The transmission was interrupted by the void. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const libraryPlatforms = [
    { name: "RoyalRoad", url: "https://www.royalroad.com/profile/829015" },
    { name: "Wattpad", url: "https://www.wattpad.com/user/EmilKon" },
    { name: "ScribbleHub", url: "https://www.scribblehub.com/profile/230937/luvelre/" },
    { name: "Inkitt", url: "https://www.inkitt.com/Luvelre" },
  ];

  const myBooks = [
    { title: "The Obsidian Needle", year: "2024", cover: "https://picsum.photos/seed/book1/400/600", description: "A descent into the neon-lit abyss of a dying world." },
    { title: "Neon Gothic", year: "2023", cover: "https://picsum.photos/seed/book2/400/600", description: "Where circuitry meets the sacred and the profane." },
    { title: "Circuit Breaker", year: "2022", cover: "https://picsum.photos/seed/book3/400/600", description: "The last ghost in the machine seeks redemption." },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-white selection:text-black overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Background Stars */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60"></div>
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Top Banner */}
      <div className="fixed top-0 left-0 w-full z-40 bg-white/5 backdrop-blur-md border-b border-white/10 py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-[10px] uppercase tracking-[0.5em] text-white/40">
              KMCEI PRODUCTIONS // NOVELIST ARCHIVE // LUVELRE CROSS // KMCEI PRODUCTIONS // NOVELIST ARCHIVE // LUVELRE CROSS
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        
        {/* Header */}
        <header className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-9xl font-serif font-bold mb-4 italic tracking-tighter">
              Luvelre Cross
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-white/20"></div>
              <p className="text-xs uppercase tracking-[0.8em] text-white/40">
                Architect of <span className="text-[#e2c275]">Shadows</span>
              </p>
              <div className="h-[1px] w-12 bg-white/20"></div>
            </div>
          </motion.div>
        </header>

        {/* Profile Section */}
        <section className="mb-48 grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs uppercase tracking-widest text-white/60 mb-8 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20"></span> 01. Profile
            </h2>
            <p className="text-2xl leading-relaxed font-light italic font-serif text-white/80">
              "A broke college student that loves to write stories"
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-end"
          >
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-12 py-5 bg-white text-black text-sm uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-transparent hover:text-white border border-white transition-all duration-500"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Ask me</span>
            </button>
            
            <div className="mt-12 flex flex-wrap justify-end gap-3">
              {libraryPlatforms.map((platform, idx) => (
                <a 
                  key={idx}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/10 rounded-full text-[10px] hover:bg-white hover:text-black transition-all"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Letters Section */}
        <section className="mb-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 relative overflow-hidden"
          >
            <h2 className="text-xs uppercase tracking-widest text-white/60 mb-10 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20"></span> 02. Transmissions
            </h2>
            <p className="text-lg font-serif italic mb-10 text-white/70">
              Subscribe for my quotes and thoughts.
            </p>
            <div className="flex items-center border-b border-white/20 pb-4">
              <input 
                type="email" 
                placeholder="ENTER_EMAIL_ADDRESS"
                className="bg-transparent border-none outline-none w-full text-sm tracking-widest"
                value={email}
                onChange={(e) => setSubEmail(e.target.value)}
              />
              <button className="p-2 text-white/40 hover:text-white transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Patronage Section */}
        <section className="mb-48 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs uppercase tracking-widest text-white/60 mb-16 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-white/20"></span> 03. Patronage
            </h2>
            <div className="max-w-md mx-auto mb-24">
              <p className="text-xl italic font-serif text-white/80 mb-12">
                "Art is the only thing that survives the machine."
              </p>
              <a 
                href="https://ko-fi.com/kmcei" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-16 py-6 bg-white/5 border border-white/10 hover:border-white/40 transition-all uppercase tracking-[0.4em] text-sm"
              >
                <Coffee className="w-6 h-6" />
                Support me
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {myBooks.map((book, idx) => (
                <div key={idx} className="group">
                  <div className="aspect-[2/3] mb-6 overflow-hidden border border-white/5 bg-white/5">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-lg font-serif italic mb-2">{book.title}</h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4">{book.year}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pt-32 border-t border-white/5 text-center">
          <p className="text-[9px] text-white/10 uppercase tracking-[0.6em]">
            © 2026 Luvelre Cross // KMCEI // Built in the Sea of Stars
          </p>
        </footer>

      </main>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 p-12"
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-all"
              >
                <X className="w-8 h-8" />
              </button>

              <h2 className="text-4xl font-serif italic mb-2">Initialize Contact</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-8">Direct link to the Architect's mind</p>

              <div className="h-[400px] overflow-y-auto mb-8 space-y-6 pr-4 custom-scrollbar">
                {chatHistory.length === 0 && (
                  <div className="text-center py-12 text-white/20 italic font-serif">
                    "The void is silent. Speak, and it shall answer."
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-white text-black font-medium' 
                        : 'bg-white/5 border border-white/10 text-white/80 italic font-serif'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-4">
                      <Loader2 className="w-4 h-4 animate-spin text-white/40" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="TRANSMIT_MESSAGE..."
                  className="w-full bg-white/5 border border-white/10 px-6 py-5 text-sm outline-none focus:border-white/30 transition-all pr-16"
                />
                <button 
                  type="submit"
                  disabled={isTyping}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all disabled:opacity-20"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
