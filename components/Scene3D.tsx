"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  Sparkles,
  Image as DreiImage
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

interface CleanPhotoCardProps {
  photoUrl: string;
}

// Clean, Sleek 3D Portrait Card (Developer Edition)
function CleanPhotoCard3D({ photoUrl }: CleanPhotoCardProps) {
  const cardGroup = useRef<THREE.Group>(null);
  const orbitalRing = useRef<THREE.Mesh>(null);
  const backGlow = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (cardGroup.current) {
      // Smooth, elegant 3D tilt tracking cursor without jitter
      cardGroup.current.rotation.y = THREE.MathUtils.lerp(
        cardGroup.current.rotation.y,
        state.pointer.x * 0.38,
        0.05
      );
      cardGroup.current.rotation.x = THREE.MathUtils.lerp(
        cardGroup.current.rotation.x,
        -state.pointer.y * 0.28 + 0.05,
        0.05
      );
    }

    if (orbitalRing.current) {
      orbitalRing.current.rotation.x = t * 0.18;
      orbitalRing.current.rotation.y = t * 0.12;
    }

    if (backGlow.current) {
      backGlow.current.intensity = 18 + Math.sin(t * 2) * 5;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={cardGroup} scale={1.08}>
        {/* Soft Warm Backlight Halo */}
        <pointLight
          ref={backGlow}
          position={[0, 0, -0.6]}
          color="#ff7138"
          distance={5}
          intensity={18}
        />

        {/* 1. Subtle Outer Glow Border Rim */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[2.32, 3.12]} />
          <meshBasicMaterial color="#ff7138" transparent opacity={0.3} />
        </mesh>

        {/* 2. Premium Dark Matte Chassis (Backplate) */}
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[2.26, 3.06, 0.06]} />
          <meshStandardMaterial
            color="#121216"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* 3. Sleek Inner Beveled Frame */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[2.2, 3.0, 0.03]} />
          <meshStandardMaterial
            color="#1d1d23"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* 4. The 3D Photo - Prominent, Crisp, and Centered */}
        <group position={[0, 0, 0.04]}>
          <DreiImage
            url={photoUrl}
            scale={[2.08, 2.88]}
            radius={0.08}
            transparent
            toneMapped={false}
          />
        </group>

        {/* 5. Front Optical Glass Cover (Realistic Specular Reflection) */}
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[2.14, 2.94, 0.02]} />
          <MeshTransmissionMaterial
            backside={false}
            samples={6}
            resolution={256}
            transmission={0.97}
            roughness={0.05}
            thickness={0.2}
            ior={1.48}
            chromaticAberration={0.03}
            color="#ffffff"
          />
        </mesh>

        {/* 6. Clean Minimal HUD Elements (Top Status Pill) */}
        <group position={[0, 1.28, 0.1]}>
          {/* Status Chip Frame */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.1, 0.18, 0.02]} />
            <meshStandardMaterial
              color="#0d0d11"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          {/* Glowing Green Online Dot */}
          <mesh position={[-0.42, 0, 0.02]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={2}
            />
          </mesh>
          {/* Orange Accent Line */}
          <mesh position={[0.1, 0, 0.02]}>
            <boxGeometry args={[0.7, 0.025, 0.01]} />
            <meshStandardMaterial
              color="#ff7138"
              emissive="#ff5412"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>

        {/* 7. Bottom Minimal Brand Badge */}
        <group position={[0, -1.28, 0.1]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.95, 0.16, 0.02]} />
            <meshStandardMaterial
              color="#0d0d11"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.6, 0.02, 0.01]} />
            <meshStandardMaterial
              color="#ff7138"
              emissive="#ff5412"
              emissiveIntensity={1}
            />
          </mesh>
        </group>

        {/* 8. Single Clean, Thin Anodized Orbital Ring */}
        <mesh ref={orbitalRing} scale={1.05}>
          <torusGeometry args={[1.95, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={0.65}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Crystal Core (Clean Minimal Sculpture)
function CrystalCore() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.y = THREE.MathUtils.lerp(
        outerRef.current.rotation.y,
        t * 0.18 + state.pointer.x * 0.42,
        0.05
      );
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        -state.pointer.y * 0.32 + 0.12,
        0.05
      );
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.35;
      const pulse = 1.3 + Math.sin(t * 2) * 0.5;
      (innerRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.2;
      ringRef.current.rotation.y = t * 0.14;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={outerRef} scale={1.15}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={384}
            transmission={0.96}
            roughness={0.08}
            thickness={1.1}
            ior={1.52}
            chromaticAberration={0.06}
            anisotropy={0.3}
            distortion={0.12}
            distortionScale={0.3}
            color="#ffffff"
          />
        </mesh>

        <mesh ref={innerRef} scale={0.42}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={1.6}
            metalness={0.8}
            roughness={0.18}
          />
        </mesh>

        <mesh ref={ringRef}>
          <torusGeometry args={[1.54, 0.018, 16, 120]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

interface Scene3DProps {
  photoUrl?: string;
  initialMode?: "photo" | "sculpture";
}

export default function Scene3D({
  photoUrl = "/images/avatar/ferdinand.jpg",
  initialMode = "photo"
}: Scene3DProps) {
  const [mode, setMode] = useState<"photo" | "sculpture">(initialMode);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        {/* Clean Studio Lighting */}
        <directionalLight position={[4, 5, 4]} intensity={2.6} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} color="#ff7138" intensity={24} distance={9} />
        <pointLight position={[3, -2, -2]} color="#60a5fa" intensity={16} distance={8} />

        <Suspense fallback={null}>
          {mode === "photo" ? (
            <CleanPhotoCard3D photoUrl={photoUrl} />
          ) : (
            <CrystalCore />
          )}

          {/* Gentle, Subtle Ambient Particles (Clean, not noisy) */}
          <Sparkles
            count={22}
            scale={4.2}
            size={1.8}
            speed={0.22}
            color="#ff8b54"
            opacity={0.5}
          />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.0, 0]}
            opacity={0.5}
            scale={5.2}
            blur={2.6}
            far={4}
            color="#050505"
          />
        </Suspense>
      </Canvas>

      {/* Clean Mode Switch Pill */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 10,
          display: "flex",
          gap: "4px",
          background: "rgba(16, 16, 20, 0.72)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "30px",
          padding: "3px"
        }}
      >
        <button
          type="button"
          onClick={() => setMode("photo")}
          style={{
            background: mode === "photo" ? "var(--orange)" : "transparent",
            color: mode === "photo" ? "#120b07" : "#888",
            fontWeight: mode === "photo" ? 700 : 500,
            fontSize: "10px",
            border: "none",
            borderRadius: "20px",
            padding: "5px 12px",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          👤 3D Photo
        </button>
        <button
          type="button"
          onClick={() => setMode("sculpture")}
          style={{
            background: mode === "sculpture" ? "var(--orange)" : "transparent",
            color: mode === "sculpture" ? "#120b07" : "#888",
            fontWeight: mode === "sculpture" ? 700 : 500,
            fontSize: "10px",
            border: "none",
            borderRadius: "20px",
            padding: "5px 12px",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          💎 3D Crystal
        </button>
      </div>
    </div>
  );
}
