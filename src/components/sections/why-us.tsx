"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export function WhyUs() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) {
      setIsPlaying((prev) => !prev);
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(true));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  return (
    <section id="about" className="bg-graphite lg:bg-surface-warm">
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-0">
        {/* Left — dark column with rounded bottom on desktop, flat on mobile to connect with Services */}
        <div className="bg-graphite p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center text-white rounded-none lg:rounded-b-[16px] relative z-10">
          <h2 className="text-white text-[clamp(1.4rem,2.2vw,2.15rem)] font-bold leading-[1.15] tracking-tight font-heading">
            Инжиниринговый
            <br />
            центр АСУТП:
            <br />
            команда и{"\u00A0"}ресурсы
          </h2>

          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-4 my-2">
            <div>
              <div className="text-2xl font-black text-[#E66826]">3 года</div>
              <div className="text-[11px] text-white/50 leading-tight mt-0.5">слаженная работа команды</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">50</div>
              <div className="text-[11px] text-white/50 leading-tight mt-0.5">ведущих инженеров</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">50+</div>
              <div className="text-[11px] text-white/50 leading-tight mt-0.5">сданных объектов</div>
            </div>
          </div>

          <p className="mt-4 text-white/70 text-[13.5px] leading-relaxed">
            Команда объединяет ведущих специалистов из{"\u00A0"}ключевых проектных институтов и{"\u00A0"}системных интеграторов страны.
          </p>

          <div className="mt-4 space-y-1.5 text-[12px] font-mono text-white/60">
            <div>— <strong className="text-white">Москва:</strong> управление проектами, проектирование по РФ</div>
            <div>— <strong className="text-white">Самара (Волга):</strong> Нефтегаз, АПК, производство 19 км</div>
            <div>— <strong className="text-white">Челябинск (Урал):</strong> Добыча, ТЭК, металлургия</div>
          </div>
        </div>

        {/* Right — Video Placeholder (Strictly no heading, no description) */}
        <div className="bg-graphite flex items-stretch">
          <div className="bg-surface-warm w-full h-full relative flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 select-none overflow-hidden min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] rounded-t-[16px] lg:rounded-t-[20px]">
            {/* Video Player Card */}
            <div
              onClick={togglePlay}
              className="relative w-full max-w-[720px] aspect-[16/10] sm:aspect-video rounded-2xl md:rounded-[20px] overflow-hidden bg-[#121518] border border-divider/60 shadow-[0_20px_50px_rgba(0,0,0,0.12)] group cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-graphite/40"
            >
              {/* Optional real video tag if added later */}
              <video
                ref={videoRef}
                src="/video/production.mp4"
                playsInline
                muted={isMuted}
                loop
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Placeholder Backdrop: Subtle Industrial Technical Aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C2025] via-[#14171A] to-[#0E1012] flex items-center justify-center overflow-hidden">
                {/* Subtle Technical Grid Lines */}
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Subtle Architectural CAD Center Silhouette */}
                <svg
                  viewBox="0 0 240 140"
                  className="w-3/5 max-w-[320px] opacity-[0.14] text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M40 25 L120 25 L120 115 L40 115 Z" />
                  <path d="M120 25 L180 50 L180 115 L120 115" strokeDasharray="3 3" />
                  <line x1="50" y1="45" x2="110" y2="45" />
                  <line x1="50" y1="65" x2="110" y2="65" />
                  <line x1="50" y1="85" x2="110" y2="85" />
                  <circle cx="80" cy="95" r="3" />
                </svg>

                {/* Ambient Soft Glow Behind Play Button */}
                <div className="absolute w-40 h-40 rounded-full bg-[#E66826]/10 blur-3xl pointer-events-none" />
              </div>

              {/* Central Play / Pause Button */}
              <div className="relative z-20 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-graphite flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.25)] border border-white/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-active:scale-95">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-graphite text-graphite" strokeWidth={0} />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-graphite text-graphite ml-1" strokeWidth={0} />
                  )}
                </div>
              </div>

              {/* Player Bottom Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-3.5 sm:p-5 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col gap-2 pointer-events-auto">
                {/* Scrubber Progress Bar */}
                <div className="w-full h-1 group-hover:h-1.5 bg-white/20 rounded-full overflow-hidden transition-all duration-200">
                  <div className="h-full w-[28%] bg-[#E66826] rounded-full transition-all duration-300" />
                </div>

                {/* Bottom Row Icons */}
                <div className="flex items-center justify-between text-white/70 text-[11px] font-mono">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="hidden sm:inline">00:00 / 02:45</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="px-1.5 py-0.5 rounded-[4px] text-[10px] font-mono bg-white/10 text-white/80 border border-white/15">
                      1080p HD
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
