import { useEffect, useRef } from 'react';
import { Heart, Eye, GitCompare, MapPin, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { formatPrice, formatMileage } from '../utils/formatPrice';

const CarCard = ({ car, onView, onFavorite, onCompare, isFavorite, isInCompare }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Card entrance with subtle 3D
      gsap.set(cardRef.current, { transformPerspective: 1000 });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20, rotationY: -5 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: 'power2.out',
        }
      );

      // Subtle image hover effect
      if (imageRef.current) {
        const image = imageRef.current;
        const handleMouseEnter = () => {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        image.addEventListener('mouseenter', handleMouseEnter);
        image.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          image.removeEventListener('mouseenter', handleMouseEnter);
          image.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }
  }, []);

  const handleCardHover = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const centerX = rect.width / 2;
      const rotateY = (centerX - x) / 30; // Subtle rotation

      gsap.to(cardRef.current, {
        y: -5,
        rotationY: rotateY,
        z: 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleCardLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        rotationY: 0,
        z: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
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

  const handleButtonClick = (e) => {
    gsap.to(e.currentTarget, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });
  };

  const handleFavoriteClick = () => {
    onFavorite(car.id);
    const heart = document.querySelector(`[data-car-id="${car.id}"] .heart-icon`);
    if (heart) {
      gsap.to(heart, {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }
  };

  const handleCompareClick = () => {
    onCompare(car.id);
    const compare = document.querySelector(`[data-car-id="${car.id}"] .compare-icon`);
    if (compare) {
      gsap.to(compare, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      data-car-id={car.id}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      onMouseMove={handleCardHover}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          ref={imageRef}
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 heart-icon ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleCompareClick}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isInCompare
                ? 'bg-accent text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <GitCompare className="w-4 h-4 compare-icon" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
            {car.stock}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-600 text-sm">{car.year}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{car.rating}</span>
          </div>
        </div>

        <div className="text-2xl font-bold text-primary mb-4">
          {formatPrice(car.price)}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Jarak:</span>
            <span>{formatMileage(car.mileage)} km</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">BBM:</span>
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Transmisi:</span>
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Kondisi:</span>
            <span>{car.condition}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{car.location}</span>
        </div>

        <button
          ref={buttonRef}
          onClick={() => {
            handleButtonClick({ currentTarget: buttonRef.current });
            onView(car);
          }}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>Lihat Detail</span>
        </button>
      </div>
    </div>
  );
};

export default CarCard;
