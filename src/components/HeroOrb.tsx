import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

function Orb() {
  const meshRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.x = t * 0.07;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        thickness={0.5}
        roughness={0}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.06}
        color="#B8DCF0"
        envMapIntensity={1}
      />
    </mesh>
  );
}

export default function HeroOrb() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '12%',
        right: '8%',
        width: 180,
        height: 180,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 3]} intensity={1.5} />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#B8DCF0" />
        <Orb />
      </Canvas>
    </div>
  );
}
