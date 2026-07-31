import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import gundemVideo from '@/assets/videos/gundem-showcase.mp4';

/** Desktop-only — imported lazily so mobile never downloads the mp4. */
export function PlatformVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoInView = useInView(videoRef, { amount: 0.35 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (videoInView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [videoInView]);

  return (
    <div className="relative flex justify-center">
      <div
        className="absolute -inset-16 -z-10 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, transparent 65%)' }}
        aria-hidden
      />
      <div className="light-sweep light-sweep-soft rounded-[1.5rem] sm:rounded-[2rem]">
        <video
          ref={videoRef}
          src={gundemVideo}
          loop
          muted
          playsInline
          preload="metadata"
          className="block w-auto rounded-[1.5rem] shadow-[0_30px_60px_-28px_rgba(15,23,42,0.35)] sm:rounded-[2rem]"
          style={{
            height: 'clamp(340px, 62vw, 560px)',
            maxWidth: '100%',
            background: '#0B1220',
          }}
        />
      </div>
    </div>
  );
}
