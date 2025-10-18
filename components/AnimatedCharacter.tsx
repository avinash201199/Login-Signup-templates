import React from 'react';
import type { AnimationState } from '../types';

interface AnimatedCharacterProps {
  animationState: AnimationState;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ animationState }) => {
  const isPeeking = animationState === 'peeking';
  const isHiding = animationState === 'hiding';
  const isExcited = animationState === 'excited';
  const isSubmitting = animationState === 'submitting';

  return (
    <div className={`relative w-48 h-48 transition-transform duration-700 ${isSubmitting ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Glow effect */}
        <g 
          className={`transition-all duration-500 ease-in-out ${isExcited ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'url(#glow)' }}
        >
          <circle cx="100" cy="100" r="50" fill="#a78bfa" />
        </g>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Character Group - for overall movement */}
        <g
          className={`transition-transform duration-500 ease-out animate-float ${isSubmitting ? 'translate-y-[-200px]' : ''}`}
          style={{ transformOrigin: 'center' }}
        >
          {/* Main Body */}
          <circle cx="100" cy="100" r="50" fill="#7c3aed" />
          
          {/* Face Group */}
          <g className={`transition-opacity duration-300 ${isHiding ? 'opacity-0' : 'opacity-100'}`}>
            {/* Eyebrows */}
            <g transform={isPeeking ? "translate(0, -5)" : "translate(0,0)"} className="transition-transform duration-300">
                <path d="M 80 80 Q 85 75 90 80" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 110 80 Q 115 75 120 80" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            {/* Eyes Group */}
            <g transform={isPeeking ? "translate(0, -5)" : "translate(0,0)"} className="transition-transform duration-300">
              {/* Eye Whites */}
              <circle fill="white" cx="85" cy="95" r="12" />
              <circle fill="white" cx="115" cy="95" r="12" />
              {/* Pupils */}
              <g transform={isPeeking ? "translate(-5, 5)" : "translate(0,0)"} className="transition-transform duration-500">
                <circle fill="black" cx="85" cy="95" r="6" />
                <circle fill="black" cx="115" cy="95" r="6" />
              </g>
            </g>
            
            {/* Mouth */}
            <g className="transition-transform duration-300 ease-out" transform={isExcited || isSubmitting ? 'scale(1.1)' : 'scale(1)'} style={{transformOrigin: '100px 120px'}}>
               <path 
                d={isExcited || isSubmitting ? "M 90 120 Q 100 135 110 120" : "M 95 120 L 105 120"} 
                stroke="white" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                className="transition-all duration-300"
              />
            </g>
          </g>

          {/* Hands Group */}
          <g
            className={`transition-transform duration-300 ease-in-out ${isHiding ? 'translate-y-[-40px] scale(1.5)' : 'translate-y-[15px] scale(1)'}`}
            style={{transformOrigin: 'center'}}
          >
            <circle fill="#a78bfa" cx="70" cy="100" r="10" />
            <circle fill="#a78bfa" cx="130" cy="100" r="10" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedCharacter;