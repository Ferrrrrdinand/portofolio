"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Sparkles,
  Image as DreiImage
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

// --- KINETIC QUANTUM CORE (Full Interactive 3D Holographic Sculpture) ---
function KineticQuantumCore({ onTriggerPulse }: { onTriggerPulse?: () => void }) {
  const outerGroup = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const glowLight = useRef<THREE.PointLight>(null);

  // Smooth mouse inertia & rotation physics
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerGroup.current) {
      // Dynamic tilt responding to cursor with smooth lerp
      outerGroup.current.rotation.y = THREE.MathUtils.lerp(
        outerGroup.current.rotation.y,
        t * 0.25 + state.pointer.x * 0.8,
        0.06
      );
      outerGroup.current.rotation.x = THREE.MathUtils.lerp(
        outerGroup.current.rotation.x,
        -state.pointer.y * 0.6 + 0.15,
        0.06
      );
    }

    // Concentric gyroscope gimbal rings rotating on distinct multi-axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.45;
      ring1Ref.current.rotation.y = t * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.55;
      ring2Ref.current.rotation.z = t * 0.35;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.4;
      ring3Ref.current.rotation.x = -t * 0.3;
    }

    // Pulsing inner organic cyber core
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(t * 3.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Dynamic light breathing
    if (glowLight.current) {
      glowLight.current.intensity = 26 + Math.sin(t * 4) * 8;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={outerGroup} scale={1.2}>
        {/* Core Pulsing Point Light */}
        <pointLight
          ref={glowLight}
          color="#ff7138"
          intensity={28}
          distance={8}
        />
        <pointLight position={[3, 3, 2]} color="#00f0ff" intensity={18} distance={7} />
        <pointLight position={[-3, -3, -2]} color="#ff007f" intensity={15} distance={6} />

        {/* 1. Inner Morphing Liquid Plasma Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.65, 64, 64]} />
          <MeshDistortMaterial
            color="#ff5412"
            emissive="#ff3b00"
            emissiveIntensity={1.8}
            roughness={0.12}
            metalness={0.85}
            distort={0.45}
            speed={3.2}
          />
        </mesh>

        {/* 2. Optical Glass Geometric Shell with Chromatic Dispersion */}
        <mesh>
          <icosahedronGeometry args={[1.2, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={12}
            resolution={512}
            transmission={0.96}
            roughness={0.06}
            thickness={1.2}
            ior={1.55}
            chromaticAberration={0.08}
            anisotropy={0.4}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.15}
            color="#ffffff"
          />
        </mesh>

        {/* 3. Outer Titanium Precision Gimbal Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.65, 0.022, 16, 120]} />
          <meshStandardMaterial
            color="#18181f"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* 4. Anodized Neon Orange Gimbal Ring 2 */}
        <mesh ref={ring2Ref} scale={0.92}>
          <torusGeometry args={[1.72, 0.018, 16, 120]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* 5. Cyber Cyan Hyper-velocity Ring 3 */}
        <mesh ref={ring3Ref} scale={1.12}>
          <torusGeometry args={[1.78, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.4}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* 6. Orbiting Satellites with Light Nodes */}
        <mesh position={[1.7, 0.6, 0.5]} scale={0.08}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00f0ff"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <mesh position={[-1.6, -0.7, 0.6]} scale={0.07}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={2}
          />
        </mesh>

        <mesh position={[0.4, 1.8, -0.5]} scale={0.06}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffd2a6"
            emissive="#ff8b54"
            emissiveIntensity={1.8}
            metalness={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

// --- 3D HOLOGRAPHIC AVATAR PORTAL (Clean, Non-shaky, Interactive) ---
function HolographicAvatarPortal({ photoUrl }: { photoUrl: string }) {
  const portalRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (portalRef.current) {
      // Gentle, calm 3D tilt tracking without chaotic wobbling
      portalRef.current.rotation.y = THREE.MathUtils.lerp(
        portalRef.current.rotation.y,
        state.pointer.x * 0.35,
        0.05
      );
      portalRef.current.rotation.x = THREE.MathUtils.lerp(
        portalRef.current.rotation.x,
        -state.pointer.y * 0.25 + 0.04,
        0.05
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.3}>
      <group ref={portalRef} scale={1.08}>
        {/* Soft Backlight */}
        <pointLight position={[0, 0, -0.7]} color="#ff7138" intensity={22} distance={6} />

        {/* Outer Hexagonal Cyber Ring */}
        <mesh ref={ringRef} position={[0, 0, -0.06]}>
          <torusGeometry args={[1.9, 0.016, 16, 6]} />
          <meshStandardMaterial
            color="#ff7138"
            emissive="#ff5412"
            emissiveIntensity={1.4}
            metalness={0.85}
          />
        </mesh>

        {/* Dark Beveled Base Chassis */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[2.26, 3.06, 0.06]} />
          <meshStandardMaterial color="#101014" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* Clean Photo Texture */}
        <group position={[0, 0, 0.035]}>
          <DreiImage
            url={photoUrl}
            scale={[2.1, 2.9]}
            radius={0.08}
            transparent
            toneMapped={false}
          />
        </group>

        {/* Specular Front Optical Glass */}
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[2.16, 2.96, 0.02]} />
          <MeshTransmissionMaterial
            backside={false}
            samples={6}
            resolution={256}
            transmission={0.97}
            roughness={0.05}
            thickness={0.2}
            ior={1.48}
            chromaticAberration={0.02}
            color="#ffffff"
          />
        </mesh>

        {/* Top Minimal Hologram HUD Bar */}
        <group position={[0, 1.3, 0.09]}>
          <mesh position={[-0.45, 0, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <boxGeometry args={[0.8, 0.02, 0.01]} />
            <meshStandardMaterial color="#ff7138" emissive="#ff5412" emissiveIntensity={1.5} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

interface Scene3DProps {
  photoUrl?: string;
  initialMode?: "kinetic" | "avatar";
}

export default function Scene3D({
  photoUrl = "/images/avatar/ferdinand.jpg",
  initialMode = "kinetic"
}: Scene3DProps) {
  const [mode, setMode] = useState<"kinetic" | "avatar">(initialMode);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 6, 4]} intensity={2.8} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} color="#ff7138" intensity={25} distance={10} />
        <pointLight position={[4, -3, -2]} color="#00f0ff" intensity={20} distance={10} />

        <Suspense fallback={null}>
          {mode === "kinetic" ? (
            <KineticQuantumCore />
          ) : (
            <HolographicAvatarPortal photoUrl={photoUrl} />
          )}

          {/* Dynamic Cyber Sparkles Vortex */}
          <Sparkles
            count={45}
            scale={5.5}
            size={2.4}
            speed={0.4}
            color="#ff7138"
            opacity={0.65}
          />
          <Sparkles
            count={35}
            scale={4.8}
            size={1.8}
            speed={0.3}
            color="#00f0ff"
            opacity={0.5}
          />

          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.6}
            scale={6.0}
            blur={2.8}
            far={4}
            color="#040406"
          />
        </Suspense>
      </Canvas>

      {/* Futuristic Mode Switcher */}
      <div className="scene-mode-pill">
        <button
          type="button"
          onClick={() => setMode("kinetic")}
          className={mode === "kinetic" ? "active" : ""}
          title="Interactive 3D Kinetic Sculpture"
        >
          <span className="dot pulse-orange" /> ⚡ 3D Kinetic Core
        </button>
        <button
          type="button"
          onClick={() => setMode("avatar")}
          className={mode === "avatar" ? "active" : ""}
          title="Holographic Identity Card"
        >
          <span className="dot pulse-cyan" /> 👤 3D Avatar
        </button>
      </div>
    </div>
  );
}
