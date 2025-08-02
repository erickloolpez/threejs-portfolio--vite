import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function Room({ isLowEnd, ...props }) {
  const { nodes, materials } = useGLTF('/models/optimized-room.glb');
  
  // Optimizar materiales para dispositivos lentos
  const optimizedMaterials = useMemo(() => {
    const optimized = {};
    
    Object.keys(materials).forEach(key => {
      const originalMaterial = materials[key];
      
      if (isLowEnd) {
        // Usar MeshBasicMaterial para mejor performance
        optimized[key] = new THREE.MeshBasicMaterial({
          color: originalMaterial.color || 0xffffff,
          map: originalMaterial.map,
          transparent: originalMaterial.transparent,
          opacity: originalMaterial.opacity,
        });
      } else {
        // Usar MeshLambertMaterial como compromiso
        optimized[key] = new THREE.MeshLambertMaterial({
          color: originalMaterial.color || 0xffffff,
          map: originalMaterial.map,
          transparent: originalMaterial.transparent,
          opacity: originalMaterial.opacity,
        });
      }
    });
    
    return optimized;
  }, [materials, isLowEnd]);

  // Agrupar meshes por material para reducir draw calls
  const groupedMeshes = useMemo(() => {
    const groups = {
      blinn1: [],
      lambert1: [],
      phong1: []
    };

    // Agrupar todos los nodes por material
    Object.keys(nodes).forEach(nodeKey => {
      const node = nodes[nodeKey];
      if (node.geometry) {
        if (nodeKey.includes('lambert1')) {
          groups.lambert1.push(node);
        } else if (nodeKey.includes('phong1')) {
          groups.phong1.push(node);
        } else {
          groups.blinn1.push(node);
        }
      }
    });

    return groups;
  }, [nodes]);

  return (
    <group {...props} dispose={null}>
      {/* Meshes con material blinn1 */}
      {groupedMeshes.blinn1.map((node, index) => (
        <mesh 
          key={`blinn1-${index}`}
          geometry={node.geometry} 
          material={optimizedMaterials.blinn1}
          frustumCulled={true} // Activar frustum culling
        />
      ))}
      
      {/* Meshes con material lambert1 */}
      {groupedMeshes.lambert1.map((node, index) => (
        <mesh 
          key={`lambert1-${index}`}
          geometry={node.geometry} 
          material={optimizedMaterials.lambert1}
          frustumCulled={true}
        />
      ))}
      
      {/* Meshes con material phong1 */}
      {groupedMeshes.phong1.map((node, index) => (
        <mesh 
          key={`phong1-${index}`}
          geometry={node.geometry} 
          material={optimizedMaterials.phong1}
          frustumCulled={true}
        />
      ))}
    </group>
  );
}

// Precargar con configuración optimizada
useGLTF.preload('/models/optimized-room.glb');
