import React from 'react';

export default function HowItWorks() {
  return (
    <main className="content-area p-4 bg-[#050a10] min-h-[calc(100vh-65px)] text-slate-300 flex flex-col gap-5 overflow-y-auto">
      <section className="animate-fade-in flex flex-col gap-6 max-w-6xl mx-auto w-full pb-10">
        
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-[#0a0f1a] p-8 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center text-2xl text-cyan-400 mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <i className="fa-solid fa-shield-virus"></i>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                    Antivirus catches malware.<br/>
                    <span className="text-cyan-400">We catch you being used as malware.</span>
                </h1>
                <p className="text-slate-400 max-w-2xl text-sm leading-relaxed mb-8">
                    AURA is a next-generation Digital Identity Shield. We protect your face, voice, and brand from being weaponized by deepfakes, unauthorized synthetic media, and identity theft across the public web and dark nets.
                </p>
                <div className="flex gap-4">
                    <div className="bg-slate-800/50 border border-slate-700 px-4 py-2 rounded text-xs font-mono">
                        <span className="text-cyan-400 font-bold mr-2">1</span> ENROLL
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 px-4 py-2 rounded text-xs font-mono">
                        <span className="text-cyan-400 font-bold mr-2">2</span> MONITOR
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 px-4 py-2 rounded text-xs font-mono">
                        <span className="text-cyan-400 font-bold mr-2">3</span> NEUTRALIZE
                    </div>
                </div>
            </div>
        </div>

        {/* STEP BY STEP PIPELINE */}
        <h2 className="text-xl font-bold text-slate-200 uppercase tracking-widest mt-6 border-b border-slate-800 pb-2">The Architecture</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Step 1 */}
            <div className="panel border border-slate-700/50 bg-[#0a0f1a] p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-200">1. Privacy-First Identity Vault</h3>
                    <div className="text-cyan-500/20 group-hover:text-cyan-500/40 text-4xl transition-colors"><i className="fa-solid fa-vault"></i></div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    You upload your photos to establish a baseline. We do NOT store your images. Instead, we use advanced machine learning to extract a <span className="text-cyan-400 font-mono">non-reversible biometric pHash + CLIP signature</span>.
                </p>
                <div className="bg-slate-900/80 border border-slate-700 rounded p-3 text-xs font-mono text-slate-500 mt-auto">
                    <span className="text-cyan-400">Result:</span> Even if AURA is fully compromised, attackers cannot reconstruct your face from the mathematical vector stored in our encrypted MongoDB cluster.
                </div>
            </div>

            {/* Step 2 */}
            <div className="panel border border-slate-700/50 bg-[#0a0f1a] p-6 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-200">2. Autonomous Threat Sweeping</h3>
                    <div className="text-orange-500/20 group-hover:text-orange-500/40 text-4xl transition-colors"><i className="fa-solid fa-radar"></i></div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Our engines continuously scan the web. Instead of expensive crawlers, we use <span className="text-orange-400 font-mono">RSS feed monitoring</span> and <span className="text-orange-400 font-mono">Programmable Search Engines</span> to track mentions of your name and associated images across social media, forums, and known malicious databases.
                </p>
                <div className="bg-slate-900/80 border border-slate-700 rounded p-3 text-xs font-mono text-slate-500 mt-auto">
                    <span className="text-orange-400">Result:</span> 24/7 global monitoring with minimal infrastructure cost, mapping exposure to victim personas.
                </div>
            </div>

            {/* Step 3 */}
            <div className="panel border border-slate-700/50 bg-[#0a0f1a] p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors md:col-span-2">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-200">3. Multi-Layered Forensic Analysis</h3>
                    <div className="text-red-500/20 group-hover:text-red-500/40 text-4xl transition-colors"><i className="fa-solid fa-microscope"></i></div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-3xl">
                    When a potential match is found, we don't just ask "Is this an exact copy?". We ask "Is this a manipulated copy?". We run a highly optimized 3-tier cascade to detect deepfakes without burning API credits:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="border border-slate-700/50 bg-slate-800/30 p-3 rounded">
                        <div className="text-cyan-400 text-xs font-bold mb-1">Tier 1: pHash Distance</div>
                        <div className="text-[10px] text-slate-400 font-mono">Instant, near-zero cost perceptual hashing to eliminate obvious non-matches.</div>
                    </div>
                    <div className="border border-slate-700/50 bg-slate-800/30 p-3 rounded flex items-center justify-center relative">
                        <div className="absolute left-1/2 -top-4 md:-left-3 md:top-1/2 -translate-y-1/2 text-slate-600 rotate-90 md:rotate-0"><i className="fa-solid fa-arrow-right"></i></div>
                        <div>
                            <div className="text-orange-400 text-xs font-bold mb-1">Tier 2: Heuristic Analysis</div>
                            <div className="text-[10px] text-slate-400 font-mono">Texture, noise, symmetry, and frequency analysis to detect GAN-generated media.</div>
                        </div>
                    </div>
                    <div className="border border-slate-700/50 bg-slate-800/30 p-3 rounded flex items-center justify-center relative">
                        <div className="absolute left-1/2 -top-4 md:-left-3 md:top-1/2 -translate-y-1/2 text-slate-600 rotate-90 md:rotate-0"><i className="fa-solid fa-arrow-right"></i></div>
                        <div>
                            <div className="text-red-400 text-xs font-bold mb-1">Tier 3: Vision API</div>
                            <div className="text-[10px] text-slate-400 font-mono">Google Vision / Claude Vision called ONLY for ambiguous or high-risk cases.</div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-slate-900/80 border border-slate-700 rounded p-3 text-xs font-mono text-slate-500 mt-auto">
                    <span className="text-red-400">Result:</span> We detect expression-swaps, face-grafts, and synthetic media while reducing API costs by ~90%.
                </div>
            </div>

            {/* Step 4 */}
            <div className="panel border border-slate-700/50 bg-[#0a0f1a] p-6 relative overflow-hidden group hover:border-green-500/50 transition-colors md:col-span-2">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-200">4. Actionable Intelligence & Takedowns</h3>
                    <div className="text-green-500/20 group-hover:text-green-500/40 text-4xl transition-colors"><i className="fa-solid fa-gavel"></i></div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                            Detections are populated directly into your personalized dashboard. Safe matches (like your own LinkedIn profile) are logged in your <span className="text-green-400 font-semibold">Consent History</span>. Malicious uses (like non-consensual explicit face-swaps or executive impersonation scams) are flagged as <span className="text-red-400 font-semibold">Critical Alerts</span>.
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            With one click, AURA can trigger automated DMCA takedown requests across our global network to neutralize the threat before it spreads.
                        </p>
                    </div>
                    <div className="flex-1 bg-slate-900/80 border border-slate-700 rounded p-4 text-xs">
                        <h4 className="text-slate-200 font-bold mb-3 border-b border-slate-700 pb-2">The Legacy Difference (vs Google Lens)</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-2">
                                <i className="fa-solid fa-xmark text-red-500 mt-0.5"></i>
                                <span className="text-slate-400">Standard tools find <span className="font-bold text-slate-300">exact</span> matches. They miss deepfakes entirely.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                                <span className="text-slate-400">AURA finds <span className="font-bold text-cyan-400">manipulated</span> copies (face grafts, GANs, expression swaps).</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                                <span className="text-slate-400">AURA monitors <span className="font-bold text-cyan-400">continuously</span>, not just when you execute a search.</span>
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
