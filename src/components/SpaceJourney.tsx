import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

const StarField = () => {
  const count = 12000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4000;
    }
    return positions;
  }, []);

  const starFieldRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (starFieldRef.current) {
      starFieldRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
      starFieldRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <Points ref={starFieldRef}>
      <PointMaterial
        transparent
        size={2}
        sizeAttenuation={true}
        color="#ffffff"
        opacity={0.6}
        vertexColors
      />
      <primitive object={new THREE.BufferAttribute(positions, 3)} attach="geometry.attributes.position" />
    </Points>
  );
};

const EnergyRings = () => {
  const ringsRef = useRef<THREE.Group>(null);
  const ringCount = 8;
  const colors = [
    '#0040ff', // Professional Blue
    '#800000', // Burgundy
    '#ff0000', // Red
    '#008000', // Professional Green
  ];

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = state.clock.getElapsedTime() * (0.1 + i * 0.05);
        ring.scale.x = ring.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 1.5 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, i * 15 - 60]}>
          <torusGeometry args={[120 - i * 12, 1.5, 32, 200]} />
          <meshStandardMaterial
            color={colors[i % colors.length]}
            emissive={colors[i % colors.length]}
            emissiveIntensity={1.5}
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const EnergyCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const { clock } = useThree();

  useFrame(() => {
    if (coreRef.current) {
      coreRef.current.rotation.z = clock.getElapsedTime() * 1.5;
      coreRef.current.scale.x = coreRef.current.scale.y = 
        1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
    }
  });

  return (
    <mesh ref={coreRef} position={[0, 0, -60]}>
      <sphereGeometry args={[25, 64, 64]} />
      <meshStandardMaterial
        color="#0040ff"
        emissive="#0040ff"
        emissiveIntensity={2}
        toneMapped={false}
        wireframe
      />
    </mesh>
  );
};

export const SpaceJourney: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const { cameraPosition, cameraRotation } = useSpring({
    from: {
      cameraPosition: [0, 0, 500],
      cameraRotation: [0, 0, 0],
    },
    to: async (next) => {
      while (true) {
        await next({
          cameraPosition: [300, 100, 200],
          cameraRotation: [0.2, 0.5, 0.1],
          config: { ...config.molasses, duration: 8000 }
        });
        await next({
          cameraPosition: [-300, -100, 300],
          cameraRotation: [-0.2, -0.5, -0.1],
          config: { ...config.molasses, duration: 8000 }
        });
      }
    },
    config: {
      mass: 5,
      tension: 170,
      friction: 26
    }
  });

  useEffect(() => {
    camera.fov = 45;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }

    state.camera.position.set(
      cameraPosition.get()[0],
      cameraPosition.get()[1],
      cameraPosition.get()[2]
    );

    state.camera.rotation.set(
      cameraRotation.get()[0],
      cameraRotation.get()[1],
      cameraRotation.get()[2]
    );
  });

  return (
    <animated.group ref={groupRef}>
      <StarField />
      <EnergyRings />
      <EnergyCore />

      <ambientLight intensity={0.2} />
      <pointLight position={[100, 100, 100]} intensity={2} color="#0040ff" />
      <pointLight position={[-100, -100, -100]} intensity={2} color="#800000" />

      {Array.from({ length: 12 }).map((_, i) => {
        const colors = ['#0040ff', '#800000', '#ff0000', '#008000'];
        return (
          <pointLight
            key={i}
            position={[
              Math.cos(i * Math.PI / 6) * 250,
              Math.sin(i * Math.PI / 6) * 250,
              0
            ]}
            intensity={2}
            distance={400}
            color={colors[i % colors.length]}
          />
        );
      })}

      <EffectComposer>
        <Bloom
          intensity={1}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          height={300}
        />
        <ChromaticAberration offset={[0.002, 0.002]} />
      </EffectComposer>
    </animated.group>
  );
};