import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Heart, GitCompare } from 'lucide-react';
import { gsap } from 'gsap';

const Header = ({ onSearch, favoriteCount, onCompareClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    // Smooth header entrance with subtle 3D
    if (headerRef.current) {
      gsap.set(headerRef.current, { transformPerspective: 1000 });
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0, rotationX: -5 },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Logo animation with subtle 3D
    if (logoRef.current) {
      gsap.set(logoRef.current, { transformPerspective: 1000 });
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0, rotationY: -20 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 0.5, delay: 0.1, ease: 'back.out(1.2)' }
      );
    }

    // Navigation items animation
    if (navRef.current) {
      const navItems = Array.from(navRef.current.children);
      gsap.fromTo(
        navItems,
        { y: -10, opacity: 0, rotationY: -10 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    }

    // Search bar animation
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, delay: 0.3, ease: 'power2.out' }
      );
    }

    // Handle scroll with smooth transition
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (headerRef.current) {
        if (window.scrollY > 50) {
          gsap.to(headerRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            duration: 0.3,
            ease: 'power2.out',
          });
        } else {
          gsap.to(headerRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            paddingTop: '0',
            paddingBottom: '0',
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Mobile menu animation with subtle 3D
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.set(mobileMenuRef.current, { transformPerspective: 1000 });
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0, rotationX: -10 },
          {
            height: 'auto',
            opacity: 1,
            rotationX: 0,
            duration: 0.4,
            ease: 'power2.out',
          }
        );
        const menuItems = Array.from(mobileMenuRef.current.children);
        gsap.fromTo(
          menuItems,
          { y: -15, opacity: 0, rotationY: -10 },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.1,
            ease: 'power2.out',
          }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          rotationX: -10,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Update active nav based on scroll
  useEffect(() => {
    const handleScrollNav = () => {
      const sections = ['home', 'catalog', 'features', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveNav(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollNav);
    return () => window.removeEventListener('scroll', handleScrollNav);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.08,
        rotationY: 5,
        z: 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleLogoLeave = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleNavHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -2,
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleNavLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleNavClick = (section) => {
    setActiveNav(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div
            ref={logoRef}
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0 -ml-2 sm:-ml-2 lg:ml-0"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => handleNavClick('home')}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-primary to-primary-dark rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg sm:text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-primary leading-tight">MobilBekas</span>
              <span className="text-xs text-gray-500 leading-tight hidden sm:block">Marketplace</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center space-x-1 flex-1 justify-center ml-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {[
              { id: 'home', label: 'Beranda' },
              { id: 'catalog', label: 'Katalog' },
              { id: 'features', label: 'Fitur' },
              { id: 'testimonials', label: 'Testimoni' },
              { id: 'contact', label: 'Kontak' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                onMouseEnter={handleNavHover}
                onMouseLeave={handleNavLeave}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeNav === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {item.label}
                {activeNav === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <form
            ref={searchRef}
            onSubmit={handleSearch}
            className="hidden lg:flex items-center flex-1 max-w-md ml-8 mr-4"
          >
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Cari mobil..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={onCompareClick}
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              <GitCompare className="w-4 h-4" />
              <span>Bandingkan</span>
            </button>
            <button className="relative p-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 group">
              <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-200" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {favoriteCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-gray-200 overflow-hidden bg-white/98 backdrop-blur-md"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {[
              { id: 'home', label: 'Beranda' },
              { id: 'catalog', label: 'Katalog' },
              { id: 'features', label: 'Fitur' },
              { id: 'testimonials', label: 'Testimoni' },
              { id: 'contact', label: 'Kontak' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeNav === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {item.label}
              </a>
            ))}
            <form onSubmit={handleSearch} className="pt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari mobil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 focus:bg-white transition-all duration-200"
                />
              </div>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
