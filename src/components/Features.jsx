import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Search, DollarSign, Clock, Star, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  shield: Shield,
  search: Search,
  'dollar-sign': DollarSign,
  clock: Clock,
  star: Star,
  headphones: Headphones,
};

const Features = ({ features }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Simple title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Simple cards animation
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children);
      
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Subtle 3D hover effects
        gsap.set(cardsRef.current, { transformPerspective: 1000 });
        cards.forEach((card) => {
          const handleMouseEnter = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const centerX = rect.width / 2;
            const rotateY = (centerX - x) / 40; // Subtle rotation

            gsap.to(card, {
              y: -5,
              rotationY: rotateY,
              z: 8,
              duration: 0.3,
              ease: 'power2.out',
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          };

          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);
          card.addEventListener('mousemove', handleMouseEnter);

          return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mousemove', handleMouseEnter);
          };
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === titleRef.current ||
          trigger.vars.trigger === cardsRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Pilih Kami</h2>
          <p className="text-xl text-gray-600">
            Layanan terbaik untuk pengalaman beli mobil bekas yang menyenangkan
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] || Shield;
            return (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
