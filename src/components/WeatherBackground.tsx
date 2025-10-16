import { useEffect, useState } from "react";

type WeatherType = "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "thunderstorm";

interface WeatherBackgroundProps {
  weather: WeatherType;
}

export const WeatherBackground = ({ weather }: WeatherBackgroundProps) => {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    // Disable lightning flashes to prevent background flashing
    if (weather === "thunderstorm") {
      setLightning(false);
    }
  }, [weather]);

  const getBackgroundGradient = () => {
    switch (weather) {
      case "sunny":
        return "linear-gradient(to bottom, #87CEEB 0%, #B0E5FC 40%, #FFE5B4 75%, #F5DEB3 100%)";
      case "partly-cloudy":
        return "linear-gradient(to bottom, #87CEEB 0%, #B0C4DE 50%, #87CEEB 100%)";
      case "cloudy":
        return "linear-gradient(to bottom, #708090 0%, #778899 50%, #696969 100%)";
      case "rainy":
        return "linear-gradient(to bottom, #2C3E50 0%, #34495E 50%, #2C3E50 100%)";
      case "thunderstorm":
        // Everything-is-on-fire theme: smoky sky fading to intense orange glow
        return "linear-gradient(to bottom, #0b0b0c 0%, #1a1411 45%, #2b1a10 70%, #3a1e0a 85%, #4a2106 100%)";
      default:
        return "linear-gradient(to bottom, #87CEEB 0%, #87CEEB 100%)";
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: getBackgroundGradient() }}
      />

      {/* Lightning flash */}
      {/* Lightning flash disabled */}

      {/* Clouds (no clouds in fire mode) */}
      {(weather === "sunny" || weather === "partly-cloudy" || weather === "cloudy" || weather === "rainy") && (
        <>
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
          <div className="cloud cloud-4" />
        </>
      )}

      {/* Rain */}
      {weather === "rainy" && (
        <div className="rain-container">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Fire: flames, embers, and smoke for thunderstorm */}
      {weather === "thunderstorm" && (
        <>
          {/* Orange glow overlay */}
          <div className="fire-glow" />

          {/* Flames at the bottom */}
          <div className="fire-container">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="flame"
                style={{
                  left: `${(i / 18) * 100}%`,
                  animationDelay: `${(Math.random() * 2).toFixed(2)}s`,
                  transform: `scale(${(0.6 + Math.random() * 0.9).toFixed(2)})`,
                }}
              />
            ))}
          </div>

          {/* Embers floating up */}
          <div className="embers-container">
            {Array.from({ length: 120 }).map((_, i) => (
              <div
                key={i}
                className="ember"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${(Math.random() * 4).toFixed(2)}s`,
                  animationDuration: `${(3 + Math.random() * 5).toFixed(2)}s`,
                  opacity: `${(0.4 + Math.random() * 0.6).toFixed(2)}`,
                }}
              />
            ))}
          </div>

          {/* Slow moving smoke plumes */}
          <div className="smoke-container">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="smoke"
                style={{
                  left: `${10 + i * 15 + Math.random() * 5}%`,
                  animationDelay: `${(i * 1.5).toFixed(2)}s`,
                  animationDuration: `${(12 + Math.random() * 6).toFixed(2)}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Sun */}
      {weather === "sunny" && (
        <div className="absolute top-20 right-20 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-90" />
          <div className="absolute inset-0 rounded-full bg-yellow-200 opacity-40 blur-2xl scale-150" />
        </div>
      )}

      {/* Beach waves for sunny weather */}
      {weather === "sunny" && (
        <>
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </>
      )}

      {/* Contrast overlay to improve text legibility on sunny theme */}
      {weather === "sunny" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.0) 75%)",
          }}
        />
      )}

      <style>{`
        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 100px;
          animation: float 20s infinite ease-in-out;
        }

        .cloud::before,
        .cloud::after {
          content: "";
          position: absolute;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 100px;
        }

        .cloud-1 {
          width: 200px;
          height: 60px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .cloud-1::before {
          width: 100px;
          height: 100px;
          top: -50px;
          left: 10px;
        }

        .cloud-1::after {
          width: 120px;
          height: 120px;
          top: -60px;
          right: 10px;
        }

        .cloud-2 {
          width: 180px;
          height: 50px;
          top: 20%;
          right: 15%;
          animation-delay: -5s;
        }

        .cloud-2::before {
          width: 90px;
          height: 90px;
          top: -40px;
          left: 15px;
        }

        .cloud-2::after {
          width: 100px;
          height: 100px;
          top: -50px;
          right: 15px;
        }

        .cloud-3 {
          width: 220px;
          height: 70px;
          top: 40%;
          left: 20%;
          animation-delay: -10s;
        }

        .cloud-3::before {
          width: 110px;
          height: 110px;
          top: -55px;
          left: 20px;
        }

        .cloud-3::after {
          width: 130px;
          height: 130px;
          top: -65px;
          right: 20px;
        }

        .cloud-4 {
          width: 160px;
          height: 55px;
          top: 60%;
          right: 25%;
          animation-delay: -15s;
        }

        .cloud-4::before {
          width: 80px;
          height: 80px;
          top: -35px;
          left: 12px;
        }

        .cloud-4::after {
          width: 90px;
          height: 90px;
          top: -45px;
          right: 12px;
        }

        @keyframes float {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(100px) translateY(-20px);
          }
        }

        .rain-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .rain-drop {
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, rgba(174, 194, 224, 0.8), rgba(174, 194, 224, 0.2));
          animation: fall linear infinite;
        }

        @keyframes fall {
          0% {
            top: -10%;
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0.5;
          }
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: rgba(100, 180, 200, 0.25);
          border-radius: 50% 50% 0 0;
          animation: wave 12s ease-in-out infinite;
        }

        .wave-1 {
          animation-delay: 0s;
          opacity: 0.3;
        }

        .wave-2 {
          animation-delay: -4s;
          opacity: 0.2;
          height: 120px;
        }

        .wave-3 {
          animation-delay: -8s;
          opacity: 0.15;
          height: 140px;
        }

        @keyframes wave {
          0%, 100% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-15%) scaleY(1.1);
          }
        }

        /* Fire theme styles */
        .fire-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 90%, rgba(255, 140, 0, 0.35), rgba(0,0,0,0) 50%),
                      radial-gradient(circle at 20% 95%, rgba(255, 80, 0, 0.25), rgba(0,0,0,0) 40%),
                      radial-gradient(circle at 80% 95%, rgba(255, 60, 0, 0.25), rgba(0,0,0,0) 40%);
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .fire-container {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 28vh;
          pointer-events: none;
          overflow: hidden;
        }

        .flame {
          position: absolute;
          bottom: -4vh;
          width: 70px;
          height: 140px;
          background: radial-gradient(ellipse at center, rgba(255, 220, 150, 0.95) 0%, rgba(255, 165, 0, 0.95) 35%, rgba(255, 80, 0, 0.9) 60%, rgba(255, 60, 0, 0.0) 70%);
          filter: blur(1px) saturate(120%);
          border-bottom-left-radius: 50% 60%;
          border-bottom-right-radius: 50% 60%;
          transform-origin: bottom center;
          animation: flicker 1.5s infinite ease-in-out;
          mix-blend-mode: screen;
        }

        @keyframes flicker {
          0%   { transform: translateY(0) scaleY(0.95) skewX(0deg); opacity: 0.85; }
          50%  { transform: translateY(-10px) scaleY(1.1) skewX(2deg); opacity: 1; }
          100% { transform: translateY(0) scaleY(0.95) skewX(-1deg); opacity: 0.9; }
        }

        .embers-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ember {
          position: absolute;
          bottom: 0;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(255,200,120,1) 0%, rgba(255,120,40,0.9) 40%, rgba(255,120,40,0.0) 70%);
          border-radius: 50%;
          filter: blur(0.5px);
          animation: rise linear infinite;
        }

        @keyframes rise {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
          50%  { transform: translateY(-60vh) translateX(-10px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(-120vh) translateX(5px) scale(0.8); opacity: 0; }
        }

        .smoke-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .smoke {
          position: absolute;
          bottom: 0;
          width: 200px;
          height: 200px;
          background: radial-gradient(ellipse at center, rgba(80,80,80,0.35) 0%, rgba(60,60,60,0.25) 40%, rgba(40,40,40,0.0) 70%);
          border-radius: 50%;
          filter: blur(8px);
          animation: driftUp linear infinite;
          opacity: 0.6;
        }

        @keyframes driftUp {
          0%   { transform: translateY(0) translateX(0) scale(0.8); opacity: 0.4; }
          50%  { transform: translateY(-30vh) translateX(30px) scale(1); opacity: 0.35; }
          100% { transform: translateY(-60vh) translateX(-20px) scale(1.1); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
};
