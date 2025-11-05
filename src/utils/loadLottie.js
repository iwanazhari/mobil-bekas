// Utility function to load Lottie animation data
export const loadLottieAnimation = async (path) => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load Lottie animation: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading Lottie animation:', error);
    return null;
  }
};

