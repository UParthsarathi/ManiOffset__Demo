"use client";

interface RealisticBookProps {
  title: string; // stamped down the spine
  onClick?: () => void;
  thickness?: number; // spine depth in px
}

// Foil is a gradient clipped to the glyphs, plus a dark lower edge so the type
// reads as stamped into the cloth rather than printed flat on top of it.
const FOIL =
  "bg-gradient-to-br from-[#fbf1c8] via-[#d8b254] to-[#8a6a1e] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.55)]";

// Registration crosshair — the mark a pressman lines up plates against.
const RegMark = ({ className }: { className: string }) => (
  <div className={`absolute w-[7px] h-[7px] opacity-40 ${className}`}>
    <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-[#c9a44c]" />
    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#c9a44c]" />
  </div>
);

export function RealisticBook({ title, onClick, thickness = 20 }: RealisticBookProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Open the FeelThePRINT 3D print catalogue"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative w-[180px] h-[250px] sm:w-[220px] sm:h-[300px] md:w-[260px] md:h-[340px] perspective-[2500px] cursor-pointer z-10 hover:z-50 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f29a1b] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d1430] rounded-sm"
    >
      <div className="relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] rotate-y-[-25deg] rotate-x-[15deg] group-hover:rotate-y-[0deg] group-hover:rotate-x-[0deg] group-hover:-translate-y-6 group-hover:scale-105">
        {/* Ambient Drop Shadow (Soft, Distant) */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/40 blur-[25px] rounded-sm transition-all duration-700 ease-out transform translate-y-6 translate-x-6 opacity-70 group-hover:translate-y-14 group-hover:translate-x-10 group-hover:blur-[35px] group-hover:opacity-40"
          style={{ transform: 'translateZ(-60px)' }}
        />

        {/* Contact Drop Shadow (Sharp, Close) */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/60 blur-[8px] rounded-sm transition-all duration-700 ease-out transform translate-y-1 translate-x-1 opacity-90 group-hover:translate-y-4 group-hover:translate-x-3 group-hover:blur-[15px] group-hover:opacity-50"
          style={{ transform: 'translateZ(-10px)' }}
        />

        {/* Front Cover Container */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-r-md rounded-l-sm overflow-hidden z-20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),inset_4px_0_10px_rgba(0,0,0,0.8)] border-r border-[#222]">
          {/* Cover stock: dyed navy book cloth */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1b2552_0%,#121b3e_45%,#080d20_100%)]" />

          {/* Woven cloth grain */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.030) 2px,rgba(255,255,255,0.030) 3px),repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(255,255,255,0.022) 2px,rgba(255,255,255,0.022) 3px)',
            }}
          />

          {/* Foil rules. Wider inset on the left so the frame clears the hinge groove. */}
          <div className="absolute inset-y-[10px] left-[16px] right-[10px] border border-[#c9a44c]/50" />
          <div className="absolute inset-y-[14px] left-[20px] right-[14px] border border-[#c9a44c]/20" />

          <RegMark className="top-[15px] left-[21px]" />
          <RegMark className="top-[15px] right-[15px]" />
          <RegMark className="bottom-[15px] left-[21px]" />
          <RegMark className="bottom-[15px] right-[15px]" />

          {/* Stamped type */}
          <div className="absolute inset-y-[10px] left-[16px] right-[10px] flex flex-col items-center justify-between py-5 sm:py-6 px-3 text-center">
            <span className="font-mono text-[5px] sm:text-[6px] md:text-[7px] tracking-[0.3em] uppercase text-[#c9a44c]/60">
              A Unit of Mani Offset Press
            </span>

            <div className="flex flex-col items-center -mt-1">
              <span className={`font-serif leading-none text-base sm:text-lg md:text-2xl ${FOIL}`}>
                FeelThe
              </span>
              <span
                className={`font-sans font-black leading-none uppercase text-2xl sm:text-3xl md:text-[2.6rem] tracking-[0.1em] indent-[0.1em] ${FOIL}`}
              >
                Print
              </span>

              <div className="mt-2.5 sm:mt-3 h-px w-8 sm:w-10 bg-gradient-to-r from-transparent via-[#c9a44c] to-transparent" />

              <span className="mt-2 sm:mt-2.5 font-sans text-[6px] sm:text-[7px] md:text-[8px] font-bold tracking-[0.32em] uppercase text-slate-300/70">
                Print Catalogue
              </span>
            </div>

            <span className="font-mono text-[5px] sm:text-[6px] md:text-[7px] tracking-[0.3em] uppercase text-[#c9a44c]/60">
              Chennai · Since 1995
            </span>
          </div>

          {/* Cover vignette / deep shadow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/10 to-white/10 opacity-90 mix-blend-multiply" />

          {/* Subtle paper/leather texture overlay */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          {/* Gloss/glare lighting sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay rotate-[-10deg] scale-150" />

          {/* Book hinge/joint groove line (where cover meets spine) - deeper for realism */}
          <div className="absolute top-0 bottom-0 left-[6px] w-[6px] bg-gradient-to-r from-black/60 via-black/90 to-black/60 shadow-[1px_0_2px_rgba(255,255,255,0.1),-1px_0_2px_rgba(0,0,0,0.8)] pointer-events-none" />
          {/* Edge highlights */}
          <div className="absolute inset-0 border border-white/10 rounded-r-md rounded-l-sm pointer-events-none" />
        </div>

        {/* Spine */}
        <div
          className="absolute top-0 left-0 h-full origin-left bg-[#0a0a0a] overflow-hidden flex flex-col justify-center items-center py-8 z-10 border-l border-[#333]"
          style={{
            width: `${thickness}px`,
            transform: `translateZ(-${thickness}px) rotateY(-90deg)`
          }}
        >
          {/* Spine texture/lighting to make it look rounded - harsh lighting for gloss */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-white/10 to-black shadow-[inset_0_0_10px_rgba(0,0,0,0.9)]" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/10 blur-[1px]" />

          <span
            className="text-amber-500/90 font-serif text-[10px] md:text-[12px] tracking-[0.2em] font-medium uppercase shrink-0 whitespace-nowrap filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
            style={{ writingMode: 'vertical-rl' }}
          >
            {title}
          </span>
        </div>

        {/* Right Page Edges (Opposite the spine) */}
        <div
          className="absolute top-[3px] right-[2px] bottom-[3px] origin-right bg-[#e6e2d3] flex overflow-hidden border-y border-[#b5af9c]"
          style={{
            width: `${thickness - 4}px`,
            transform: `translateZ(-${thickness - 2}px) rotateY(90deg)`
          }}
        >
          {/* Realistic paper stripes using CSS repeating gradient */}
          <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)' }} />

          {/* Edge shadow simulation / concavity */}
          <div className="absolute inset-0 shadow-[inset_4px_0_15px_rgba(0,0,0,0.4)]" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/20" />
        </div>

        {/* Top Page Edges */}
        <div
          className="absolute top-[2px] left-[3px] right-[4px] origin-top bg-[#e6e2d3] flex overflow-hidden border-x border-[#b5af9c] z-0"
          style={{
            height: `${thickness - 4}px`,
            transform: `translateZ(-${thickness - 2}px) rotateX(90deg)`
          }}
        >
          {/* Paper stripes top */}
          <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)' }} />

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Bottom Page Edges */}
        <div
          className="absolute bottom-[2px] left-[3px] right-[4px] origin-bottom bg-[#e6e2d3] flex overflow-hidden border-x border-[#b5af9c] z-0"
          style={{
            height: `${thickness - 4}px`,
            transform: `translateZ(-${thickness - 2}px) rotateX(-90deg)`
          }}
        >
          {/* Paper stripes bottom */}
          <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(to top, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)' }} />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 shadow-[inset_0_-4px_12px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Back Cover */}
        <div
          className="absolute inset-0 bg-[#0f0f0f] border border-[#222] rounded-l-md rounded-r-sm"
          style={{ transform: `translateZ(-${thickness}px) rotateY(180deg)` }}
        >
           <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />
           <div className="absolute top-0 bottom-0 right-[8px] w-[2px] bg-black/60 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
