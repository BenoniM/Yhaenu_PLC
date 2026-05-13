import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import importVideo from '../assets/hero-video/import.mp4'
import manufacturingVideo from '../assets/hero-video/manufacturing.mp4'
import transportationVideo from '../assets/hero-video/hospitality.mp4'
import logoCut from '../assets/logo/Logo-Cut.svg'

const pathImport = "M66.6218 151.625C67.3516 150.734 68.0659 149.827 68.811 148.951C71.3613 145.94 73.9115 142.929 76.4925 139.941C79.0351 137.007 81.6237 134.111 84.1663 131.184C85.9638 129.118 87.7228 127.021 89.5049 124.947C92.5545 121.398 95.5963 117.841 98.6612 114.3C102.018 110.429 105.406 106.588 108.755 102.709C112.273 98.6301 115.737 94.5205 119.248 90.4416C123.964 84.9571 128.696 79.4955 133.42 74.0263C134.296 73.0124 135.11 71.9523 136.047 70.9998C136.377 70.6618 136.984 70.4544 137.476 70.4391C139.258 70.3699 141.048 70.4083 142.83 70.4083C167.994 70.4083 193.166 70.4083 218.331 70.4083C218.999 70.4083 219.675 70.393 220.343 70.4391C220.705 70.4621 221.066 70.5927 221.419 70.6772C221.273 71.0075 221.181 71.3762 220.973 71.6604C220.313 72.5592 219.606 73.4195 218.922 74.3029C211.433 83.8586 203.944 93.4067 196.454 102.962C192.368 108.178 188.281 113.386 184.187 118.594C179.639 124.378 175.069 130.147 170.529 135.939C166.934 140.525 163.247 145.057 159.852 149.789C158.584 151.555 157.256 151.963 155.251 151.955C126.699 151.901 98.1543 151.916 69.6022 151.909C68.6881 151.909 67.774 151.909 66.8523 151.909C66.7678 151.817 66.6909 151.732 66.6064 151.64L66.6218 151.625Z"
const pathManufacturing = "M233.632 55.706C205.234 55.6753 176.843 55.6753 148.444 55.6753C147.984 55.6753 147.515 55.6369 146.847 55.6061C147.085 55.1683 147.192 54.861 147.377 54.5922C150.203 50.5901 153.023 46.5804 155.865 42.5937C158.814 38.4381 161.787 34.3054 164.745 30.1651C167.756 25.9403 170.751 21.7078 173.747 17.4676C176.336 13.8036 178.901 10.1241 181.49 6.46008C182.819 4.57044 184.148 2.66543 185.554 0.821877C185.838 0.445485 186.422 0.184315 186.906 0.1075C187.62 -0.0154033 188.365 0.0690929 189.102 0.0690929C218.307 0.0690929 247.528 0.0767744 276.74 0.0767744L233.632 55.7137V55.706Z"
const pathTransportation = "M0 0.176666C0.499296 0.130577 0.775829 0.0844883 1.04468 0.0844883C15.4244 0.0537624 29.8041 0.0230365 44.1838 -7.96001e-06C59.0091 -0.0153709 73.8343 -7.96001e-06 88.6596 -7.96001e-06C91.0792 -7.96001e-06 93.4989 -0.0153709 95.9186 0.0921697C96.4256 0.115214 97.0785 0.506969 97.3781 0.92945C102.878 8.81833 108.347 16.7379 113.801 24.6575C116.152 28.0681 118.448 31.5094 120.791 34.92C123.457 38.8068 126.161 42.6629 128.834 46.542C130.731 49.292 132.613 52.042 134.495 54.7996C134.618 54.9763 134.702 55.1837 134.887 55.5294C134.357 55.5755 133.934 55.6446 133.519 55.6446C111.282 55.6446 89.0513 55.6446 66.8135 55.6446C56.7968 55.6446 46.7802 55.6369 36.7635 55.6676C35.7035 55.6676 35.0275 55.3911 34.4361 54.4309C31.3481 49.4226 28.1756 44.4604 25.0186 39.4905C22.9676 36.2719 20.8629 33.0841 18.8119 29.8656C16.9684 26.9697 15.1786 24.043 13.3427 21.1394C11.215 17.7749 9.0795 14.4258 6.92869 11.0767C5.56907 8.96427 4.17104 6.88259 2.8191 4.77019C1.88964 3.31839 1.02164 1.84355 0 0.176666Z"

