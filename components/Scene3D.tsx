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

interface PhotoCardProps {
  photoUrl: string;
}

function PhotoCard3D({ photoUrl }: PhotoCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth responsive 3D tilt tracking cursor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.45,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.35 + 0.08,
        0.06
      );
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.22;
      ring1Ref.current.rotation.y = t * 0.14;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.28;
      ring2Ref.current.rotation.z = t * 0.18;
    }

    if (glowRef.current) {
      glowRef.current.intensity = 18 + Math.sin(t * 2.5) * 6;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.45}>
      <group ref={groupRef} scale={1.05}>
        {/* Glow backlight behind card */}
        <pointLight
          ref={glowRef}
          position={[0, 0, -0.6]}
          color="#ff7138"
          distance={6}
          intensity={20}
        />

        {/* Outer glowing halo border */}
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[2.34, 3.04]} />
          <meshBasicMaterial color="#ff7138" transparent opacity={0.35} />
        </mesh>

        {/* Brushed Titanium Card Backplate with 3D Depth */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.26, 2.96, 0.07]} />
          <meshStandardMaterial
            color="#141418"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Beveled Chamfer Edge - Metallic Frame */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[2.2, 2.9, 0.04]} />
          <meshStandardMaterial
            color="#222228"
            metalness={0.88}
            roughness={0.3}
          />
        </mesh>

        {/* The 3D Photo Texture Plane with rounded corners */}
        <group position={[0, 0, 0.045]}>
          <DreiImage
            url={photoUrl}
            scale={[2.08, 2.78]}
            radius={0.08}
            transparent
            toneMapped={false}
          />
        </group>

        {/* Front Optical Specular Glass Layer */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2.14, 2.84, 0.02]} />
          <MeshTransmissionMaterial
            backside={false}
            samples={6}
            resolution={256}
            transmission={0.97}
            roughness={0.06}
            thickness={0.25}
            ior={1.48}
            chromaticAberration={0.05}
            color="#ffffff"
          />
        </mesh>

        {/* Top 3D ID Badge Chip */}
        <mesh position={[-0.68, 1.25, 0.12]}>
          <boxGeometry args={[0.55, 0.12, 0.02]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Hologram Corner Accent Node 1 */}
        <mesh position={[0.9, 1.26, 0.11]} scale={0.04}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Hologram Corner Accent Node 2 */}
        <mesh position={[0.9, -1.26, 0.11]} scale={0.04}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff7138"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Precision Orbiting Gimbal Ring 1 - Brushed Titanium */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.9, 0.018, 16, 120]} />
          <meshStandardMaterial
            color="#2a2a32"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Precision Orbiting Gimbal Ring 2 - Anodized Orange */}
        <mesh ref={ring2Ref} scale={1.12}>
          <torusGeometry args={[1.88, 0.014, 16, 120]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={0.9}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>

        {/* Orbiting Satellite Particle 1 */}
        <mesh position={[1.8, 0.4, 0.5]} scale={0.07}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Orbiting Satellite Particle 2 */}
        <mesh position={[-1.7, -0.6, 0.6]} scale={0.06}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff7138"
            emissiveIntensity={1.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CrystalCore() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (outerRef.current) {
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

        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.52, 0.022, 16, 120]} />
          <meshStandardMaterial
            color="#1f1f23"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

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
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        {/* Studio Key Light */}
        <directionalLight position={[4, 5, 4]} intensity={2.8} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} color="#ff7138" intensity={28} distance={10} />
        {/* Rim Light */}
        <pointLight position={[3, -2, -2]} color="#6eb2ff" intensity={20} distance={9} />
        <pointLight position={[0, 4, 1]} color="#ffffff" intensity={12} distance={8} />

        <Suspense fallback={null}>
          {mode === "photo" ? (
            <PhotoCard3D photoUrl={photoUrl} />
          ) : (
            <CrystalCore />
          )}

          {/* Floating Atmospheric Sparkles */}
          <Sparkles
            count={35}
            scale={4.8}
            size={2.2}
            speed={0.35}
            color="#ff8b54"
            opacity={0.65}
          />
          <Sparkles
            count={25}
            scale={4.0}
            size={1.6}
            speed={0.25}
            color="#ffffff"
            opacity={0.45}
          />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.55}
            scale={5.5}
            blur={2.8}
            far={4}
            color="#050505"
          />
        </Suspense>
      </Canvas>

      {/* 3D Mode Switch Pill */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 10,
          display: "flex",
          gap: "4px",
          background: "rgba(18, 18, 22, 0.75)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "30px",
          padding: "3px"
        }}
      >
        <button
          type="button"
          onClick={() => setMode("photo")}
          style={{
            background: mode === "photo" ? "var(--orange)" : "transparent",
            color: mode === "photo" ? "#120b07" : "#aaa",
            fontWeight: mode === "photo" ? 700 : 500,
            fontSize: "10px",
            border: "none",
            borderRadius: "20px",
            padding: "5px 11px",
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
            color: mode === "sculpture" ? "#120b07" : "#aaa",
            fontWeight: mode === "sculpture" ? 700 : 500,
            fontSize: "10px",
            border: "none",
            borderRadius: "20px",
            padding: "5px 11px",
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
