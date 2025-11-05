import { useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';

const LottieIcon = ({ animationData, className = '', width = 40, height = 40, autoplay = true, loop = true }) => {
  const containerRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Animate on mount
      gsap.fromTo(
        containerRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  if (!animationData) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieIcon;
