import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onGetStarted }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Subtle parallax background effect
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        y: 50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Title animation with subtle 3D
    if (titleRef.current) {
      gsap.set(titleRef.current, { transformPerspective: 1000 });
      gsap.fromTo(
        titleRef.current.children,
        {
          y: 30,
          opacity: 0,
          rotationX: -10,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    }

    // Buttons animation with subtle 3D
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, { transformPerspective: 1000 });
      gsap.fromTo(
        buttonsRef.current.children,
        { y: 20, opacity: 0, rotationY: -5 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.5,
          delay: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }

    // Stats animation with counter
    if (statsRef.current) {
      const stats = Array.from(statsRef.current.children);
      
      if (stats.length > 0) {
        gsap.fromTo(
          stats,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );

        // Counter animation for stats
        stats.forEach((stat, index) => {
          const numberElement = stat.querySelector('.stat-number');
          if (numberElement) {
            const finalValue = numberElement.textContent;
            const isPercentage = finalValue.includes('%');
            const isNumber = finalValue.includes('+');
            const numericValue = parseInt(finalValue.replace(/\D/g, '')) || 0;

            // Create an object for GSAP to animate
            const counter = { value: 0 };

            gsap.to(counter, {
              value: numericValue,
              duration: 1.5,
              delay: 0.8 + index * 0.1,
              ease: 'power2.out',
              onUpdate: function () {
                const val = Math.floor(counter.value);
                if (isPercentage) {
                  numberElement.textContent = `${val}%`;
                } else if (isNumber) {
                  numberElement.textContent = `${val.toLocaleString()}+`;
                } else {
                  numberElement.textContent = finalValue;
                }
              },
            });
          }
        });
      }
    }

    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 1 }
      );

      const indicator = scrollIndicatorRef.current.querySelector('.indicator-dot');
      if (indicator) {
        gsap.to(indicator, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }
    }
  }, []);

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      y: -2,
      rotationY: 2,
      z: 5,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      rotationY: 0,
      z: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleButtonClick = (e) => {
    gsap.to(e.currentTarget, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary pt-16 sm:pt-20"
    >
      {/* Background Pattern */}
      <div ref={backgroundRef} className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-0">
        <div className="text-center">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
            <span className="inline-block">Temukan Mobil Bekas</span>
            <br />
            <span className="inline-block text-accent">Impian Anda</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0"
          >
            Katalog lengkap mobil bekas berkualitas dengan harga transparan.
            Proses cepat, aman, dan terpercaya.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            <button
              onClick={(e) => {
                handleButtonClick(e);
                onGetStarted();
              }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="w-full sm:w-auto bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <span>Lihat Katalog</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleButtonClick}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
            >
              <span>Dapatkan Penawaran</span>
            </button>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4 sm:px-0"
          >
            {[
              { number: '1000+', label: 'Mobil Tersedia' },
              { number: '5000+', label: 'Pelanggan Puas' },
              { number: '98%', label: 'Tingkat Kepuasan' },
              { number: '24/7', label: 'Layanan' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1 sm:mb-2 stat-number">
                  {stat.number}
                </div>
                <div className="text-white/80 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="indicator-dot w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
