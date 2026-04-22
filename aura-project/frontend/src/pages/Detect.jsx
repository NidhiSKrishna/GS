import React, { useState, useEffect } from 'react';

export default function Detect() {
  const [scanHistory, setScanHistory] = useState([]);

  useEffect(() => {
      const fetchHistory = async () => {
          try {
              const res = await fetch('http://localhost:5001/scans');
              const data = await res.json();
              if (Array.isArray(data.scans)) setScanHistory(data.scans);
          } catch (err) {
              console.error("Error fetching history:", err);
          }
      };
      fetchHistory();
  }, []);

  const aiScans = scanHistory.filter(s => s.isAiGenerated);
  const activeThreats = 27;
  const resolved = '1,498';

  const mockStream = [
      { time: '15:03:12', icon: 'fa-facebook text-blue-500', url: '.../m/x7y.../v/s44b...', conf: '99.1%', confClass: 'text-red-500', confLbl: 'Confidence (Critical)' },
      { time: '15:03:12', icon: 'fa-tiktok text-white', url: '.../m/x7y.../v/s44b...', conf: '99.1%', confClass: 'text-red-500', confLbl: 'Suspicious' },
      { time: '15:03:12', icon: 'fa-instagram text-pink-500', url: '.../m/x7y.../v/n47b...', conf: '95.2%', confClass: 'text-orange-400', confLbl: 'Suspicious' },
      { time: '15:03:12', icon: 'fa-youtube text-red-500', url: '...tiktok.com/v/a4b...', conf: '95.2%', confClass: 'text-orange-400', confLbl: 'Suspicious' },
      { time: '15:03:18', icon: 'fa-telegram text-blue-400', url: '...tiktok.com/v/a4b...', conf: '89.5%', confClass: 'text-yellow-400', confLbl: 'Caution' },
      { time: '15:03:17', icon: 'fa-telegram text-blue-400', url: '...msh.com/v/a4b...', conf: '89.5%', confClass: 'text-yellow-400', confLbl: 'Caution' },
      { time: '15:03:39', icon: 'fa-instagram text-pink-500', url: '...tiktok.com/v/a4b...', conf: '89.5%', confClass: 'text-yellow-400', confLbl: 'Caution' },
      { time: '15:03:35', icon: 'fa-youtube text-red-500', url: '...msh.com/v/a4b...', conf: '89.5%', confClass: 'text-yellow-400', confLbl: 'Caution' },
      { time: '15:03:24', icon: 'fa-telegram text-blue-400', url: '...msh.com/v/a4b...', conf: '89.5%', confClass: 'text-yellow-400', confLbl: 'Caution' },
  ];

  return (
    <main className="content-area p-4 bg-[#0a0f1a] min-h-screen text-slate-300">
      <section className="animate-fade-in flex flex-col h-full gap-4">
        
        {/* Top Row: Map & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[350px]">
            
            {/* GLOBAL THREAT MAP */}
            <div className="lg:col-span-8 panel border border-slate-700 bg-[#0d1424]/80 flex flex-col p-4 rounded shadow-lg relative overflow-hidden">
                <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-bold mb-4 flex items-center">
                    <i className="fa-solid fa-earth-americas mr-2"></i> GLOBAL THREAT MAP
                </h3>
                
                <div className="flex-1 flex relative">
                    <div className="w-2/3 h-full relative" style={{
                        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        filter: 'invert(1) opacity(0.3) sepia(1) hue-rotate(180deg) saturate(3)'
                    }}>
                        {/* Mock Map Nodes & Lines */}
                        <div className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red] top-[30%] left-[20%]"></div>
                        <div className="absolute w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_orange] top-[40%] left-[45%]"></div>
                        <div className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red] top-[35%] left-[50%]"></div>
                        
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(255,0,0,0.5))' }}>
                            <path d="M 20% 30% Q 30% 20% 45% 40%" fill="none" stroke="rgba(255,0,0,0.4)" strokeWidth="1.5" />
                            <path d="M 45% 40% Q 48% 30% 50% 35%" fill="none" stroke="rgba(255,165,0,0.4)" strokeWidth="1.5" />
                        </svg>
                    </div>

                    <div className="w-1/3 flex flex-col justify-center items-end pr-8 gap-6 border-l border-slate-700/50 pl-6">
                        <div className="text-right">
                            <div className="text-xs text-slate-400 tracking-wider">Active Threats:</div>
                            <div className="text-3xl font-bold text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">27</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-400 tracking-wider">Resolved:</div>
                            <div className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">1,498</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-400 tracking-wider">Global Scans:</div>
                            <div className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">1.5M+</div>
                        </div>
                        <div className="text-right mt-2">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 border border-slate-700 px-3 py-1 rounded">LIVE UPDATING</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTIVE ALERTS */}
            <div className="lg:col-span-4 panel border border-slate-700 bg-[#0d1424]/80 flex flex-col p-4 rounded shadow-lg overflow-y-auto">
                <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-bold mb-4 flex items-center">
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i> ACTIVE ALERTS
                </h3>
                
                <div className="flex flex-col gap-3">
                    {/* Green Alert */}
                    <div className="bg-[#0a1a15] border border-green-500/30 rounded p-3 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                        <div className="text-green-400 text-xs font-bold mb-1">@ Systems Nominal</div>
                        <div className="text-slate-300 text-xs mb-2">No active threats detected.</div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider">JUST NOW</div>
                    </div>
                    
                    {/* Red Alert */}
                    <div className="bg-[#1a0a0f] border border-red-500/30 rounded p-3 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        <div className="text-red-500 text-xs font-bold mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-circle-exclamation"></i> CRITICAL: Known Victim ID Detected
                        </div>
                        <div className="text-slate-300 text-[11px] mb-2 leading-relaxed">
                            Victim Identifier ID 17515723-4256-43393333563767?!
                        </div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider">JUST 2026, 12:35 AM</div>
                    </div>

                    {/* Orange Alert */}
                    <div className="bg-[#1a130a] border border-orange-500/30 rounded p-3 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                        <div className="text-orange-400 text-xs font-bold mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-triangle-exclamation"></i> HIGH: Synthetic Media Anomaly
                        </div>
                        <div className="text-slate-300 text-[11px] mb-2 leading-relaxed truncate">
                            GAN-generated signature mismatch the GAN-synthetic media in action-analysis...
                        </div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider">JUST 2026, 13:55 AM</div>
                    </div>
                </div>
            </div>

        </div>

        {/* Bottom Row: Stream & Lens Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[350px]">
            
            {/* DETECTION STREAM */}
            <div className="lg:col-span-5 panel border border-slate-700 bg-[#0d1424]/80 flex flex-col p-4 rounded shadow-lg overflow-y-auto">
                <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-bold mb-4 flex items-center">
                    <i className="fa-solid fa-wave-square mr-2"></i> DETECTION STREAM
                </h3>
                
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="text-slate-500 border-b border-slate-700">
                            <th className="pb-2 font-normal">TIME</th>
                            <th className="pb-2 font-normal">PLATFORM</th>
                            <th className="pb-2 font-normal">MASKED URL</th>
                            <th className="pb-2 font-normal">CONFIDENCE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStream.map((row, idx) => (
                            <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                <td className="py-2 text-slate-400 font-mono text-[11px]">{row.time}</td>
                                <td className="py-2 text-center"><i className={`fa-brands ${row.icon} text-sm`}></i></td>
                                <td className="py-2 text-slate-400 font-mono text-[11px]">{row.url}</td>
                                <td className={`py-2 font-mono text-[11px] ${row.confClass}`}>
                                    {row.conf} <span className="opacity-80">({row.confLbl})</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* WHY NOT GOOGLE LENS */}
            <div className="lg:col-span-7 panel border border-slate-700 bg-[#0d1424]/80 flex flex-col p-4 rounded shadow-lg">
                <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-bold mb-4 flex items-center">
                    <i className="fa-solid fa-code-compare mr-2"></i> WHY NOT GOOGLE LENS?
                </h3>
                
                <div className="flex-1 flex flex-col justify-around px-4">
                    
                    {/* Top Flow */}
                    <div className="flex items-center gap-4 border-b border-slate-700/50 pb-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded overflow-hidden border-2 border-white relative">
                                <img src="https://i.pravatar.cc/150?img=47" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 border border-white/50 m-1"></div>
                            </div>
                            <div className="text-[10px] font-bold">Google Lens</div>
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center">
                            <div className="h-[2px] w-full bg-cyan-600 relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-cyan-600"></div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded overflow-hidden border border-slate-600">
                                <img src="https://i.pravatar.cc/150?img=47" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-[10px] font-bold">Exact-face</div>
                        </div>
                    </div>

                    {/* Bottom Flow */}
                    <div className="pt-2">
                        <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">OUR DIFFERENTIATOR</div>
                        <p className="text-[11px] text-slate-300 mb-4 leading-relaxed">
                            Google Lens finds <span className="font-bold">exact matches</span>.<br/>
                            We find <span className="font-bold text-cyan-400">manipulated copies</span> — faces grafted onto bodies, expression-swapped deepfakes, GAN-generated from scratch.
                        </p>

                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-14 h-14 rounded overflow-hidden border border-slate-600">
                                    <img src="https://i.pravatar.cc/150?img=41" className="w-full h-full object-cover" style={{ filter: 'hue-rotate(45deg)' }} />
                                </div>
                                <div className="text-[10px] text-slate-400">Expression-swap</div>
                            </div>
                            
                            <i className="fa-solid fa-arrow-right text-cyan-600 text-sm"></i>
                            
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-14 h-14 rounded overflow-hidden border border-slate-600">
                                    <img src="https://i.pravatar.cc/150?img=41" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-[10px] text-slate-400">Face-graft</div>
                            </div>

                            <i className="fa-solid fa-arrow-right text-cyan-600 text-sm"></i>

                            <div className="flex flex-col items-center gap-2">
                                <div className="w-14 h-14 rounded overflow-hidden border border-slate-600">
                                    <img src="https://i.pravatar.cc/150?img=41" className="w-full h-full object-cover" style={{ filter: 'contrast(150%) blur(1px)' }} />
                                </div>
                                <div className="text-[10px] text-slate-400">GAN-noise filters</div>
                            </div>

                            <i className="fa-solid fa-arrow-right text-cyan-600 text-sm"></i>

                            <div className="flex flex-col items-center gap-2">
                                <div className="w-14 h-14 rounded overflow-hidden border border-cyan-500 shadow-[0_0_10px_rgba(0,240,255,0.4)] relative">
                                    <img src="https://i.pravatar.cc/150?img=41" className="w-full h-full object-cover" style={{ filter: 'noise(2)' }} />
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50 mix-blend-overlay pointer-events-none"></div>
                                </div>
                                <div className="text-[10px] text-cyan-400 font-bold">Deepfake</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </section>
    </main>
  );
}
