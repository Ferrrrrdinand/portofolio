"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Sculpture() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.13;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.12, 0.035);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.1, 0.035);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={group} scale={1.12}>
        <mesh rotation={[0.35, 0.1, 0.2]}>
          <torusKnotGeometry args={[1.05, 0.29, 220, 32, 2, 3]} />
          <meshPhysicalMaterial color="#e9e9e9" metalness={0.92} roughness={0.16} clearcoat={1} clearcoatRoughness={0.08} />
        </mesh>
        <mesh rotation={[1.1, 0.6, 0.2]} scale={0.76}>
          <torusGeometry args={[1.22, 0.045, 16, 140]} />
          <meshStandardMaterial color="#ff7138" emissive="#ff4d12" emissiveIntensity={1.8} metalness={0.7} roughness={0.22} />
        </mesh>
        <mesh position={[0.1, 0, 0]} scale={0.28}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#ff7138" metalness={0.7} roughness={0.2} emissive="#8c2609" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 4, 5]} intensity={2.1} />
      <pointLight position={[-3, 1, 2]} color="#ff7138" intensity={28} distance={8} />
      <pointLight position={[3, -2, -1]} color="#9bbcff" intensity={14} distance={7} />
      <Suspense fallback={null}>
        <Sculpture />
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.35} scale={5} blur={2.5} far={4} />
      </Suspense>
    </Canvas>
  );
}
