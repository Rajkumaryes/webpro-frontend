import React, { useState, useEffect } from 'react';

/**
 * CustomLoader Props
 * @typedef {Object} CustomLoaderProps
 * @property {number} [progress=0] - Current progress percentage (0-100)
 * @property {Function} [onComplete] - Callback function when progress reaches 100%
 * @property {string} [logoSrc] - URL to the logo image
 * @property {string} [primaryColor='#0F3D7E'] - Primary color in hex format
 * @property {string} [secondaryColor='#2C6ED1'] - Secondary color in hex format
 * @property {string} [backgroundColor='linear-gradient(135deg, #E6EEFF 0%, #D6E4FF 100%)'] - Background style
 * @property {number} [animationSpeed=1] - Animation speed multiplier
 * @property {boolean} [showPercentage=true] - Whether to show percentage text
 * @property {boolean} [showParticles=true] - Whether to show particle effects
 * @property {boolean} [showPulse=true] - Whether to show pulse effects
 * @property {('small'|'medium'|'large')} [size='large'] - Size of the loader
 */

/**
 * Enhanced Custom Loader Component with improved visibility
 * @param {CustomLoaderProps} props
 */
const CustomLoader = ({ 
  progress = 0, 
  onComplete, 
  logoSrc, 
  primaryColor = '#EF6432',
  secondaryColor = '#EF8232',
  backgroundColor = 'rgba(239, 100, 50, 0.1)',
  animationSpeed = 2,
  showPercentage = true,
  showParticles = true,
  showPulse = true,
  size = 'small'
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Get size dimensions based on requested size
  const getSizeValues = () => {
    switch(size) {
      case 'large':
        return { container: 280, logo: 120, particles: 15 };
      case 'medium':
        return { container: 200, logo: 80, particles: 10 };
      case 'small':
      default:
        return { container: 150, logo: 60, particles: 8 };
    }
  };
  
  const sizeValues = getSizeValues();
  
  // Smooth progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) return progress;
        return prev + diff * 0.3;
      });
    }, 16);
    
    return () => clearInterval(timer);
  }, [progress]);
  
  // Completion handler
  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        if (onComplete) onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, onComplete]);

  // Generate random particles with different sizes
  const particles = [...Array(sizeValues.particles)].map((_, i) => {
    const size = Math.random() * 4 + 3; // Larger particles for better visibility
    return (
      <div 
        key={i} 
        className="particle" 
        style={{ 
          '--index': i,
          '--size': `${size}px`,
          '--color': `rgba(${hexToRgb(primaryColor)}, ${Math.random() * 0.6 + 0.4})` // Higher opacity
        }}
      ></div>
    );
  });

  return (
    <div 
      style={{
        ...styles.overlay,
        background: backgroundColor,
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
        '--animation-speed': animationSpeed,
        '--container-size': `${sizeValues.container}px`,
        '--logo-size': `${sizeValues.logo}px`
      }} 
      className={isComplete ? 'fade-out' : ''} 
      role="progressbar" 
      aria-valuenow={displayProgress} 
      aria-valuemin="0" 
      aria-valuemax="100"
    >
      <div className="loader-container">
        {/* Logo Container */}
        {logoSrc && (
          <div className="logo-wrapper">
            <img 
              src={logoSrc} 
              alt="Logo" 
              className="logo"
              style={{ filter: `drop-shadow(0 0 10px rgba(${hexToRgb(primaryColor)}, 0.5))` }} // Enhanced shadow
            />
          </div>
        )}
        
        {/* Digital pulse effect */}
        {showPulse && (
          <div className="pulse-container">
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
          </div>
        )}
        
        {/* Digital particles */}
        {showParticles && (
          <div className="particles-container">
            {particles}
          </div>
        )}
        
        {/* Loading bar */}
        {/* <div className="progress-wrapper">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${displayProgress}%`,
                background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
              }}
            ></div>
          </div>
          {showPercentage && (
            <div 
              className="progress-text"
              style={{ color: primaryColor, fontWeight: 'bold', fontSize: '16px' }} // Larger and bolder text
            >
              {Math.round(displayProgress)}%
            </div>
          )}
        </div> */}
      </div>
      
      <style>{getDynamicStyles()}</style>
    </div>
  );
};

