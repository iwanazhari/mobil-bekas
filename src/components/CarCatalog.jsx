import { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarCard from './CarCard';
import CarFilter from './CarFilter';
import CarModal from './CarModal';

gsap.registerPlugin(ScrollTrigger);

const CarCatalog = ({ cars, onFavorite, favorites, onCompare, compareList }) => {
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    transmission: '',
    minYear: '',
    maxPrice: '',
    maxMileage: '',
  });
  const [sortBy, setSortBy] = useState('price-asc');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Get unique brands
  const brands = useMemo(() => {
    return [...new Set(cars.map((car) => car.brand))].sort();
  }, [cars]);

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.minYear && car.year < parseInt(filters.minYear)) return false;
      if (filters.maxPrice && car.price > filters.maxPrice) return false;
      if (filters.maxMileage && car.mileage > parseInt(filters.maxMileage)) return false;
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'mileage-asc':
          return a.mileage - b.mileage;
        case 'mileage-desc':
          return b.mileage - a.mileage;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [cars, filters, sortBy]);

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
  }, []);

  useEffect(() => {
    // Animate cards with stagger
    if (cardsContainerRef.current && filteredAndSortedCars.length > 0) {
      const cards = Array.from(cardsContainerRef.current.children);
      
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: {
            amount: 0.5,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === cardsContainerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [filteredAndSortedCars]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || '',
    }));
  };

  const handleReset = () => {
    setFilters({
      brand: '',
      fuelType: '',
      transmission: '',
      minYear: '',
      maxPrice: '',
      maxMileage: '',
    });
    setSortBy('price-asc');
  };

  const handleViewCar = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <section ref={sectionRef} id="catalog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Katalog Mobil</h2>
          <p className="text-xl text-gray-600">
            Temukan mobil bekas impian Anda dari {filteredAndSortedCars.length} mobil tersedia
          </p>
        </div>

        <CarFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          brands={brands}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {filteredAndSortedCars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">Tidak ada mobil yang sesuai dengan filter Anda</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAndSortedCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onView={handleViewCar}
                onFavorite={onFavorite}
                onCompare={onCompare}
                isFavorite={favorites.includes(car.id)}
                isInCompare={compareList.includes(car.id)}
              />
            ))}
          </div>
        )}

        {/* Car Modal */}
        {isModalOpen && selectedCar && (
          <CarModal
            car={selectedCar}
            onClose={() => setIsModalOpen(false)}
            onFavorite={onFavorite}
            onCompare={onCompare}
            isFavorite={favorites.includes(selectedCar.id)}
            isInCompare={compareList.includes(selectedCar.id)}
          />
        )}
      </div>
    </section>
  );
};

export default CarCatalog;
