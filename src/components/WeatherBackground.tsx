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
        return "linear-gradient(to bottom, #87CEEB 0%, #FFD700 50%, #FFA500 70%, #F4A460 100%)";
      case "partly-cloudy":
        return "linear-gradient(to bottom, #87CEEB 0%, #B0C4DE 50%, #87CEEB 100%)";
      case "cloudy":
        return "linear-gradient(to bottom, #708090 0%, #778899 50%, #696969 100%)";
      case "rainy":
        return "linear-gradient(to bottom, #2C3E50 0%, #34495E 50%, #2C3E50 100%)";
      case "thunderstorm":
        return "linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";
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

      {/* Clouds */}
      {(weather === "partly-cloudy" || weather === "cloudy" || weather === "rainy" || weather === "thunderstorm") && (
        <>
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
          <div className="cloud cloud-4" />
        </>
      )}

      {/* Rain */}
      {(weather === "rainy" || weather === "thunderstorm") && (
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

      {/* Sun */}
      {weather === "sunny" && (
        <div className="absolute top-20 right-20 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-yellow-300" />
          <div className="absolute inset-0 rounded-full bg-yellow-200 opacity-60 blur-xl" />
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

      <style>{`
        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, ${weather === "thunderstorm" ? "0.1" : "0.8"});
          border-radius: 100px;
          animation: float 20s infinite ease-in-out;
        }

        .cloud::before,
        .cloud::after {
          content: "";
          position: absolute;
          background: rgba(255, 255, 255, ${weather === "thunderstorm" ? "0.1" : "0.8"});
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
          background: rgba(135, 206, 250, 0.3);
          border-radius: 50% 50% 0 0;
          animation: wave 8s ease-in-out infinite;
        }

        .wave-1 {
          animation-delay: 0s;
          opacity: 0.3;
        }

        .wave-2 {
          animation-delay: -2s;
          opacity: 0.2;
          height: 120px;
        }

        .wave-3 {
          animation-delay: -4s;
          opacity: 0.1;
          height: 140px;
        }

        @keyframes wave {
          0%, 100% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) scaleY(1.2);
          }
        }
      `}</style>
    </div>
  );
};
