import { useState, useEffect, useRef } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

const CarFilter = ({ filters, onFilterChange, onReset, brands, sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const filterContentRef = useRef(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    // Animate filter content
    if (filterContentRef.current) {
      if (isOpen || isDesktop) {
        gsap.fromTo(
          filterContentRef.current,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          }
        );
        gsap.fromTo(
          filterContentRef.current.children,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.1,
            ease: 'power2.out',
          }
        );
      } else {
        gsap.to(filterContentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [isOpen, isDesktop]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-gray-900">Filter & Urutkan</h3>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-gray-600 hover:text-primary transition-colors"
        >
          Reset Filter
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4"
      >
        <span className="font-medium">Filter Options</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Filter Content */}
      {(isOpen || isDesktop) && (
        <div
          ref={filterContentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden"
        >
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urutkan Berdasarkan
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="year-desc">Tahun: Terbaru</option>
              <option value="year-asc">Tahun: Terlama</option>
              <option value="mileage-asc">Jarak: Terendah</option>
              <option value="mileage-desc">Jarak: Tertinggi</option>
              <option value="rating-desc">Rating: Tertinggi</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merek
            </label>
            <select
              value={filters.brand || ''}
              onChange={(e) => onFilterChange('brand', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Semua Merek</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis BBM
            </label>
            <select
              value={filters.fuelType || ''}
              onChange={(e) => onFilterChange('fuelType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Semua Jenis</option>
              <option value="Bensin">Bensin</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>

          {/* Transmission Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transmisi
            </label>
            <select
              value={filters.transmission || ''}
              onChange={(e) => onFilterChange('transmission', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Semua Transmisi</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tahun Minimal
            </label>
            <input
              type="number"
              min="2010"
              max="2024"
              value={filters.minYear || ''}
              onChange={(e) => onFilterChange('minYear', e.target.value)}
              placeholder="2010"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga Maksimal (Juta)
            </label>
            <input
              type="number"
              min="0"
              value={filters.maxPrice ? filters.maxPrice / 1000000 : ''}
              onChange={(e) =>
                onFilterChange('maxPrice', e.target.value ? e.target.value * 1000000 : '')
              }
              placeholder="500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Mileage Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jarak Maksimal (km)
            </label>
            <input
              type="number"
              min="0"
              value={filters.maxMileage || ''}
              onChange={(e) => onFilterChange('maxMileage', e.target.value)}
              placeholder="100000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarFilter;
