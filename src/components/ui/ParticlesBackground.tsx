import { useEffect, useState } from 'react';

declare global {
  interface Window {
    particlesJS?: any;
    pJSDom?: Array<{
      pJS: {
        fn: {
          vendors: {
            destroypJS: () => void;
          };
        };
      };
    }>;
  }
}

const ParticlesBackground = () => {
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('Checking for particlesJS...');
    
    const checkParticles = () => {
      if (window.particlesJS) {
        console.log('particlesJS found');
        setLoaded(true);
      } else {
        setTimeout(checkParticles, 100);
      }
    };

    checkParticles();

    return () => {
      if (window.pJSDom?.length) {
        try {
          window.pJSDom[0]?.pJS?.fn?.vendors?.destroypJS();
          window.pJSDom = [];
        } catch (err) {
          console.error('Cleanup error:', err);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    console.log('Initializing particles...');
    try {
      window.particlesJS('particles-background', {
        particles: {
          number: { value: 80 },
          color: { value: '#3b82f6' },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: 3 },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out'
          }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' }
          }
        }
      });
    } catch (err) {
      setError('Particles initialization failed');
      console.error('Initialization error:', err);
    }
  }, [loaded]);

  if (error) {
    return (
      <div className="bg-blue-50 fixed inset-0 z-[-1] flex items-center justify-center">
        <p className="text-blue-600">{error}</p>
      </div>
    );
  }

  return <div id="particles-background" className="fixed inset-0 z-[-1]" />;
};

export default ParticlesBackground;
