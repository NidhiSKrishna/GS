import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const inputStyles = "w-full bg-slate-900/50 border border-slate-700/50 text-slate-200 py-3 px-10 rounded font-mono text-xs focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all";
const labelStyles = "block text-slate-400 font-semibold text-[10px] tracking-widest uppercase mb-1";

export function Login({ onLogin }) {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [tempPwdSent, setTempPwdSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        
        try {
            const response = await fetch('http://localhost:5001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: identifier, password })
            });
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('aura_token', data.token);
                onLogin(remember, data.user);
                navigate('/detect');
            } else {
                setErrorMsg(data.error || "Invalid credentials. Access Denied.");
            }
        } catch (error) {
            setErrorMsg("Network error. Unable to connect to server.");
        }
    };

    const handleForgot = () => {
        if(!identifier) {
            setErrorMsg("Enter your email or phone in the identifier field first to reset.");
            return;
        }
        const users = JSON.parse(localStorage.getItem('aura_users_db') || '[]');
        const userIndex = users.findIndex(u => u.email === identifier || u.phone === identifier || u.username === identifier);
        
        if(userIndex > -1){
            const tempPwd = Math.random().toString(36).slice(-8) + "!"; // Simple temp password
            users[userIndex].password = tempPwd;
            localStorage.setItem('aura_users_db', JSON.stringify(users));
            setErrorMsg(null);
            console.log(`[Aura Local DB] Temporary password generated for testing: ${tempPwd}`);
            setTempPwdSent(`A temporary password has been dispatched to your registered contact.`);
        } else {
            setErrorMsg("No profile found with that identifier.");
        }
    };

    return (
        <main className="content-area flex items-center justify-center min-h-[80vh]">
            <div className="panel border border-slate-700/50 w-full max-w-md animate-fade-in relative overflow-hidden p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                
                <div className="flex flex-col items-center mb-8 pt-2">
                    <div className="w-16 h-16 rounded-full border border-cyan-500 shadow-[0_0_20px_rgba(0,240,255,0.2)] bg-slate-800 flex items-center justify-center text-3xl mb-4 text-cyan-400">
                        <i className="fa-solid fa-user-lock"></i>
                    </div>
                    <h2 className="text-xl font-bold tracking-widest text-white mb-1 uppercase">AUTHENTICATE</h2>
                </div>

                {errorMsg && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-400 text-xs p-3 rounded mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-circle-exclamation"></i> {errorMsg}
                    </div>
                )}
                {tempPwdSent && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-400 text-xs p-3 rounded mb-4 flex items-center gap-2 font-mono">
                        <i className="fa-solid fa-envelope-circle-check text-lg"></i> 
                        <span>{tempPwdSent}</span>
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4 relative">
                        <label className={labelStyles}>Email, Username, or Phone</label>
                        <i className="fa-regular fa-envelope absolute left-4 bottom-3 text-slate-500"></i>
                        <input 
                            type="text" 
                            required 
                            className={inputStyles} 
                            placeholder="agent_smith@matrix.com"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className={labelStyles}>Password</label>
                        <i className="fa-solid fa-lock absolute left-4 bottom-3 text-slate-500"></i>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required 
                            className={inputStyles} 
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <i onClick={() => setShowPassword(!showPassword)} className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-4 bottom-3 text-slate-500 cursor-pointer hover:text-cyan-400 transition-colors`}></i>
                    </div>

                    <div className="flex items-center justify-between mb-8 mt-2">
                        <label className="flex items-center text-slate-400 text-xs font-mono cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="mr-2 accent-cyan-500" 
                                checked={remember}
                                onChange={e => setRemember(e.target.checked)}
                            />
                            Remember Device
                        </label>
                        <span onClick={handleForgot} className="text-cyan-400 text-xs font-mono hover:underline cursor-pointer">Forgot Password?</span>
                    </div>

                    <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-3 px-4 rounded hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all mb-4 uppercase tracking-wider">
                        Initiate Login
                    </button>
                    
                    <div className="text-center font-mono text-xs text-slate-500">
                        Unregistered entity? <Link to="/signup" className="text-cyan-400 font-bold hover:underline py-2">Create Profile</Link>
                    </div>
                </form>
            </div>
        </main>
    );
}

export function Signup() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        countryCode: '+1',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [showPwd, setShowPwd] = useState(false);
    const [showConfPwd, setShowConfPwd] = useState(false);
    const [serverError, setServerError] = useState(null);

    const getPhoneLimit = (code) => {
        switch(code) {
            case '+61': return 9; // Australia
            default: return 10;   // US, UK, India
        }
    };
    const maxDigits = getPhoneLimit(formData.countryCode);

    // Password requirements computation
    const pwd = formData.password;
    const reqs = {
        length: pwd.length >= 6,
        upper: /[A-Z]/.test(pwd),
        lower: /[a-z]/.test(pwd),
        number: /[0-9]/.test(pwd),
        special: /[!@#$%^&*]/.test(pwd)
    };
    const allReqsMet = Object.values(reqs).every(Boolean);

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!allReqsMet) {
            setServerError("Please meet all password requirements.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setServerError("Passwords do not match.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setServerError("Invalid email format.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: formData.username, 
                    email: formData.email, 
                    password: formData.password 
                })
            });
            const data = await response.json();
            
            if (response.ok) {
                navigate('/login');
            } else {
                setServerError(data.error || "Failed to create account.");
            }
        } catch (error) {
            setServerError("Network error. Unable to connect to server.");
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
        setServerError(null);
    };

    return (
        <main className="content-area flex items-center justify-center min-h-[80vh] py-8">
            <div className="panel border border-slate-700/50 w-full max-w-md animate-fade-in relative overflow-hidden p-6 md:p-8">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                
                 {serverError && (
                    <div className="bg-red-900/40 border border-red-500 text-slate-200 text-xs p-3 rounded mb-6 flex items-center gap-3 font-mono shadow-[0_0_10px_rgba(255,0,0,0.2)]">
                        <div className="w-5 h-5 rounded-full border border-red-500 flex flex-shrink-0 items-center justify-center text-red-500"><i className="fa-solid fa-exclamation text-[10px]"></i></div>
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSignup} className="flex flex-col gap-4" autoComplete="off">
                    
                    <div className="relative">
                        <label className={labelStyles}>YOUR NAME</label>
                        <i className="fa-regular fa-user absolute left-4 bottom-3.5 text-slate-500"></i>
                        <input type="text" required className={inputStyles} placeholder="John Smith" autoComplete="new-password"
                            value={formData.username} onChange={e => handleChange('username', e.target.value)} />
                    </div>

                    <div className="relative">
                        <label className={labelStyles}>EMAIL</label>
                        <i className="fa-regular fa-envelope absolute left-4 bottom-3.5 text-slate-500"></i>
                        <input type="email" required className={inputStyles} placeholder="john.smith@example.com" autoComplete="new-password"
                            value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                    </div>

                    <div className="relative">
                        <label className={labelStyles}>PHONE NUMBER</label>
                        <div className="relative border border-cyan-500/50 rounded flex items-center shadow-[0_0_10px_rgba(0,240,255,0.1)] focus-within:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all bg-slate-900/50">
                            <div className="pl-4 pr-2 py-3 text-slate-400 border-r border-slate-700/50 flex items-center">
                                <i className="fa-solid fa-phone mr-2 text-[10px]"></i>
                                <select 
                                    className="bg-transparent text-slate-300 text-xs font-mono focus:outline-none appearance-none cursor-pointer"
                                    value={formData.countryCode}
                                    onChange={e => handleChange('countryCode', e.target.value)}
                                    title="Country Code"
                                >
                                    <option value="+1" className="bg-slate-900">+1 (US)</option>
                                    <option value="+44" className="bg-slate-900">+44 (UK)</option>
                                    <option value="+61" className="bg-slate-900">+61 (AU)</option>
                                    <option value="+91" className="bg-slate-900">+91 (IN)</option>
                                </select>
                            </div>
                            <input type="text" required 
                                className="w-full bg-transparent text-slate-200 py-3 px-3 font-mono text-xs focus:outline-none placeholder-slate-600" 
                                placeholder={`Max ${maxDigits} digits`}
                                maxLength={maxDigits} autoComplete="new-password"
                                value={formData.phone} 
                                onChange={e => handleChange('phone', e.target.value.replace(/\D/g, ''))} 
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className={labelStyles}>PASSWORD</label>
                        <i className="fa-solid fa-lock absolute left-4 bottom-3.5 text-slate-500"></i>
                        <input type={showPwd ? "text" : "password"} required className={inputStyles} placeholder="••••••••" autoComplete="new-password"
                            value={formData.password} onChange={e => handleChange('password', e.target.value)} />
                        <i onClick={() => setShowPwd(!showPwd)} className={`fa-solid ${showPwd ? 'fa-eye-slash' : 'fa-eye'} absolute right-4 bottom-3.5 text-slate-500 cursor-pointer hover:text-cyan-400`}></i>
                    </div>

                    {/* Requirements Block exactly like image */}
                    <div className="border border-green-500/30 bg-green-900/10 rounded p-4 font-mono text-xs mt-1 mb-1 shadow-[0_0_10px_rgba(0,255,157,0.05)]">
                        <div className="text-slate-300 font-semibold mb-3 tracking-wide">Password Requirements:</div>
                        <ul className="space-y-2">
                            <li className={`flex items-center gap-2 ${reqs.length ? 'text-green-400' : 'text-slate-500'}`}>
                                <i className="fa-solid fa-circle-check"></i> At least 6 characters
                            </li>
                            <li className={`flex items-center gap-2 ${reqs.upper ? 'text-green-400' : 'text-slate-500'}`}>
                                <i className="fa-solid fa-circle-check"></i> Uppercase letter (A-Z)
                            </li>
                            <li className={`flex items-center gap-2 ${reqs.lower ? 'text-green-400' : 'text-slate-500'}`}>
                                <i className="fa-solid fa-circle-check"></i> Lowercase letter (a-z)
                            </li>
                            <li className={`flex items-center gap-2 ${reqs.number ? 'text-green-400' : 'text-slate-500'}`}>
                                <i className="fa-solid fa-circle-check"></i> Number (0-9)
                            </li>
                            <li className={`flex items-center gap-2 ${reqs.special ? 'text-green-400' : 'text-slate-500'}`}>
                                <i className="fa-solid fa-circle-check"></i> Special character (!@#$%^&*)
                            </li>
                        </ul>
                    </div>

                    <div className="relative">
                        <label className={labelStyles}>CONFIRM PASSWORD</label>
                        <i className="fa-solid fa-shield-cat absolute left-4 bottom-3.5 text-slate-500"></i>
                        <input type={showConfPwd ? "text" : "password"} required className={inputStyles} placeholder="••••••••" autoComplete="new-password"
                            value={formData.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} />
                        <i onClick={() => setShowConfPwd(!showConfPwd)} className={`fa-solid ${showConfPwd ? 'fa-eye-slash' : 'fa-eye'} absolute right-4 bottom-3.5 text-slate-500 cursor-pointer hover:text-cyan-400`}></i>
                    </div>

                    <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-3.5 px-4 rounded hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all mt-4 mb-2 uppercase tracking-wide text-sm font-heading">
                        Create Account
                    </button>
                    
                    <div className="text-center font-mono text-xs text-slate-500 mt-2">
                        Already enrolled? <Link to="/login" className="text-cyan-400 font-bold hover:underline py-2">Log In Here</Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
