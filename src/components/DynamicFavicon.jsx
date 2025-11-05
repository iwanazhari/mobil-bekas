import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const DynamicFavicon = ({ animationPath, size = 32, updateInterval = 100 }) => {
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const faviconLinkRef = useRef(null);
  const updateIntervalRef = useRef(null);

  useEffect(() => {
    // Create or get favicon link element
    let faviconLink = document.querySelector("link[rel~='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.head.appendChild(faviconLink);
    }
    faviconLinkRef.current = faviconLink;

    // Create hidden container for Lottie
    const container = document.createElement('div');
    container.style.width = `${size * 2}px`;
    container.style.height = `${size * 2}px`;
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);
    containerRef.current = container;

    // Create canvas for rendering
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    canvasRef.current = canvas;

    // Load and setup Lottie animation
    const loadAnimation = async () => {
      try {
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.statusText}`);
        }
        const animationData = await response.json();

        // Load Lottie animation
        animationRef.current = lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData,
        });

        // Function to update favicon
        const updateFavicon = () => {
          if (!containerRef.current || !canvasRef.current || !ctx) return;

          const svg = containerRef.current.querySelector('svg');
          if (!svg) return;

          try {
            // Clone SVG to avoid modifying the original
            const svgClone = svg.cloneNode(true);
            svgClone.setAttribute('width', size);
            svgClone.setAttribute('height', size);
            
            const svgData = new XMLSerializer().serializeToString(svgClone);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);

            // Convert SVG to canvas
            const img = new Image();
            img.onload = () => {
              ctx.clearRect(0, 0, size, size);
              ctx.fillStyle = 'transparent';
              ctx.fillRect(0, 0, size, size);
              ctx.drawImage(img, 0, 0, size, size);
              
              // Convert canvas to data URL and update favicon
              canvasRef.current.toBlob((blob) => {
                if (blob && faviconLinkRef.current) {
                  const blobUrl = URL.createObjectURL(blob);
                  faviconLinkRef.current.href = blobUrl;
                  // Clean up old URL after a delay
                  setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                }
              }, 'image/png');
              
              URL.revokeObjectURL(svgUrl);
            };
            img.onerror = () => {
              URL.revokeObjectURL(svgUrl);
            };
            img.src = svgUrl;
          } catch (error) {
            console.error('Error updating favicon:', error);
          }
        };

        // Update favicon periodically
        updateIntervalRef.current = setInterval(updateFavicon, updateInterval);

        // Initial update
        setTimeout(updateFavicon, 200);
      } catch (error) {
        console.error('Error loading Lottie animation for favicon:', error);
      }
    };

    loadAnimation();

    // Cleanup
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      if (animationRef.current) {
        animationRef.current.destroy();
      }
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
      }
    };
  }, [animationPath, size, updateInterval]);

  return null;
};

export default DynamicFavicon;

