import React, { useState, useEffect } from 'react';

export default function RiskMonitor() {
  const [scanHistory, setScanHistory] = useState([]);
  const [localExposures, setLocalExposures] = useState([]);

  useEffect(() => {
      const fetchHistory = async () => {
          try {
              const res = await fetch('http://localhost:5001/scans');
              const data = await res.json();
              if (Array.isArray(data)) setScanHistory(data);
          } catch (err) {
              console.error("Error fetching history:", err);
          }
      };
      fetchHistory();

      // Read local exposures
      const loadExposures = () => {
          const stored = localStorage.getItem("mockExposures");
          if (stored) {
              setLocalExposures(JSON.parse(stored));
          }
      };
      loadExposures();

      // Listen for updates from Identity Vault
      window.addEventListener('exposuresUpdated', loadExposures);
      return () => window.removeEventListener('exposuresUpdated', loadExposures);
  }, []);

  const threatsBlocked = scanHistory.filter(s => s.isAiGenerated).length;
  const globalScans = scanHistory.length > 0 ? (1.5 + (scanHistory.length / 10000)).toFixed(2) + 'M' : '1.5M';

  return (
    <main className="content-area">
      <section className="tab-content active animate-fade-in" style={{ display: 'flex' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bento-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
            
            {/* Left Column - Victim Persona Risk Monitor */}
            <div className="flex flex-col gap-4">
                <div className="panel border border-slate-700/50 flex-1">
                    <h3 className="panel-heading uppercase tracking-widest text-slate-400 mb-6 text-xs font-semibold">VICTIM PERSONA RISK MONITOR</h3>
                    
                    <div className="flex flex-col gap-4">
                        {/* Student */}
                        <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-lg shadow-[0_0_10px_rgba(255,51,102,0.2)]">🎓</div>
                                <div>
                                    <div className="text-slate-200 text-sm font-semibold">Students</div>
                                    <div className="text-red-400 text-[10px] uppercase tracking-wider font-bold">High risk</div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-slate-700 border-t-red-500 transform rotate-45"></div>
                        </div>
                        {/* Job Seekers */}
                        <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-lg shadow-[0_0_10px_rgba(255,51,102,0.2)]">💼</div>
                                <div>
                                    <div className="text-slate-200 text-sm font-semibold">Job Seekers</div>
                                    <div className="text-red-400 text-[10px] uppercase tracking-wider font-bold">High risk</div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-slate-700 border-t-red-500 border-r-red-500 transform rotate-12"></div>
                        </div>
                        {/* Journalists */}
                        <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-lg shadow-[0_0_10px_rgba(255,51,102,0.2)]">📰</div>
                                <div>
                                    <div className="text-slate-200 text-sm font-semibold">Journalists</div>
                                    <div className="text-red-400 text-[10px] uppercase tracking-wider font-bold">High risk</div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-slate-700 border-t-red-500 border-r-red-500 border-b-red-500 transform -rotate-45"></div>
                        </div>
                        {/* Politicians */}
                        <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-lg shadow-[0_0_10px_rgba(255,51,102,0.2)]">🏛️</div>
                                <div>
                                    <div className="text-slate-200 text-sm font-semibold">Politicians</div>
                                    <div className="text-red-400 text-[10px] uppercase tracking-wider font-bold">High risk</div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-slate-700 border-t-red-500 border-r-red-500 transform rotate-90"></div>
                        </div>
                        {/* Activists */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-lg shadow-[0_0_10px_rgba(255,153,0,0.2)]">✊</div>
                                <div>
                                    <div className="text-slate-200 text-sm font-semibold">Activists</div>
                                    <div className="text-orange-400 text-[10px] uppercase tracking-wider font-bold">Medium risk</div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-slate-700 border-t-orange-500 transform -rotate-12"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Column - Mapping Misuse */}
            <div className="flex flex-col gap-4">
                <div className="panel border border-slate-700/50 flex-1 flex flex-col max-h-[800px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
                        <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                            <i className="fa-solid fa-network-wired"></i> Threat Intel: Misuse Mapping
                        </h3>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        {/* Persona 1 */}
                        <div className="bg-[#0d1424] p-4 rounded border border-slate-700/50 hover:border-slate-500/50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                                    <i className="fa-solid fa-user-tie"></i>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-200">Executive Impersonation</h4>
                                    <div className="text-[10px] text-slate-500 font-mono">Target: LinkedIn Network</div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-900/80 rounded p-3 text-xs flex flex-col gap-2 relative overflow-hidden">
                                <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-slate-700"></div>
                                
                                <div className="flex items-start gap-3 relative z-10 pl-4">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_red]"></div>
                                    <div className="flex-1">
                                        <span className="text-red-400 font-bold">Vector:</span> Deepfake Video Call setup targeting HR via engineered DMs.
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 relative z-10 pl-4">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_5px_green]"></div>
                                    <div className="flex-1">
                                        <span className="text-green-400 font-bold">AURA:</span> Real-time pHash interception. Call blocked. Auto-DMCA filed.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Persona 2 */}
                        <div className="bg-[#0d1424] p-4 rounded border border-slate-700/50 hover:border-slate-500/50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30">
                                    <i className="fa-solid fa-camera"></i>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-200">Independent Creator</h4>
                                    <div className="text-[10px] text-slate-500 font-mono">Target: Instagram / Telegram</div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-900/80 rounded p-3 text-xs flex flex-col gap-2 relative overflow-hidden">
                                <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-slate-700"></div>
                                
                                <div className="flex items-start gap-3 relative z-10 pl-4">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_red]"></div>
                                    <div className="flex-1">
                                        <span className="text-red-400 font-bold">Vector:</span> Non-consensual explicit face-swap distributed via Telegram rings.
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 relative z-10 pl-4">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_5px_orange]"></div>
                                    <div className="flex-1">
                                        <span className="text-orange-400 font-bold">AURA:</span> Flagged across 14 nodes. Awaiting user consent for mass takedown.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto text-center border border-cyan-500/20 bg-cyan-500/5 rounded p-3">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                                Most tools ask: "Is this fake?"<br/>
                                <span className="text-cyan-400 font-bold">We ask: "Is this you — and where else?"</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Active Protection Monitor */}
            <div className="flex flex-col gap-4">
                <div className="panel border border-slate-700/50 flex-1">
                    <h3 className="panel-heading uppercase tracking-widest text-slate-400 mb-6 text-xs font-semibold">ACTIVE PROTECTION MONITOR</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 pt-2">
                        <div className="bg-slate-800/40 border border-slate-700 rounded p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-[10px] text-slate-400 tracking-wider mb-2">Digital IDs Protected</div>
                            <div className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">1</div>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700 rounded p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-[10px] text-slate-400 tracking-wider mb-2">Global Scans (24h)</div>
                            <div className="text-2xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(0,255,157,0.4)]">{globalScans}</div>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700 rounded p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-[10px] text-slate-400 tracking-wider mb-2">Threats Blocked</div>
                            <div className="text-3xl font-bold text-red-400 drop-shadow-[0_0_8px_rgba(255,51,102,0.4)]">{threatsBlocked}</div>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700 rounded p-4 flex flex-col items-center justify-center text-center">
                            <div className="text-[10px] text-slate-400 tracking-wider mb-2">Platforms Monitored</div>
                            <div className="text-2xl font-bold text-orange-400 drop-shadow-[0_0_8px_rgba(255,153,0,0.4)]">12</div>
                        </div>
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono flex flex-col gap-2 border-t border-slate-700/50 pt-4">
                        <div className="flex justify-between"><span>Auto-scan:</span> <span className="text-slate-300">Weekly</span></div>
                        <div className="flex justify-between"><span>Email alerts:</span> <span className="text-slate-300">On</span></div>
                        <div className="flex justify-center mt-2 text-green-400 font-bold uppercase tracking-widest"><span className="mr-2">●</span> All systems nominal</div>
                    </div>
                </div>
            </div>

        </div>
      </section>
    </main>
  );
}
