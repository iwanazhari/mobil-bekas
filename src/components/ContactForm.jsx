import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate left side
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate right side
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === titleRef.current ||
          trigger.vars.trigger === leftRef.current ||
          trigger.vars.trigger === rightRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Animate form submission
    if (rightRef.current) {
      const form = rightRef.current.querySelector('form');
      if (form) {
        gsap.to(form, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          onComplete: () => {
            setIsSubmitted(true);
            gsap.fromTo(
              rightRef.current.querySelector('.success-message'),
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
            );
          },
        });
      }
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      if (rightRef.current) {
        const form = rightRef.current.querySelector('form');
        if (form) {
          gsap.fromTo(
            form,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4 }
          );
        }
      }
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -2,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <p className="text-xl text-gray-600">
            Ada pertanyaan? Tim kami siap membantu Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div ref={leftRef} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
              <p className="text-gray-600 mb-8">
                Kami siap membantu Anda menemukan mobil bekas impian. Hubungi kami melalui
                berbagai cara di bawah ini.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Telepon</h4>
                  <p className="text-gray-600">+62 812-3456-7890</p>
                  <p className="text-gray-600">+62 821-9876-5432</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">info@mobilbekas.com</p>
                  <p className="text-gray-600">support@mobilbekas.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Alamat</h4>
                  <p className="text-gray-600">
                    Jl. Sudirman No. 123<br />
                    Jakarta Pusat, DKI Jakarta 10220
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={rightRef}>
            {isSubmitted ? (
              <div className="success-message bg-gray-50 p-8 rounded-xl shadow-md text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Terima Kasih!</h3>
                <p className="text-gray-600">
                  Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-md">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
