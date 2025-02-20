declare module 'react-confetti' {
    import * as React from 'react';
    
    interface ConfettiProps {
      width?: number;
      height?: number;
      numberOfPieces?: number;
      recycle?: boolean;
      colors?: string[];
      gravity?: number;
      initialVelocityY?: number;
      onConfettiComplete?: () => void;
    }
  
    const Confetti: React.FC<ConfettiProps>;
    export default Confetti;
  }