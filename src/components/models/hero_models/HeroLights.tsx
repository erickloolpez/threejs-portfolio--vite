import React from 'react';

const HeroLights = ({ isLowEnd }) => {
  return (
    <>
      {/* Luz ambiental - siempre presente */}
      <ambientLight 
        intensity={isLowEnd ? 0.8 : 0.6} 
        color="#ffffff" 
      />
      
      {/* Luz direccional principal */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={isLowEnd ? 0.8 : 1}
        color="#ffffff"
        castShadow={!isLowEnd} // Sin sombras en dispositivos lentos
        shadow-mapSize-width={isLowEnd ? 512 : 1024}
        shadow-mapSize-height={isLowEnd ? 512 : 1024}
      />
      
      {/* Luz de relleno - solo en dispositivos potentes */}
      {!isLowEnd && (
        <pointLight
          position={[-5, 5, 5]}
          intensity={0.3}
          color="#ffeaa7"
        />
      )}
      
      {/* Luz adicional suave - solo en dispositivos potentes */}
      {!isLowEnd && (
        <hemisphereLight
          skyColor="#74b9ff"
          groundColor="#fdcb6e"
          intensity={0.2}
        />
      )}
    </>
  );
};

export default HeroLights;
