import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';

const skills = [
  { label: 'Product Thinking', color: '#3D8B37' },
  { label: 'User Research',    color: '#6BAF7E' },
  { label: 'Technical Depth',  color: '#2B4035' },
  { label: 'Execution',        color: '#3D8B37' },
  { label: 'Visibility',       color: '#6BAF7E' },
  { label: 'Networking',       color: '#2B4035' },
];

const RADIUS = 2.2;

function CenterNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.32, 1]} />
      <meshStandardMaterial color="#2B4035" roughness={0.2} metalness={0.6} />
    </mesh>
  );
}

function OrbitLine() {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return (
    // @ts-expect-error r3f line element
    <line geometry={geo}>
      <lineBasicMaterial color="#6BAF7E" opacity={0.15} transparent />
    </line>
  );
}

function SkillNode({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const groupRef = useRef<Group>(null);
  const baseAngle = (index / skills.length) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * 0.35;
    const angle = baseAngle + t;
    groupRef.current.position.x = Math.cos(angle) * RADIUS;
    groupRef.current.position.z = Math.sin(angle) * RADIUS;
    groupRef.current.position.y = Math.sin(angle * 0.5 + index) * 0.25;
  });

  return (
    <group ref={groupRef}>
      {/* Dot */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={skill.color} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Label — Billboard always faces camera */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 0.22, 0]}
          fontSize={0.19}
          color="#2B4035"
          anchorX="center"
          anchorY="bottom"
          font="https://fonts.gstatic.com/s/dmsans/v14/rP2Hp2ywxg089UriCZa4ET-DNl0.woff2"
          outlineWidth={0.01}
          outlineColor="#ffffff"
        >
          {skill.label}
        </Text>
      </Billboard>
    </group>
  );
}

export default function NetworkGraph3D() {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <Canvas camera={{ position: [0, 2.5, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 4, 4]} intensity={1} />
        <pointLight position={[-4, -2, -2]} intensity={0.4} color="#B8DCF0" />

        <CenterNode />
        <OrbitLine />
        {skills.map((skill, i) => (
          <SkillNode key={skill.label} skill={skill} index={i} />
        ))}
      </Canvas>
    </div>
  );
}
