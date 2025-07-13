'use client';
import React from 'react';

const DecorativeLeaves = () => {
  return (
    <>
      <img
        src={'/image-5.png'}
        alt="Decorative Leaf"
        className="leafDecoration leafTopRight"
      />
      <img
        src={'/image-5.png'}
        alt="Decorative Leaf"
        className="leafDecoration leafBottomLeft"
      />
      
      <style jsx>{`
        .leafDecoration {
          position: fixed;
          z-index: 50; /* Changed from -1 to 50 to make it visible */
          pointer-events: none; /* Prevents interference with user interactions */
        }
        
        @keyframes moveAndRotateLeaves {
          0% {
            transform: rotate(2deg) translateX(0) translateY(0); 
          }
          50% {
            transform: rotate(5deg) translateX(10px) translateY(-20px);
          }
          100% {
            transform: rotate(2deg) translateX(0) translateY(0); 
          }
        }
        
        .leafTopRight {
          top: 150px;
          right: -0.2%;
          width: 160px;
          height: auto;
          opacity: 0.7; /* Slightly transparent so it doesn't interfere too much */
          animation: moveAndRotateLeaves 5s ease-in-out infinite; 
        }
        
        .leafBottomLeft {
          top: 290px;
          left: 0;
          width: 160px;
          height: auto;
          transform-origin: 50% 50%; 
          transform: rotate(100deg);
          opacity: 0.9; /* Slightly transparent so it doesn't interfere too much */
          animation: moveAndRotateLeaves2 5s ease-in-out infinite;
        }
        
        @keyframes moveAndRotateLeaves2 {
          0% {
            transform: rotate(100deg) translateX(0) translateY(0);
          }
          50% {
            transform: rotate(105deg) translateX(5px) translateY(-10px); 
          }
          100% {
            transform: rotate(100deg) translateX(0) translateY(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .leafTopRight {
            width: 120px;
            top: 120px;
            right: -5px;
          }
          
          .leafBottomLeft {
            width: 120px;
            top: 250px;
            left: -10px;
          }
        }

        @media (max-width: 480px) {
          .leafTopRight {
            width: 100px;
            top: 100px;
            right: -10px;
          }
          
          .leafBottomLeft {
            width: 100px;
            top: 220px;
            left: -15px;
          }
        }
      `}</style>
    </>
  );
};

export default DecorativeLeaves;