const getMaskUrl = (pathD: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 277 152"><path d="${pathD}" fill="black"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

type HoveredState = 'import' | 'manufacturing' | 'transportation' | null

import GridBackground from './GridBackground'

export default function Hero() {

  const [hovered, setHovered] = useState<HoveredState>(null)
  const [isEntering, setIsEntering] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const logoCutRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const yLogoRef = useRef<HTMLDivElement>(null)

  // Refs for video syncing
  const logoRefs = {
    import: useRef<HTMLVideoElement>(null),
    manufacturing: useRef<HTMLVideoElement>(null),
    transportation: useRef<HTMLVideoElement>(null),
  }
  const bgRefs = {
    import: useRef<HTMLVideoElement>(null),
    manufacturing: useRef<HTMLVideoElement>(null),
    transportation: useRef<HTMLVideoElement>(null),
  }

  const stRef = useRef<gsap.plugins.ScrollTriggerInstance | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Entrance Animation Sequence
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsEntering(false)
    });

    // 1. Initial State
    const LOGO_H = window.innerWidth < 768 ? 80 : 150;
    const GAP = 20; // Gap between Y and HAENU
    const Y_W = LOGO_H * (277 / 152);
    const HAENU_W = LOGO_H * (537 / 81);

    // Total combined width including gap
    const TOTAL_W = Y_W + GAP + HAENU_W;

    // Y starts centered (x=0). We want its center at: -(TOTAL_W/2) + (Y_W/2)
    const Y_FINAL_X = -(TOTAL_W / 2) + (Y_W / 2);

    // logoCut starts with LEFT edge at center (left: 50%).
    // We want its LEFT edge at: -(TOTAL_W/2) + Y_W + GAP
    const HAENU_FINAL_X = -(TOTAL_W / 2) + Y_W + GAP;

    gsap.set(descriptionRef.current, { opacity: 0, y: 84 });
    gsap.set(logoCutRef.current, { opacity: 0, x: HAENU_FINAL_X + 40 });
    gsap.set(yLogoRef.current, { scale: 15, x: 0 });

    // 2. Scale down smoothly
    tl.to(yLogoRef.current, {
      scale: 1,
      duration: 1.8,
      ease: "power4.inOut",
      delay: 0.5
    })
      // 3. Move to the left (Distinct step before docking)
      .to(yLogoRef.current, {
        x: Y_FINAL_X - 60,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          window.dispatchEvent(new CustomEvent('hero-animation-complete'));
        }
      }, "+=0.1")
      // 4. "Move in" to the logo cut (Docking)
      .to(yLogoRef.current, {
        x: Y_FINAL_X,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(logoCutRef.current, {
        opacity: 1,
        x: HAENU_FINAL_X,
        duration: 0.8,
        ease: "power2.out"
      }, "<")
      // 5. Reveal description
      .to(descriptionRef.current, {
        opacity: 1,
        y: 64,
        duration: 1,
        ease: "power2.out"
      }, "-=0.2");

  }, { scope: containerRef });

  // Syncing logic for both time and spatial alignment (Clipped/Window Effect)
  useGSAP(() => {
    const syncTick = () => {
      if (!yLogoRef.current) return;

      // 1. Spatial Alignment (The "Clipped Version" Look)
      // We calculate the logo's exact center relative to the screen center
      const rect = yLogoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      const offsetX = centerX - screenCenterX;
      const offsetY = centerY - screenCenterY;
      const scale = gsap.getProperty(yLogoRef.current, "scale") as number;

      Object.values(logoRefs).forEach(ref => {
        if (ref.current) {
          gsap.set(ref.current, {
            x: -offsetX / scale,
            y: -offsetY / scale,
            scale: 1 / scale,
            xPercent: -50,
            yPercent: -50
          });
        }
      });

      // 2. Smooth Time Synchronization (Using playbackRate to avoid seeking stutters)
      (['import', 'manufacturing', 'transportation'] as const).forEach((cat) => {
        const logo = logoRefs[cat].current;
        const bg = bgRefs[cat].current;

        if (logo && bg && logo.readyState >= 2 && bg.readyState >= 2) {
          const diff = logo.currentTime - bg.currentTime;

          if (Math.abs(diff) > 0.5) {
            // Large drift: Hard seek
            bg.currentTime = logo.currentTime;
            bg.playbackRate = 1;
          } else if (Math.abs(diff) > 0.02) {
            // Micro-adjustment: nudge playback rate to catch up or slow down
            bg.playbackRate = diff > 0 ? 1.05 : 0.95;
          } else {
            // Perfectly synced
            bg.playbackRate = 1;
          }
        }
      });
    };

    gsap.ticker.add(syncTick);
    return () => gsap.ticker.remove(syncTick);
  }, [hovered, isEntering]);

  // Disable scroll during entrance animation
  useGSAP(() => {
    if (isEntering) {
      document.body.style.overflow = 'hidden';
      // Also ensure we are at the top
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEntering]);

  // Scroll-Driven Animation Sequence
  useGSAP(() => {
    if (isEntering) return;

    const timeout = setTimeout(() => {
      const navLogo = document.querySelector('.navbar-y-logo') as HTMLElement;
      const navLeft = document.querySelector('.nav-left') as HTMLElement;
      const navRight = document.querySelector('.nav-right') as HTMLElement;

      if (!navLogo || !yLogoRef.current) return;

      const navRect = navLogo.getBoundingClientRect();
      const heroRect = yLogoRef.current.getBoundingClientRect();
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2;
      const navCenterX = navRect.left + navRect.width / 2;
      const navCenterY = navRect.top + navRect.height / 2;
      const xDiff = navCenterX - heroCenterX;
      const yDiff = navCenterY - heroCenterY;
      const currentX = gsap.getProperty(yLogoRef.current, "x") as number;
      const currentY = gsap.getProperty(yLogoRef.current, "y") as number;
      const targetScale = navRect.width / heroRect.width;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        }
      });
      tlRef.current = tl;
      stRef.current = tl.scrollTrigger;

      gsap.set([navLeft, navRight], { transformOrigin: "center" });

      tl.to(logoCutRef.current, { opacity: 0, duration: 0.15, ease: 'power2.inOut' }, 0)
        .to('.logo-yellow-bg', { y: '0%', duration: 0.3, ease: 'power2.inOut', stagger: 0.05 }, 0)
        .set(navLeft, { position: 'absolute', left: '2rem', top: '50%', yPercent: -50, immediateRender: false }, 0.1)
        .set(navRight, { position: 'absolute', right: '2rem', top: '50%', yPercent: -50, immediateRender: false }, 0.1)
        .to([navLeft, navRight], { y: -150, opacity: 0, duration: 0.3, ease: 'power2.inOut', immediateRender: false }, 0.1)
        .to('.navbar-container', { maxWidth: 750, duration: 0.3, ease: 'power2.inOut', immediateRender: false }, 0.1)
        .to(yLogoRef.current, { x: currentX + xDiff + 12.25, y: currentY + yDiff - 6.35, scale: targetScale, duration: 0.8, ease: 'power2.inOut' }, 0.2)
        .to('.nav-link-0, .nav-link-1', { x: -60, duration: 0.5, ease: 'power2.inOut' }, 0.3)
        .to('.nav-link-2, .nav-link-3', { x: 60, duration: 0.5, ease: 'power2.inOut' }, 0.3)
        .to(yLogoRef.current, { opacity: 0, duration: 0.1, immediateRender: false }, 0.9)
        .to(navLogo, { opacity: 1, duration: 0.1, immediateRender: false }, 0.9);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (stRef.current) stRef.current.kill();
      if (tlRef.current) tlRef.current.kill();
      // Force clean up of direct DOM modifications
      const nl = document.querySelector('.nav-left');
      const nr = document.querySelector('.nav-right');
      if (nl) gsap.set(nl, { clearProps: "x,y,opacity,transform,position,left,right,top,bottom,yPercent" });
      if (nr) gsap.set(nr, { clearProps: "x,y,opacity,transform,position,left,right,top,bottom,yPercent" });
      gsap.set('.navbar-container', { clearProps: "maxWidth,clipPath" });
      gsap.set('.nav-link-0, .nav-link-1, .nav-link-2, .nav-link-3', { clearProps: "x,y,opacity,transform" });
    };
  }, [isEntering]);

  // Opacity transitions using GSAP
  useGSAP(() => {
    const categories: HoveredState[] = ['import', 'manufacturing', 'transportation'];

    categories.forEach(cat => {
      const isHovered = hovered === cat;
      const bg = bgRefs[cat!].current;
      const maskLayer = containerRef.current?.querySelector(`[data-category="${cat}"]`);

      if (bg) {
        gsap.to(bg, {
          opacity: isHovered ? 1 : 0,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      }

      if (maskLayer) {
        gsap.to(maskLayer, {
          opacity: (hovered && !isHovered) ? 0 : 1,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      }
    });
  }, [hovered]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-[100svh] bg-[#0E5F13] m-0 p-0 antialiased">

      {/* BACKGROUND VIDEOS */}
      {(['import', 'manufacturing', 'transportation'] as const).map((cat) => (
        <video
          key={`bg-${cat}`}
          ref={bgRefs[cat]}
          src={cat === 'import' ? importVideo : cat === 'manufacturing' ? manufacturingVideo : transportationVideo}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-0"
          style={{ zIndex: 1, transform: 'translate3d(0,0,0)', filter: 'brightness(0.7)' }}
        />
      ))}

      {/* GRID BACKGROUND */}
      <GridBackground color="#ECBD27" gridSize={60} opacity={0.08} isVisible={!hovered} />



      {/* ENTRANCE BRANDING GROUP */}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-[1000] pointer-events-none">

        <div ref={logoWrapperRef} className="flex items-center justify-center relative w-full h-[30svh]">
          {/* THE Y LOGO CONTAINER (Controlled by GSAP) */}
          <div
            ref={yLogoRef}
            className="relative z-[1000]"
            style={{
              width: `${(window.innerWidth < 768 ? 80 : 150) * (277 / 152)}px`,
              height: `${window.innerWidth < 768 ? 80 : 150}px`
            }}
          >
            {/* MASKED LOGO WINDOWS (The "Y") */}
            {[
              { id: 'import', path: pathImport },
              { id: 'manufacturing', path: pathManufacturing },
              { id: 'transportation', path: pathTransportation }
            ].map((item) => (
              <div
                key={`mask-${item.id}`}
                data-category={item.id}
                className="absolute inset-0 w-full h-full"
                style={{
                  maskImage: getMaskUrl(item.path),
                  WebkitMaskImage: getMaskUrl(item.path),
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  zIndex: 10,
                  transform: 'translate3d(0,0,0)'
                }}
              >
                <video
                  ref={logoRefs[item.id as keyof typeof logoRefs]}
                  src={item.id === 'import' ? importVideo : item.id === 'manufacturing' ? manufacturingVideo : transportationVideo}
                  autoPlay loop muted playsInline
                  className="absolute top-1/2 left-1/2 w-screen h-screen object-cover"
                  style={{
                    maxWidth: 'none',
                    maxHeight: 'none',
                    filter: 'brightness(0.7)'
                  }}
                />
                <div className="logo-yellow-bg absolute inset-0 bg-[#ECBD27] translate-y-full z-10" />
              </div>
            ))}

            {/* INTERACTIVE OVERLAY FOR Y */}
            {!isEntering && (
              <div className="absolute inset-0 z-30 pointer-events-auto">
                <svg
                  viewBox="0 0 277 152"
                  className="w-full h-full"
                >
                  {[
                    { id: 'import', path: pathImport },
                    { id: 'manufacturing', path: pathManufacturing },
                    { id: 'transportation', path: pathTransportation }
                  ].map((item) => (
                    <path
                      key={`hit-${item.id}`}
                      d={item.path}
                      onMouseEnter={() => setHovered(item.id as HoveredState)}
                      onMouseLeave={() => setHovered(null)}
                      className="cursor-pointer"
                      style={{
                        fill: 'transparent',
                        stroke: hovered ? '#ECBD27' : 'transparent',
                        strokeWidth: 2,
                        opacity: hovered === item.id ? 1 : 0.6,
                        pointerEvents: 'all',
                        transition: 'stroke 0.4s ease, opacity 0.4s ease'
                      }}
                    />
                  ))}
                </svg>
              </div>
            )}
          </div>

          {/* THE "HAENU" PART */}
          <div
            ref={logoCutRef}
            className="absolute left-1/2 top-1/2 -translate-y-1/2"
            style={{
              width: `${(window.innerWidth < 768 ? 80 : 150) * (537 / 81)}px`,
              height: `${window.innerWidth < 768 ? 80 : 150}px`
            }}
          >
            <img
              src={logoCut}
              alt="HAENU"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* DESCRIPTION TEXT */}
        <div
          ref={descriptionRef}
          className="mt-12 max-w-3xl px-6 text-center"
        >
          <p className="text-[#ECBD27] text-xl md:text-2xl font-light tracking-wide leading-relaxed opacity-90">
            A family-owned company bridging Ethiopia's potential to the global stage — through trade, manufacturing, and hospitality.
          </p>

        </div>
      </div>
    </div>
  )
}
