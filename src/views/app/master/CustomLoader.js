import React, { Component } from 'react';
import FullScreenLoader from 'react-fullscreen-loading';
import logo from '../../../assets/logos/Hapag-logo.png' // Update the path accordingly


class CustomLoader extends Component {
    render() {
      const { loading } = this.props;
  
      if (!loading) {
        return null;
      }
  
      const text = 'HAPAG-LLOYD';
      
      return (
        <div style={styles.overlay}>
          <div style={styles.textContainer}>
            {Array.from(text).map((letter, index) => (
              <span key={index} style={{ ...styles.letter, animationDelay: `${index * 0.1}s` }}>
                {letter}
              </span>
            ))}
          </div>
        </div>
      );
    }
  }
  
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    textContainer: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#121C50',
      display: 'flex',
    },
    letter: {
      animation: 'fadeIn 1.5s ease-in-out infinite',
      opacity: 0,
    },
  };
  
  // Keyframes for fade-in animation
  const keyframesFadeIn = `
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      50% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `;
  
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(keyframesFadeIn, styleSheet.cssRules.length);
  
  export default CustomLoader;