// Helper function to convert hex to rgb
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

// Dynamic styles based on props
const getDynamicStyles = () => `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes pulseFade {
    0% { 
      transform: translate(-50%, -50%) scale(0.9); 
      opacity: 0.8; 
    }
    100% { 
      transform: translate(-50%, -50%) scale(2); 
      opacity: 0; 
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes glow {
    0%, 100% { filter: drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.6)); }
    50% { filter: drop-shadow(0 0 15px rgba(var(--primary-rgb), 0.9)); }
  }
  
  @keyframes particleFloat {
    0% { 
      transform: translate(var(--startX), var(--startY)); 
      opacity: 0; 
    }
    20% { 
      opacity: 1; 
    }
    100% { 
      transform: translate(var(--endX), var(--endY)); 
      opacity: 0; 
    }
  }
  
  .fade-out {
    animation: fadeOut 1s forwards;
  }
  
  .loader-container {
    position: relative;
    width: var(--container-size);
    height: var(--container-size);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .logo-wrapper {
    width: var(--logo-size);
    height: var(--logo-size);
    position: relative;
    z-index: 10;
    animation: float 4s infinite ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    animation: glow 3s infinite ease-in-out;
  }
  
  .pulse-container {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 5%;
    left: 5%;
    z-index: 5;
  }
  
  .pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid rgba(var(--primary-rgb), 0.4); /* Thicker border */
    border-radius: 50%;
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: pulseFade calc(3s / var(--animation-speed)) infinite ease-out;
  }
  
  .pulse-ring:nth-child(1) {
    animation-delay: calc(0s / var(--animation-speed));
  }
  
  .pulse-ring:nth-child(2) {
    animation-delay: calc(1.5s / var(--animation-speed));
  }
  
  .particles-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 8;
    transform: scale(0.8);
  }
  
  .particle {
    position: absolute;
    width: var(--size);
    height: var(--size);
    background: var(--color);
    border-radius: 50%;
    opacity: 0;
    top: 50%;
    left: 50%;
    --angle: calc(var(--index) * 45deg);
    --distance: 30px;
    --end-distance: 100px;
    --startX: calc(cos(var(--angle)) * var(--distance));
    --startY: calc(sin(var(--angle)) * var(--distance));
    --endX: calc(cos(var(--angle)) * var(--end-distance));
    --endY: calc(sin(var(--angle)) * var(--end-distance));
    animation: particleFloat calc(2.5s / var(--animation-speed)) infinite;
    animation-delay: calc(var(--index) * 0.2s / var(--animation-speed));
    box-shadow: 0 0 4px var(--color); /* Added glow to particles */
  }
  
  .progress-wrapper {
    position: absolute;
    bottom: 20px;
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 20;
  }
  
  .progress-track {
    width: 100%;
    height: 8px; /* Increased height for better visibility */
    background: rgba(var(--primary-rgb), 0.2); /* Darker track */
    border-radius: 8px;
    overflow: hidden;
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.2);
  }
  
  .progress-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 0.3s ease-out;
    box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.7); /* Enhanced glow */
  }
  
  .progress-text {
    margin-top: 10px;
    color: var(--primary-color);
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 480px) {
    .loader-container {
      transform: scale(0.8);
    }
  }
  
  @media (prefers-reduced-motion) {
    .logo-wrapper {
      animation: none !important;
    }
    
    .pulse-ring, .particle {
      display: none !important;
    }
    
    .progress-fill {
      transition: none !important;
    }
  }
`;

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, 
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.5s ease-in-out',
    '--primary-rgb': '239, 100, 50' // Darker blue for better contrast
  }
};

export default CustomLoader;