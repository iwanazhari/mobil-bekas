import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Trash2 } from 'lucide-react';
import { formatPrice, formatMileage } from '../utils/formatPrice';

const CompareModal = ({ cars, allCars, onClose, onRemove, onClear }) => {
  const compareCars = cars.map((id) => allCars.find((car) => car.id === id)).filter(Boolean);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current && modalRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      tl.fromTo(
        modalRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
          rotationX: 15,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      );

      if (tableRef.current && compareCars.length > 0) {
        tl.fromTo(
          tableRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
          },
          '-=0.3'
        );
      }
    }

    return () => {
      // Cleanup
    };
  }, [compareCars.length]);

  const handleClose = () => {
    if (overlayRef.current && modalRef.current) {
      const tl = gsap.timeline({
        onComplete: onClose,
      });

      tl.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        rotationX: 15,
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

  if (compareCars.length === 0) {
    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-4xl w-full p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bandingkan Mobil</h3>
          <p className="text-gray-600 mb-6">
            Pilih minimal 2 mobil untuk dibandingkan
          </p>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  const specs = [
    { key: 'price', label: 'Harga', format: (value) => formatPrice(value) },
    { key: 'year', label: 'Tahun', format: (value) => value },
    { key: 'mileage', label: 'Jarak Tempuh', format: (value) => `${formatMileage(value)} km` },
    { key: 'fuelType', label: 'Jenis BBM', format: (value) => value },
    { key: 'transmission', label: 'Transmisi', format: (value) => value },
    { key: 'condition', label: 'Kondisi', format: (value) => value },
    { key: 'rating', label: 'Rating', format: (value) => value },
    { key: 'location', label: 'Lokasi', format: (value) => value },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-7xl w-full my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h3 className="text-2xl font-bold text-gray-900">Bandingkan Mobil</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClear}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Semua</span>
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Compare Table */}
        <div ref={tableRef} className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-gray-200 font-semibold text-gray-900">
                  Spesifikasi
                </th>
                {compareCars.map((car) => (
                  <th key={car.id} className="text-center p-4 border-b border-gray-200 min-w-[250px]">
                    <div className="flex flex-col items-center">
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-32 h-24 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-bold text-gray-900 mb-1">
                        {car.brand} {car.model}
                      </h4>
                      <p className="text-sm text-gray-600">{car.year}</p>
                      <button
                        onClick={() => onRemove(car.id)}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, index) => (
                <tr key={spec.key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                    {spec.label}
                  </td>
                  {compareCars.map((car) => (
                    <td
                      key={car.id}
                      className="p-4 text-center border-b border-gray-200 text-gray-700"
                    >
                      {spec.format(car[spec.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
