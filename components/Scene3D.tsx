"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function CrystalCore() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerRef.current) {
      // Smooth tilt responding to cursor pointer
      outerRef.current.rotation.y = THREE.MathUtils.lerp(
        outerRef.current.rotation.y,
        t * 0.18 + state.pointer.x * 0.45,
        0.05
      );
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        -state.pointer.y * 0.35 + 0.15,
        0.05
      );
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4;
      innerRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
      // Pulse emission
      const pulse = 1.4 + Math.sin(t * 2) * 0.6;
      (innerRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.25;
      ring1Ref.current.rotation.y = t * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={outerRef} scale={1.15}>
        {/* Outer Optical Glass Prism */}
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={10}
            resolution={512}
            transmission={0.96}
            roughness={0.08}
            thickness={1.1}
            ior={1.52}
            chromaticAberration={0.06}
            anisotropy={0.3}
            distortion={0.12}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#ffffff"
          />
        </mesh>

        {/* Inner Glowing Amber Energy Core */}
        <mesh ref={innerRef} scale={0.42}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={1.8}
            metalness={0.8}
            roughness={0.18}
          />
        </mesh>

        {/* Internal micro detail - satellite node */}
        <mesh position={[0.22, 0.22, 0]} scale={0.14}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#ffd2a6"
            emissive="#ff8a4c"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Precision Gimbal Ring 1 - Brushed Titanium with Orange Accents */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.52, 0.022, 16, 120]} />
          <meshStandardMaterial
            color="#1f1f23"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* Precision Gimbal Ring 2 - Anodized Orange Ring */}
        <mesh ref={ring2Ref} scale={0.88}>
          <torusGeometry args={[1.56, 0.016, 16, 120]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={0.6}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Orbiting Satellite Node 1 */}
        <mesh position={[1.45, 0.3, 0.4]} scale={0.06}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Orbiting Satellite Node 2 */}
        <mesh position={[-1.3, -0.4, 0.6]} scale={0.05}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ff7138" emissive="#ff7138" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      {/* Studio Key Light - Warm Orange */}
      <directionalLight position={[4, 5, 4]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} color="#ff7138" intensity={25} distance={10} />
      {/* Rim Light - Cool Cyan for realistic studio separation */}
      <pointLight position={[3, -2, -2]} color="#6eb2ff" intensity={18} distance={9} />
      {/* Subtle top fill */}
      <pointLight position={[0, 4, 1]} color="#ffffff" intensity={12} distance={8} />

      <Suspense fallback={null}>
        <CrystalCore />
        {/* Subtle Ambient Floating Particles */}
        <Sparkles count={35} scale={4.5} size={2.2} speed={0.35} color="#ff8b54" opacity={0.65} />
        <Sparkles count={25} scale={3.8} size={1.6} speed={0.25} color="#ffffff" opacity={0.45} />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.55}
          scale={5.5}
          blur={2.8}
          far={4}
          color="#050505"
        />
      </Suspense>
    </Canvas>
  );
}
