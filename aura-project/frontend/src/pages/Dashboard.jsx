import React, { useState, useEffect } from 'react';

export default function Dashboard({ currentUser }) {
  const userName = currentUser?.name || 'Guest';
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);

  const fetchHistory = async () => {
      try {
          const token = localStorage.getItem('aura_token');
          if (!token) return;
          const res = await fetch('http://localhost:5001/scans', {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.scans) {
              setScanHistory(data.scans);
          }
      } catch (err) {
          console.error('Failed to fetch history:', err);
      }
  };

  useEffect(() => {
      fetchHistory();
  }, []);

  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
          setFile(selectedFile);
          setPreview(URL.createObjectURL(selectedFile));
          setScanResult(null);
      }
  };

  const handleScan = async () => {
      if (!file) return;
      setIsScanning(true);
      setScanResult(null);
      const formData = new FormData();
      formData.append('image', file);
      
      try {
          const token = localStorage.getItem('aura_token');
          const res = await fetch('http://localhost:5001/analyze', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`
              },
              body: formData
          });
          const data = await res.json();
          if (!res.ok) {
              setScanResult({ error: data.error || 'Failed to scan image' });
          } else {
              setScanResult(data);
              fetchHistory(); // refresh the list
          }
      } catch (err) {
          console.error(err);
          setScanResult({ error: 'Network error occurred while scanning' });
      } finally {
          setIsScanning(false);
      }
  };

  // Mock data for charts
  const sparklineData = [40, 60, 45, 80, 50, 90, 70, 100, 65, 85];
  
  return (
    <main className="content-area p-4 bg-[#050a10] min-h-[calc(100vh-65px)] text-slate-300 flex flex-col gap-5 overflow-y-auto">
        
        {/* HEADER & TAGLINE */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0a0f1a] p-5 rounded-lg border border-slate-700/60 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="z-10 mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-slate-100 tracking-wider flex items-center gap-3">
                    <i className="fa-solid fa-shield-virus text-cyan-400"></i>
                    DIGITAL IDENTITY SHIELD COMMAND CENTER
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-2 pl-8 border-l-2 border-cyan-500/50 ml-1">
                    Antivirus catches malware. <span className="text-cyan-400 font-bold">We catch you being used as malware.</span>
                </p>
            </div>
            
            <div className="z-10 flex gap-3">
                 <div className="bg-[#0a1a1f] border border-cyan-500/30 px-4 py-2 rounded flex flex-col items-center justify-center min-w-[90px]">
                     <span className="text-cyan-400 font-bold text-2xl drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">{scanHistory.length}</span>
                     <span className="text-[9px] text-cyan-400 uppercase tracking-widest mt-1">User Scans</span>
                 </div>
                 <div className="bg-[#1a0a0f] border border-red-500/30 px-4 py-2 rounded flex flex-col items-center justify-center min-w-[90px]">
                     <span className="text-red-500 font-bold text-2xl drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]">{scanHistory.filter(s => s.isAiGenerated).length}</span>
                     <span className="text-[9px] text-red-400 uppercase tracking-widest mt-1">Fakes</span>
                 </div>
                 <div className="bg-[#0a1a15] border border-green-500/30 px-4 py-2 rounded flex flex-col items-center justify-center min-w-[90px]">
                     <span className="text-green-500 font-bold text-2xl drop-shadow-[0_0_8px_rgba(0,255,0,0.4)]">{scanHistory.filter(s => !s.isAiGenerated).length}</span>
                     <span className="text-[9px] text-green-400 uppercase tracking-widest mt-1">Reals</span>
                 </div>
            </div>
        </header>

        {/* THREAT / HEALTH METRICS & CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Global Scans Sparkline */}
            <div className="bg-[#0a0f1a] border border-slate-700/60 p-5 rounded-lg flex flex-col shadow-lg relative group hover:border-cyan-500/40 transition-colors">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 flex items-center justify-between">
                    <span>Global Scans (24h)</span>
                    <i className="fa-solid fa-globe text-cyan-500/50"></i>
                </h3>
                <div className="text-3xl font-bold text-slate-100 mb-4">1.5M+</div>
                
                <div className="flex-1 flex items-end gap-[2px] h-16 mt-auto">
                    {sparklineData.map((h, i) => (
                        <div key={i} className="flex-1 bg-cyan-500/20 group-hover:bg-cyan-500/40 transition-all rounded-t relative overflow-hidden" style={{ height: `${h}%` }}>
                            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400"></div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Threats Blocked Timeline */}
            <div className="bg-[#0a0f1a] border border-slate-700/60 p-5 rounded-lg flex flex-col shadow-lg hover:border-red-500/40 transition-colors">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 flex items-center justify-between">
                    <span>Threats Blocked</span>
                    <i className="fa-solid fa-ban text-red-500/50"></i>
                </h3>
                <div className="text-3xl font-bold text-slate-100 mb-4">12,492</div>
                
                <div className="flex-1 flex flex-col justify-end gap-3 mt-auto">
                    <div className="w-full bg-slate-800/50 rounded-full h-1.5 flex overflow-hidden">
                        <div className="bg-red-500 h-full w-[70%]"></div>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-1.5 flex overflow-hidden">
                        <div className="bg-orange-400 h-full w-[45%]"></div>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-1.5 flex overflow-hidden">
                        <div className="bg-yellow-400 h-full w-[25%]"></div>
                    </div>
                    <div className="text-[9px] text-slate-500 font-mono mt-1 text-right">Trend: Decreasing over 72h</div>
                </div>
            </div>

            {/* Identity Vault Quick Status */}
            <div className="bg-[#0a0f1a] border border-slate-700/60 p-5 rounded-lg flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <i className="fa-solid fa-fingerprint text-9xl text-green-500"></i>
                </div>
                
                <div className="z-10 text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-green-500/30 flex items-center justify-center mx-auto mb-3 relative">
                        <div className="absolute inset-0 rounded-full border-t-2 border-green-400 animate-spin-slow"></div>
                        <i className="fa-solid fa-lock text-green-400 text-xl"></i>
                    </div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-300 font-bold mb-1">Identity Vault</h3>
                    <div className="text-green-400 font-bold text-sm mb-1 tracking-wider">SECURED & ENCRYPTED</div>
                    <p className="text-[10px] text-slate-500 font-mono">pHash Signature Active</p>
                </div>
            </div>
        </div>

        {/* MIDDLE ROW: ACTIVE PROTECTION MONITOR & HOW IT WORKS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-[400px]">
            
            {/* Active Protection Monitor (Ad-hoc scans) */}
            <div className="bg-[#0a0f1a] border border-slate-700/60 p-5 rounded-lg flex flex-col shadow-lg relative">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
                    <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                        <i className="fa-solid fa-radar"></i> Active Protection Monitor
                    </h3>
                    <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    {scanHistory.length > 0 && (
                        <button onClick={() => document.getElementById('image-upload').click()} className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] px-3 py-1.5 rounded tracking-wider transition-colors font-bold">
                            NEW SCAN
                        </button>
                    )}
                </div>
                
                {/* Dynamic Content Area */}
                <div className="flex-1 flex flex-col">
                    {!preview && !scanResult && scanHistory.length === 0 ? (
                        /* Empty State */
                        <div className="flex-1 border-2 border-dashed border-slate-700/50 rounded-lg flex flex-col items-center justify-center p-6 text-center bg-slate-800/10 hover:bg-slate-800/30 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                                <i className="fa-solid fa-magnifying-glass text-2xl text-slate-500"></i>
                            </div>
                            <h4 className="text-slate-200 font-bold mb-2">No Recent Ad-Hoc Scans</h4>
                            <p className="text-slate-500 text-xs mb-6 max-w-sm leading-relaxed">
                                Your continuous background monitoring is active. Run a manual deepfake verification to instantly analyze any suspicious image against our global threat database.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button onClick={() => document.getElementById('image-upload').click()} className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-5 py-2.5 rounded font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-cloud-arrow-up"></i> Upload Image to Verify
                                </button>
                                <button className="bg-transparent border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-400 text-xs px-5 py-2.5 rounded font-bold transition-colors flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-link"></i> Scan URL
                                </button>
                            </div>
                        </div>
                    ) : preview && !scanResult ? (
                        /* Preview State */
                        <div className="flex-1 flex flex-col items-center justify-center p-4">
                            <div className="relative rounded overflow-hidden border border-slate-600 shadow-xl mb-4 max-w-[200px]">
                                <img src={preview} alt="Preview" className="w-full h-auto" />
                                {isScanning && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-scan pointer-events-none shadow-[0_0_10px_#00f0ff]"></div>
                                )}
                            </div>
                            
                            <div className="flex gap-3">
                                <button onClick={() => { setFile(null); setPreview(null); }} disabled={isScanning} className="text-xs text-slate-400 hover:text-red-400 disabled:opacity-50 transition-colors px-4 py-2">
                                    Cancel
                                </button>
                                <button onClick={handleScan} disabled={isScanning} className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-6 py-2 rounded font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] disabled:opacity-50">
                                    {isScanning ? (<span><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> ANALYZING...</span>) : 'RUN FORENSIC SCAN'}
                                </button>
                            </div>
                        </div>
                    ) : scanResult && (
                        /* Result State */
                        <div className="flex-1 flex flex-col bg-slate-900/50 rounded-lg border border-slate-700/50 p-5 overflow-y-auto">
                            {scanResult.error ? (
                                <div className="text-red-400 flex items-center gap-2 bg-red-500/10 p-4 rounded border border-red-500/20">
                                    <i className="fa-solid fa-circle-exclamation text-xl"></i>
                                    <span className="font-bold">{scanResult.error}</span>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-800">
                                        <div className="flex gap-4 items-center">
                                            <img src={preview} className="w-16 h-16 rounded object-cover border border-slate-600" />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-200 mb-1">ANALYSIS COMPLETE</h4>
                                                <div className="text-xs font-mono text-slate-400">Target Vector ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1.5 rounded text-xs font-bold border ${scanResult.isAiGenerated ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_10px_rgba(255,0,0,0.2)]' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>
                                            {scanResult.isAiGenerated ? 'DEEPFAKE DETECTED' : 'GENUINE MATCH'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-slate-800/40 p-3 rounded border border-slate-700/50">
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Authenticity Score</div>
                                            <div className="text-xl font-bold text-cyan-400">{scanResult.realnessPercentage}%</div>
                                        </div>
                                        <div className="bg-slate-800/40 p-3 rounded border border-slate-700/50">
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Known Exposures</div>
                                            <div className="text-xl font-bold text-orange-400">{scanResult.exposureLinks?.length || 0}</div>
                                        </div>
                                    </div>

                                    {scanResult.manipulationFlags && scanResult.manipulationFlags.length > 0 && (
                                        <div className="mb-4">
                                            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-bold">Manipulation Flags Found</div>
                                            <div className="flex flex-wrap gap-2">
                                                {scanResult.manipulationFlags.map((flag, idx) => (
                                                    <span key={idx} className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] px-2 py-1 rounded font-mono">
                                                        <i className="fa-solid fa-bug mr-1"></i> {flag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <button onClick={() => { setFile(null); setPreview(null); setScanResult(null); }} className="mt-auto w-full py-2 bg-transparent hover:bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 transition-colors">
                                        Dismiss Report
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* How It Works (Victim Personas + Misuse Mapping) */}
            <div className="bg-[#0a0f1a] border border-slate-700/60 p-5 rounded-lg flex flex-col shadow-lg overflow-y-auto">
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
                                    <span className="text-green-400 font-bold">DIGITAL IDENTITY SHIELD:</span> Real-time pHash interception. Call blocked. Auto-DMCA filed.
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
                                    <span className="text-orange-400 font-bold">DIGITAL IDENTITY SHIELD:</span> Flagged across 14 nodes. Awaiting user consent for mass takedown.
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


        <style dangerouslySetInnerHTML={{__html: `
            @keyframes scan {
                0% { transform: translateY(0); }
                50% { transform: translateY(200px); }
                100% { transform: translateY(0); }
            }
            .animate-scan {
                animation: scan 2s linear infinite;
            }
        `}} />
    </main>
  );
}
