import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { Room } from './Room';
import HeroLights from './HeroLights';

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  // Detectar capacidad del dispositivo
  const isLowEnd = useMediaQuery({ query: '(max-width: 768px)' }) || 
                   /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2)} // Limitar pixel ratio
      performance={{ min: 0.5 }} // Ajuste automático de performance
      gl={{
        antialias: !isLowEnd, // Sin antialiasing en dispositivos lentos
        alpha: false, // Mejor performance sin transparencia
        powerPreference: "high-performance"
      }}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableDamping={!isLowEnd} // Sin damping en dispositivos lentos
        dampingFactor={0.05}
      />
      
      <HeroLights isLowEnd={isLowEnd} />
      
      <Suspense fallback={null}>
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room isLowEnd={isLowEnd} />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
