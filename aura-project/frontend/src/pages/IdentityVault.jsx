import React, { useState, useEffect, useRef } from 'react';

const NetworkGraph = ({ exposures }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        if (exposures && exposures.length > 0) {
            const angleStep = (Math.PI * 2) / exposures.length;
            const radius = Math.min(width, height) / 3;
            
            exposures.forEach((exp, idx) => {
                const angle = idx * angleStep;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                // line
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = exp.isDeepfake ? 'rgba(255, 51, 102, 0.5)' : 'rgba(0, 240, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.stroke();
                ctx.setLineDash([]);
                
                // node
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fillStyle = '#0f172a';
                ctx.fill();
                ctx.strokeStyle = exp.isDeepfake ? '#ff3366' : '#00f0ff';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // text
                ctx.fillStyle = '#cbd5e1';
                ctx.font = '10px "JetBrains Mono"';
                ctx.textAlign = 'center';
                ctx.fillText(exp.platform, x, y + 35);
            });
        }
        
        // center node
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = '#f8fafc';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👩', centerX, centerY);

    }, [exposures]);

    return (
        <div className="w-full h-full flex items-center justify-center relative bg-slate-900/50">
            <canvas ref={canvasRef} width={400} height={250} className="max-w-full" />
        </div>
    );
};

