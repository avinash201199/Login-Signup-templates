import React, { useState, useMemo } from 'react';
import AnimatedCharacter from './components/AnimatedCharacter';
import type { AnimationState } from './types';

const App: React.FC = () => {
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleFocusEmail = () => setAnimationState('peeking');
  const handleFocusPassword = () => setAnimationState('hiding');
  const handleBlur = () => setAnimationState('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnimationState('submitting');
    console.log('Form submitted!');
    // Reset after animation
    setTimeout(() => {
      setAnimationState('idle');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }, 2000);
  };

  const particles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -10}vh`, // Start off-screen
      sizeW: '2px',
      sizeH: `${Math.random() * 8 + 4}px`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 5 + 5}s`,
  })), []);


  return (
    <main className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white overflow-hidden">
      {/* Background Particles */}
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute rounded-full bg-slate-400/50 animate-fall"
          style={{
            left: p.left,
            top: p.top,
            width: p.sizeW,
            height: p.sizeH,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
       {/* Floating SVG Blobs for background */}
       <div className="absolute top-10 -left-20 w-72 h-72 bg-violet-500/20 rounded-full filter blur-3xl opacity-50 animate-float" style={{animationDelay: '0s', animationDuration: '15s'}}></div>
       <div className="absolute bottom-10 -right-20 w-80 h-80 bg-sky-500/20 rounded-full filter blur-3xl opacity-50 animate-float" style={{animationDelay: '3s', animationDuration: '12s'}}></div>


      <div className="relative z-10 flex flex-col items-center">
        <AnimatedCharacter animationState={animationState} />
        
        <div className="w-80 p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50">
          <h2 className="text-3xl font-bold text-center mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-center text-slate-400 mb-6">{isSignUp ? 'Join the cosmos!' : 'Log in to continue your journey'}</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocusEmail}
              onBlur={handleBlur}
              className="w-full px-4 py-3 bg-slate-900/70 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocusPassword}
              onBlur={handleBlur}
              className="w-full px-4 py-3 bg-slate-900/70 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              required
            />
            <div className={`transition-all duration-500 ease-in-out ${isSignUp ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
               <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={handleFocusPassword}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-slate-900/70 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                required={isSignUp}
              />
            </div>
            
            <button
              type="submit"
              onMouseEnter={() => setAnimationState('excited')}
              onMouseLeave={handleBlur}
              className="w-full py-3 bg-violet-600 rounded-lg font-semibold hover:bg-violet-700 active:scale-95 transition-all duration-300 shadow-lg shadow-violet-600/30"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-slate-400 hover:text-white transition-colors">
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
