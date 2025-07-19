"use client"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
const Loader = ({ isLoading, onLoadComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => onLoadComplete(), 500)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isLoading, onLoadComplete])

  if (!isLoading) return null

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        {/* Animated leaves */}
        <div className="floating-leaves">
          <div className="leaf leaf-1">🍃</div>
          <div className="leaf leaf-2">🌿</div>
          <div className="leaf leaf-3">🍃</div>
          <div className="leaf leaf-4">🌿</div>
          <div className="leaf leaf-5">🍃</div>
        </div>

        {/* Main loader content */}
        <div className="loader-content">
          <div className="cute-camera">
            <div className="camera-body">
              <div className="camera-lens">
                <div className="lens-inner"></div>
              </div>
              <div className="camera-flash"></div>
              <div className="camera-button"></div>
            </div>
            <div className="camera-strap"></div>
          </div>

          <div className="loading-text">
            <span className="text-main">Loading Gallery</span>
            <div className="dots">
              <span className="dot dot-1">.</span>
              <span className="dot dot-2">.</span>
              <span className="dot dot-3">.</span>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-in;
        }

        .loader-container {
          position: relative;
          text-align: center;
          max-width: 400px;
          padding: 40px;
        }

        .floating-leaves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .leaf {
          position: absolute;
          font-size: 24px;
          animation: float 6s ease-in-out infinite;
          opacity: 0.7;
        }

        .leaf-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .leaf-2 {
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }

        .leaf-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
        }

        .leaf-4 {
          bottom: 20%;
          right: 10%;
          animation-delay: 3s;
        }

        .leaf-5 {
          top: 50%;
          left: 50%;
          animation-delay: 4s;
          transform: translateX(-50%);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        .loader-content {
          position: relative;
          z-index: 2;
        }

        .cute-camera {
          margin-bottom: 30px;
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }

        .camera-body {
          width: 80px;
          height: 60px;
          background: linear-gradient(145deg, #556b2f, #6b8e3d);
          border-radius: 12px;
          position: relative;
          box-shadow: 0 8px 20px rgba(85, 107, 47, 0.3);
        }

        .camera-lens {
          width: 35px;
          height: 35px;
          background: linear-gradient(145deg, #333, #555);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lens-inner {
          width: 20px;
          height: 20px;
          background: linear-gradient(145deg, #000, #333);
          border-radius: 50%;
          animation: focus 2s ease-in-out infinite;
        }

        .camera-flash {
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          top: 10px;
          right: 10px;
          animation: flash 3s ease-in-out infinite;
        }

        .camera-button {
          width: 12px;
          height: 6px;
          background: #444;
          border-radius: 3px;
          position: absolute;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
        }

        .camera-strap {
          width: 60px;
          height: 4px;
          background: #8B4513;
          border-radius: 2px;
          margin: 8px auto 0;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes focus {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.8);
          }
        }

        @keyframes flash {
          0%, 90%, 100% {
            opacity: 0.3;
          }
          95% {
            opacity: 1;
            box-shadow: 0 0 10px #fff;
          }
        }

        .loading-text {
          margin-bottom: 25px;
        }

        .text-main {
          font-size: 24px;
          font-weight: 600;
          color: #556b2f;
          font-family: 'Inika', serif;
        }

        .dots {
          display: inline-block;
          margin-left: 5px;
        }

        .dot {
          font-size: 24px;
          color: #556b2f;
          animation: blink 1.5s ease-in-out infinite;
        }

        .dot-1 {
          animation-delay: 0s;
        }

        .dot-2 {
          animation-delay: 0.3s;
        }

        .dot-3 {
          animation-delay: 0.6s;
        }

        @keyframes blink {
          0%, 60%, 100% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
        }

        .progress-container {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          justify-content: center;
        }

        .progress-bar {
          width: 200px;
          height: 8px;
          background: rgba(85, 107, 47, 0.2);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #556b2f, #6b8e3d, #8fbc8f);
          border-radius: 10px;
          transition: width 0.3s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progress-text {
          font-size: 14px;
          font-weight: 600;
          color: #556b2f;
          min-width: 40px;
        }

        .cute-message {
          font-size: 16px;
          color: #6b8e3d;
          font-style: italic;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .loader-container {
            padding: 20px;
            max-width: 300px;
          }

          .text-main {
            font-size: 20px;
          }

          .progress-bar {
            width: 150px;
          }

          .cute-camera {
            transform: scale(0.8);
          }

          .leaf {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .text-main {
            font-size: 18px;
          }

          .progress-bar {
            width: 120px;
          }

          .cute-message {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}

export default Loader;
