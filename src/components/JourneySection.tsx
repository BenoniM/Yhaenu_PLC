import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Loader2 } from "lucide-react";
import journeyVideo from "../assets/journey/13844771_3840_2160_25fps (1).mp4";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export interface MilestoneData {
  id: string;
  year: string;
  title: string;
  description: string | null;
  created_at: string;
}

const CANVAS_W = 1920;
const CANVAS_H = 1080;
const START_BUF = 0.05; 
const END_BUF = 0.05; 
const CH_FADE = 0.06;

export default function JourneySection() {
  const [milestones, setMilestones] = useState<MilestoneData[]>([]);
  const [loading, setLoading] = useState(true);

  const outerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);
  const seekingRef = useRef(false);

  const rafRef = useRef<number | null>(null);

  const dragProgress = useMotionValue(0);
  const handleY = useMotionValue(0);
  const smoothProgress = useSpring(dragProgress, { damping: 20, stiffness: 100 });
  const smoothHandleY = useSpring(handleY, { damping: 25, stiffness: 200 });
  const progressBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  const stRef = useRef<globalThis.ScrollTrigger | null>(null);
  const isDraggingRef = useRef(false);

  // ── Fetch Milestones ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_LINK}/milestones`);
        if (!res.ok) throw new Error("Failed to fetch milestones");
        const data = await res.json();
        
        // Sort by year
        const sorted = data.sort((a: MilestoneData, b: MilestoneData) => parseInt(a.year) - parseInt(b.year));
        setMilestones(sorted);
      } catch (err) {
        console.error("Error fetching milestones:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMilestones();
  }, []);

  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw || !vh) return;
    const vR = vw / vh, cR = CANVAS_W / CANVAS_H;
    let sx = 0, sy = 0, sw = vw, sh = vh;
    if (vR > cR) { sw = vh * cR; sx = (vw - sw) / 2; }
    else { sh = vw / cR; sy = (vh - sh) / 2; }
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, CANVAS_W, CANVAS_H);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => {
      durationRef.current = video.duration;
      video.currentTime = 0;
    };
    const onSeeked = () => {
      drawFrame();
      currentTimeRef.current = video.currentTime;
      seekingRef.current = false;
    };
    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady, { once: true });
    video.addEventListener("seeked", onSeeked);
    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [drawFrame]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const LERP = 0.18;
    const tick = () => {
      if (!seekingRef.current) {
        const gap = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(gap) > 0.02) {
          seekingRef.current = true;
          video.currentTime = currentTimeRef.current + gap * LERP;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    if (loading || milestones.length === 0) return;
    const outer = outerRef.current;
    if (!outer) return;

    const update = (p: number) => {
      const dur = durationRef.current;
      if (dur) {
        const vp = p <= START_BUF ? 0 : (p - START_BUF) / (1 - START_BUF);
        targetTimeRef.current = Math.min(dur - 0.02, Math.max(0, vp * dur));
      }

      const numChapters = milestones.length;
      milestones.forEach((_, i) => {
        const el = overlayRefs.current[i];
        const dot = dotRefs.current[i];

        const winStart = i / numChapters;
        const winEnd = (i + 1) / numChapters;
        const fadeInEnd = winStart + CH_FADE;
        const fadeOutStart = winEnd - CH_FADE;
        const isFirst = i === 0;
        const isLast = i === numChapters - 1;
        const effectiveEnd = isLast ? (1 - END_BUF + 0.001) : winEnd;

        let opacity = 0;
        if (p >= winStart && p < effectiveEnd) {
          if (!isFirst && p < fadeInEnd) {
            opacity = (p - winStart) / CH_FADE;
          } else if (!isLast && p > fadeOutStart) {
            opacity = (winEnd - p) / CH_FADE;
          } else {
            opacity = 1;
          }
        }
        if (isLast && p >= (1 - END_BUF)) {
          opacity = Math.max(0, (1 - p) / END_BUF);
        }

        const o = Math.max(0, Math.min(1, opacity));
        if (el) {
          el.style.opacity = String(o);
          el.style.transform = `translateY(${(1 - o) * 16}px)`;
        }
        if (dot) {
          const active = p >= winStart && p < effectiveEnd;
          const dotO = isLast && p >= (1 - END_BUF)
            ? Math.max(0.3, (1 - p) / END_BUF)
            : active ? 1 : 1;
          dot.style.opacity = String(dotO);
          dot.style.transform = active ? "scaleY(1)" : "scaleY(0.5)";
          dot.style.backgroundColor = active ? "#ECBD27" : "rgba(255, 255, 255, 1)";
        }
      });
    };

    update(0);

    const st = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        update(self.progress);
        if (!isDraggingRef.current) {
          dragProgress.set(self.progress);
          handleY.set(self.progress * 320);
        }
      },
    });

    stRef.current = st;

    return () => { st.kill(); };
  }, [loading, milestones, dragProgress, handleY]);

  return (
    <div ref={outerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-[100] bg-[#0E5F13] flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#ECBD27]" />
          </div>
        )}
        <video
          ref={videoRef}
          src={journeyVideo}
          muted
          playsInline
          preload="auto"
          className="absolute opacity-0 pointer-events-none"
          style={{ width: "1px", height: "1px" }}
        />

        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(100deg, rgba(14,95,19,0.95) 0%, rgba(14,95,19,0.7) 40%, rgba(14,95,19,0.2) 70%, transparent 100%)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-2/5"
          style={{ background: "linear-gradient(to top, rgba(14,95,19,0.9) 0%, transparent 100%)" }}
        />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-7 border-b border-white/10">
          <span className="ml-2 text-sm font-bold tracking-[0.24em] uppercase text-[#ECBD27]">Our Journey</span>
          <span className="ml-2 text-sm font-medium tracking-[0.2em] uppercase text-white/80">Scroll to explore</span>
        </div>

        {milestones.map((m, i) => (
          <div
            key={m.id || i}
            ref={(el) => { overlayRefs.current[i] = el; }}
            className="absolute bottom-[25%] left-[4%] pointer-events-none"
            style={{
              maxWidth: "min(580px, 70vw)",
              opacity: i === 0 ? 1 : 0,
              transition: "opacity 0.08s linear, transform 0.08s linear",
              willChange: "opacity, transform",
            }}
          >
            <div className="flex gap-7 items-start">
              <div
                className="w-[3px] min-h-[150px] flex-shrink-0 mt-1 rounded-sm"
                style={{ background: "linear-gradient(to bottom, #ECBD27, #f5d657)" }}
              />
              <div
                className="rounded-xl px-6 py-4"
                style={{
                  background: "rgba(14,95,19,0.55)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-3 text-[#ECBD27] font-['Arial_Black']">
                  Chapter {String(i + 1).padStart(2, '0')}
                </p>
                <p
                  className="font-black leading-none mb-1 select-none font-['Arial_Black']"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "white" }}
                >
                  {m.year}
                </p>
                <h3
                  className="font-black leading-[1.05] mb-4 text-[#ECBD27] font-['Arial_Black'] uppercase"
                  style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.5rem)", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
                >
                  {m.title}
                </h3>
                {m.description && (
                  <p
                    className="text-white font-light leading-[1.8]"
                    style={{ fontSize: "clamp(0.9rem, 1.3vw, 1rem)", maxWidth: "400px", opacity: 0.92 }}
                  >
                    {m.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-8 z-50">
          <div className="flex flex-col items-center gap-4">
            {milestones.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-[6px]">
                <div
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="w-[3px] h-6 md:h-9 rounded-sm transition-all duration-200"
                  style={{ backgroundColor: "rgba(255, 255, 255, 1)", transformOrigin: "center", opacity: 1 }}
                />
                <span
                  className="text-[10px] md:text-sm font-bold tracking-[0.15em] uppercase text-white select-none"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          <div 
            className="relative group flex flex-col items-center hidden md:flex" 
            style={{ 
              height: 320, 
              width: 44, 
              touchAction: "none",
              cursor: isDraggingRef.current ? "none" : "grab"
            }}
            onPointerDown={(e) => {
              const target = e.currentTarget;
              const st = stRef.current;
              if (!st) return;

              const rect = target.getBoundingClientRect();
              const initialY = Math.max(0, Math.min(320, e.clientY - rect.top));
              const initialP = initialY / 320;
              
              isDraggingRef.current = true;
              handleY.set(initialY);
              dragProgress.set(initialP);
              gsap.set(window, { scrollTo: st.start + (initialP * (st.end - st.start)) });

              target.requestPointerLock();

              const onMouseMove = (me: MouseEvent) => {
                const currentVal = handleY.get();
                const nextVal = Math.max(0, Math.min(320, currentVal + me.movementY));
                const p = nextVal / 320;

                handleY.set(nextVal);
                dragProgress.set(p);
                gsap.set(window, { scrollTo: st.start + (p * (st.end - st.start)) });
              };

              const onLockChange = () => {
                if (document.pointerLockElement !== target) {
                  isDraggingRef.current = false;
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("pointerlockchange", onLockChange);
                }
              };

              document.addEventListener("mousemove", onMouseMove);
              document.addEventListener("pointerlockchange", onLockChange);

              const onUp = () => {
                if (document.pointerLockElement === target) {
                  document.exitPointerLock();
                }
                window.removeEventListener("pointerup", onUp);
              };
              window.addEventListener("pointerup", onUp);
            }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white rounded-full" />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-[#ECBD27] rounded-full origin-top pointer-events-none"
              style={{ height: progressBarHeight }}
            />
            <motion.div
              style={{ y: smoothHandleY, translateY: "-50%" }}
              className="absolute top-0 -translate-x-1/2 w-6 h-16 bg-[#0E5F13] rounded-full cursor-grab active:cursor-grabbing border border-[#ECBD27] flex items-center justify-center z-10 transition-transform group-hover:scale-105 active:scale-95"
            >
              <div className="flex flex-col gap-1.5 pointer-events-none">
                <div className="w-2 h-[3px] bg-[#ECBD27] rounded-xl" />
                <div className="w-2 h-[3px] bg-[#ECBD27] rounded-xl" />
              </div>
            </motion.div>
            <div className="absolute -right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0">
              <span
                className="text-[9px] font-black tracking-[0.4em] uppercase text-[#ECBD27] whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}
              >
                DRAG · SCRUB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