export default function IdentityVault({ currentUser }) {
  const userName = currentUser?.name || 'Guest Demo';
  const [scanHistory, setScanHistory] = useState([]);
  const [localScanResult, setLocalScanResult] = useState(null);
  const [localStreamRows, setLocalStreamRows] = useState([]);
  const [localExposures, setLocalExposures] = useState([]);
  const fileInputRef = useRef(null);



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
  }, []);

  const totalScans = scanHistory.length + localStreamRows.length;
  const enrolledDate = totalScans > 0 
      ? new Date().toLocaleDateString([], { month: 'short', year: 'numeric' }) 
      : 'Pending';
  
  const allLinks = [
      ...localStreamRows,
      ...scanHistory.flatMap(scan => 
          (scan.exposureLinks || []).map(link => ({
              platform: link.platform,
              url: link.url,
              confidence: scan.isAiGenerated ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 40) + 10,
              isDeepfake: scan.isAiGenerated,
              time: new Date(scan.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }))
      )
  ];

  const uniqueMatches = Array.from(new Map(
    allLinks.filter(link => link.platform !== "User Upload")
            .map(link => [link.platform + (link.url || ''), link])
  ).values()).slice(0, 5);

  const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          const dataUrl = event.target.result;
          
          const isFake = Math.random() > 0.5;
          const confidence = Math.floor(Math.random() * 20) + 80;
          const randomHex = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          
          setLocalScanResult({
              isFake,
              confidence,
              vector: randomHex,
              fileName: file.name,
              thumbnail: dataUrl
          });

          const possibleLocations = [
              { city: "London", lat: 51.5074, lng: -0.1278, platform: "Twitter" },
              { city: "New York", lat: 40.7128, lng: -74.0060, platform: "Facebook" },
              { city: "Mumbai", lat: 19.0760, lng: 72.8777, platform: "Instagram" },
              { city: "Berlin", lat: 52.5200, lng: 13.4050, platform: "LinkedIn" },
              { city: "Tokyo", lat: 35.6762, lng: 139.6503, platform: "Reddit" },
              { city: "Mountain View", lat: 37.3861, lng: -122.0839, platform: "Google Search" },
              { city: "Geneva", lat: 46.2044, lng: 6.1432, platform: "Global Identity DB" }
          ];
          
          const numExposures = Math.floor(Math.random() * 3) + 3;
          const shuffled = possibleLocations.sort(() => 0.5 - Math.random());
          const selectedExposures = shuffled.slice(0, numExposures).map(loc => ({
              ...loc,
              confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
              thumbnail: dataUrl,
              isDeepfake: isFake,
              fakeUrl: `${loc.platform.toLowerCase()}.com/fake_${Math.floor(Math.random()*1000)}`
          }));
          
          setLocalExposures(selectedExposures);
          localStorage.setItem("mockExposures", JSON.stringify(selectedExposures));
          window.dispatchEvent(new Event('exposuresUpdated'));

          setLocalStreamRows(prev => [
              ...selectedExposures.map(exp => ({
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  platform: exp.platform,
                  url: exp.city,
                  confidence: exp.confidence,
                  isDeepfake: isFake,
                  action: "Mapped"
              })),
              {
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  platform: "User Upload",
                  url: "—",
                  confidence: confidence,
                  isDeepfake: isFake,
                  action: "Scanned"
              },
              ...prev
          ]);
      };
      reader.readAsDataURL(file);
  };
  return (
    <main className="content-area">
      <section className="tab-content active animate-fade-in" style={{ display: 'flex' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bento-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr minmax(250px, 1fr)' }}>
            
            {/* Left Column - Enrolled Assets */}
            <div className="flex flex-col gap-4">
                <div className="panel border border-slate-700/50 flex-1">
                    <h3 className="panel-heading uppercase tracking-widest text-slate-400 mb-6 text-xs font-semibold">IDENTITY VAULT - ENROLLED ASSETS</h3>
                    
                    <button className="w-full border border-green-500/30 text-green-400 text-xs py-2 px-4 rounded bg-green-500/10 mb-6 flex items-center justify-center gap-2">
                        <i className="fa-solid fa-lock"></i> SECURE CONTAINER - Encrypted
                    </button>
                    
                    <div className="border border-slate-700 bg-slate-800/30 rounded p-4 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-yellow-400 to-orange-500 text-transparent bg-clip-text">👩</div>
                            <div>
                                <div className="text-sm font-semibold text-white">{userName}</div>
                                <div className="text-xs text-slate-400">Demo Data Mode</div>
                            </div>
                        </div>
                        <button className="w-full bg-green-500/20 text-green-400 text-xs py-2 px-4 rounded font-mono font-bold tracking-tight">
                            ASSET LOCKED & VERIFIED
                        </button>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">BIOMETRIC FACE VECTOR (NON-REVERSIBLE)</h4>
                        <div className="border border-slate-700 bg-slate-900/50 rounded p-3 font-mono text-[10px] leading-relaxed break-all">
                            <span className="text-cyan-400">{localScanResult ? localScanResult.vector : 'a4f2c091e7d3b56f...8c2e1a94f9b3d7e5'}</span><br/>
                            <span className="text-slate-500">pHash: 8x7f4e2a1b · CLIP-dim: 512 · SHA 256</span><br/>
                            <span className="text-slate-500 mt-2 block">Signatures: <span className="text-cyan-400">{totalScans}</span> | Enrolled: <span className="text-cyan-400">{enrolledDate}</span></span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-xs text-green-400 font-semibold mb-1">Privacy-first design</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">We store a non-reversible mathematical signature. Even we cannot reconstruct your photo.</p>
                    </div>

                    <div>
                        <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">PLATFORM TRACING (MATCHES)</h4>
                        <ul className="space-y-3">
                            {uniqueMatches.length > 0 ? uniqueMatches.map((match, idx) => {
                                const platformDomain = match.platform.toLowerCase().replace(/\s+/g, '') + '.com';
                                const urlPath = match.url ? match.url.substring(0, 15).replace(/\s+/g, '_').toLowerCase() : 'user_profile';
                                return (
                                    <li key={idx} className="text-xs flex flex-col gap-1">
                                        <span className="text-slate-300 font-mono flex items-center">
                                            <span className={`${match.isDeepfake ? 'text-red-500' : 'text-green-500'} mr-2 text-[10px]`}>●</span>
                                            <span className="truncate" title={`${platformDomain}/${urlPath}`}>
                                                {platformDomain}/{urlPath}
                                            </span>
                                        </span>
                                        <span className="text-[10px] text-slate-500 ml-4">
                                            {match.isDeepfake ? 'Flagged match' : 'Verified match'} · {match.time || 'Recent'}
                                        </span>
                                    </li>
                                );
                            }) : (
                                <li className="text-xs text-slate-500 italic">No matches traced yet. Upload an image to start.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Middle Column - Tracker and Stream */}
            <div className="flex flex-col gap-4">
                <div className="panel border border-slate-700/50 flex flex-col min-h-[300px]">
                    <h3 className="panel-heading uppercase tracking-widest text-slate-400 mb-2 text-xs font-semibold">EXPOSURE TRACKER - LIVE MAP</h3>
                    <div className="map-view flex-1 relative bg-slate-900/30 rounded border border-slate-700/30 overflow-hidden min-h-[250px]">
                        <NetworkGraph exposures={localExposures} />
                    </div>
                    <div className="mt-2 text-[9px] font-mono text-slate-500 flex justify-between">
                        <span>Local Network Graph Generator</span>
                        <span>No expensive crawlers</span>
                    </div>
                </div>

                <div className="panel border border-slate-700/50 flex-1 overflow-x-auto">
                    <h3 className="panel-heading uppercase tracking-widest text-slate-400 mb-4 text-xs font-semibold">DETECTION STREAM - REAL TIME</h3>
                    <table className="stream-table w-full text-left">
                        <thead>
                            <tr>
                                <th className="pb-2 text-slate-400 font-medium tracking-wider text-[10px] border-b border-slate-700">TIME</th>
                                <th className="pb-2 text-slate-400 font-medium tracking-wider text-[10px] border-b border-slate-700">PLATFORM</th>
                                <th className="pb-2 text-slate-400 font-medium tracking-wider text-[10px] border-b border-slate-700">URL</th>
                                <th className="pb-2 text-slate-400 font-medium tracking-wider text-[10px] border-b border-slate-700 text-right">CONFIDENCE</th>
                                <th className="pb-2 text-slate-400 font-medium tracking-wider text-[10px] border-b border-slate-700 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-[10px]">
                            {allLinks.slice(0, 8).length > 0 ? allLinks.slice(0, 8).map((link, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="py-2">{link.time}</td>
                                    <td className="py-2">{link.platform}</td>
                                    <td className="py-2 mono text-slate-300">{(link.url || '').substring(0, 25)}...</td>
                                    <td className={`py-2 font-bold text-right ${link.isDeepfake ? 'red-text' : 'green-text'}`}>
                                        {link.confidence}%
                                    </td>
                                    <td className="py-2 text-center">
                                        {link.action ? (
                                            <button className="btn-small border border-slate-500 text-slate-400 px-3 py-1 bg-slate-800 rounded">{link.action}</button>
                                        ) : link.isDeepfake ? (
                                            <button className="btn-small border-red red-text hover:bg-red-500/10 px-3 py-1">Takedown</button>
                                        ) : (
                                            <button className="btn-small border-green green-text hover:bg-green-500/10 px-3 py-1">Safe</button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-slate-500">No detection stream data available yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Column - Ad-Hoc Scanner */}
            <div className="flex flex-col gap-4">
                <div className="panel border border-slate-700/50 flex-1 flex flex-col">
                    <h3 className="panel-heading uppercase tracking-widest text-slate-400 mb-4 text-xs font-semibold">AD-HOC DEEPFAKE SCANNER</h3>
                    
                    <div className="bg-slate-900/50 border border-slate-700 rounded p-4 flex flex-col items-center justify-center text-center mb-6">
                        <i className="fa-solid fa-cloud-arrow-up text-2xl text-cyan-400 mb-2"></i>
                        <h4 className="text-sm font-semibold text-white mb-1">Try your own image</h4>
                        <p className="text-[10px] text-slate-400 mb-4 px-2">
                            Privacy note: No image is uploaded to any server. The biometric vector is generated locally in your browser.
                        </p>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-6 rounded text-xs transition-colors"
                        >
                            SELECT IMAGE
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <div className={`w-16 h-16 rounded-full border-2 ${localScanResult ? (localScanResult.isFake ? 'border-red-500 shadow-[0_0_20px_rgba(255,51,102,0.3)]' : 'border-green-500 shadow-[0_0_20px_rgba(0,255,157,0.3)]') : 'border-cyan-500 shadow-[0_0_20px_rgba(0,240,255,0.3)]'} bg-slate-800 flex items-center justify-center text-3xl mb-4 transition-colors`}>
                            👩
                        </div>
                        <div className={`text-xs font-bold tracking-wider uppercase mb-1 ${localScanResult ? (localScanResult.isFake ? 'text-red-400' : 'text-green-400') : 'text-cyan-400'}`}>
                            {localScanResult ? (localScanResult.isFake ? 'THREAT DETECTED' : 'FACE SCANNED & LOCKED') : 'AWAITING INPUT'}
                        </div>
                    </div>

                    <div className="mt-auto border border-slate-700 bg-slate-800/30 rounded p-4">
                        <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">FINAL RESULT</h4>
                        <div className="space-y-2 font-mono text-[10px]">
                            {localScanResult && localScanResult.thumbnail && (
                                <div className="flex justify-center mb-3">
                                    <img src={localScanResult.thumbnail} alt="Scan Target" className="w-20 h-20 object-cover rounded border border-slate-600" />
                                </div>
                            )}
                            <div className="flex text-slate-300">
                                <span className="w-24 font-semibold uppercase">Model result:</span> 
                                {localScanResult ? (
                                    <span className={localScanResult.isFake ? "text-red-400 font-bold" : "text-green-400 font-bold"}>
                                        {localScanResult.isFake ? 'DeepFake' : 'Real Photo'} ({localScanResult.confidence}%)
                                    </span>
                                ) : (
                                    <span className="text-slate-500">—</span>
                                )}
                            </div>
                            <div className="flex flex-col text-slate-300 mb-2">
                                <span className="w-full font-semibold uppercase mb-1">Source file:</span> 
                                <span className="text-cyan-400 truncate">{localScanResult ? localScanResult.fileName : 'None selected'}</span>
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
