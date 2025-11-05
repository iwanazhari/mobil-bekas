import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = ({ testimonials }) => {
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
    <section ref={sectionRef} id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Apa Kata Pelanggan</h2>
          <p className="text-xl text-gray-600">
            Testimoni dari pelanggan yang telah mempercayai kami
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'fill-accent text-accent'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.comment}</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.car}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
