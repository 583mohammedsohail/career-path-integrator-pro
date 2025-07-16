declare module 'particles.js' {
  interface ParticlesConfig {
    selector: string;
    config: object;
    color?: string;
    maxParticles?: number;
    connectParticles?: boolean;
  }

  interface ParticlesJS {
    init(config: ParticlesConfig): void;
  }

  const particlesJS: ParticlesJS;
  export default particlesJS;
}

declare global {
  interface Window {
    pJSDom: Array<{
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
