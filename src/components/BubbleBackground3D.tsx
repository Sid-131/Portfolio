import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

interface SphereProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}

function GlassSphere({ position, scale, speed, color }: SphereProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.05 * speed;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.08 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          roughness={0.0}
          transmission={1}
          ior={1.45}
          chromaticAberration={0.04}
          color={color}
          envMapIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

const spheres: SphereProps[] = [
  { position: [-4.5, 3.0,  -2], scale: 1.8, speed: 0.6, color: '#B8DCF0' },
  { position: [ 3.2, 2.5,  -3], scale: 1.2, speed: 0.9, color: '#C8E6F5' },
  { position: [-2.0,-2.5,  -1], scale: 1.0, speed: 0.7, color: '#B8DCF0' },
  { position: [ 4.5,-1.5,  -4], scale: 1.5, speed: 0.5, color: '#D4EBD8' },
  { position: [ 0.5, 3.8,  -5], scale: 0.8, speed: 1.1, color: '#B8DCF0' },
  { position: [-5.0,-0.5,  -3], scale: 0.9, speed: 0.8, color: '#C8E6F5' },
  { position: [ 2.0,-3.5,  -2], scale: 0.7, speed: 1.0, color: '#D4EBD8' },
];

export default function BubbleBackground3D() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* CSS gradient base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #B8DCF0 0%, #cce8d8 55%, #a8d4b8 100%)',
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color="#B8DCF0" />

        {spheres.map((s, i) => (
          <GlassSphere key={i} {...s} />
        ))}
      </Canvas>
    </div>
  );
}
