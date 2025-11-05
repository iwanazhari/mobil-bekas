import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Heart, GitCompare, Star, MapPin, Calendar, Gauge, Fuel, Settings, ChevronLeft, ChevronRight, Share2, Phone } from 'lucide-react';
import { formatPrice, formatMileage } from '../utils/formatPrice';

const CarModal = ({ car, onClose, onFavorite, onCompare, isFavorite, isInCompare }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Modal entrance with subtle 3D
    if (overlayRef.current && modalRef.current) {
      gsap.set(modalRef.current, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
      const tl = gsap.timeline();

      // Overlay fade in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      );

      // Modal 3D entrance animation
      tl.fromTo(
        modalRef.current,
        {
          scale: 0.9,
          opacity: 0,
          y: 30,
          rotationX: 15,
          rotationY: -5,
          z: -100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          duration: 0.5,
          ease: 'back.out(1.2)',
        },
        '-=0.1'
      );

      // Image 3D entrance
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 1.1,
            rotationY: -10,
            z: -50,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      // Content 3D fade in
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current.children,
          {
            y: 15,
            opacity: 0,
            rotationX: 5,
            z: -30,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            z: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }
    }

    return () => {
      // Cleanup
    };
  }, []);

  const handleClose = () => {
    if (overlayRef.current && modalRef.current) {
      const tl = gsap.timeline({
        onComplete: onClose,
      });

      // 3D exit animation
      tl.to(modalRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 30,
        rotationX: 15,
        rotationY: 5,
        z: -100,
        duration: 0.3,
        ease: 'power2.in',
      });

      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        '-=0.2'
      );
    } else {
      onClose();
    }
  };

  const nextImage = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
          );
        },
      });
    }
  };

  const prevImage = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
          );
        },
      });
    }
  };

  const handleImageChange = (index) => {
    if (imageRef.current && index !== currentImageIndex) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentImageIndex(index);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
          );
        },
      });
    }
  };

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Header */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            ref={imageRef}
            key={currentImageIndex}
            src={car.images[currentImageIndex]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* Navigation Buttons */}
          {car.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {car.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={handleClose}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <button
              onClick={() => onFavorite(car.id)}
              className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onCompare(car.id)}
              className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                isInCompare
                  ? 'bg-accent text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <GitCompare className="w-5 h-5" />
            </button>
            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="p-3 rounded-full backdrop-blur-sm bg-white/80 text-gray-700 hover:bg-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="p-6 md:p-8" style={{ transformStyle: 'preserve-3d' }}>
          {/* Title & Price */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model} {car.year}
              </h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold">{car.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{car.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-4xl font-bold text-primary">
                {formatPrice(car.price)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Harga Final</div>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Calendar className="w-6 h-6 text-primary mb-2" />
              <div className="text-sm text-gray-600">Tahun</div>
              <div className="text-lg font-semibold">{car.year}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Gauge className="w-6 h-6 text-primary mb-2" />
              <div className="text-sm text-gray-600">Jarak Tempuh</div>
              <div className="text-lg font-semibold">{formatMileage(car.mileage)} km</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Fuel className="w-6 h-6 text-primary mb-2" />
              <div className="text-sm text-gray-600">Jenis BBM</div>
              <div className="text-lg font-semibold">{car.fuelType}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Settings className="w-6 h-6 text-primary mb-2" />
              <div className="text-sm text-gray-600">Transmisi</div>
              <div className="text-lg font-semibold">{car.transmission}</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Deskripsi</h3>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          {/* Condition */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Kondisi</h3>
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
              {car.condition}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Hubungi Penjual</span>
            </button>
            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="flex-1 bg-accent text-white py-4 rounded-lg font-semibold text-lg hover:bg-accent-dark transition-colors"
            >
              Dapatkan Penawaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
