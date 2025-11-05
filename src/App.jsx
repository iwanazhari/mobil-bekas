import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CarCatalog from './components/CarCatalog';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CompareModal from './components/CompareModal';
import DynamicFavicon from './components/DynamicFavicon';
import { cars, testimonials, features } from './data/mockData';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFavorite = (carId) => {
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleCompare = (carId) => {
    setCompareList((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= 3) {
        alert('Maksimal 3 mobil dapat dibandingkan');
        return prev;
      }
      return [...prev, carId];
    });
  };

  const handleRemoveFromCompare = (carId) => {
    setCompareList((prev) => prev.filter((id) => id !== carId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Scroll to catalog
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter cars based on search query
  const filteredCars = searchQuery
    ? cars.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${car.brand} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cars;

  return (
    <div className="min-h-screen">
      <DynamicFavicon animationPath="/car-lottie.json" size={32} />
      <Header
        onSearch={handleSearch}
        favoriteCount={favorites.length}
        onCompareClick={() => setIsCompareOpen(true)}
      />
      <Hero onGetStarted={handleGetStarted} />
      <CarCatalog
        cars={filteredCars}
        onFavorite={handleFavorite}
        favorites={favorites}
        onCompare={handleCompare}
        compareList={compareList}
      />
      <Features features={features} />
      <Testimonials testimonials={testimonials} />
      <ContactForm />
      <Footer />

      {/* Compare Modal */}
      {isCompareOpen && (
        <CompareModal
          cars={compareList}
          allCars={cars}
          onClose={() => setIsCompareOpen(false)}
          onRemove={handleRemoveFromCompare}
          onClear={handleClearCompare}
        />
      )}
    </div>
  );
}

export default App;

