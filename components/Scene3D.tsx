"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  Sparkles,
  Image as DreiImage,
  Html
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

interface CodingCardProps {
  photoUrl: string;
}

// Floating 3D Code Bracket
function FloatingBracket({
  position,
  text,
  color = "#ff7138",
  speed = 1.4
}: {
  position: [number, number, number];
  text: string;
  color?: string;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={position}>
        <Html transform distanceFactor={5} style={{ pointerEvents: "none" }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "15px",
              fontWeight: 800,
              color: color,
              background: "rgba(10, 10, 14, 0.7)",
              border: `1px solid ${color}44`,
              padding: "4px 9px",
              borderRadius: "6px",
              boxShadow: `0 0 15px ${color}33`,
              letterSpacing: "1px",
              userSelect: "none"
            }}
          >
            {text}
          </div>
        </Html>
      </group>
    </Float>
  );
}

// 3D Cyber Developer Terminal + Photo Card
function CyberDevScene({ photoUrl }: CodingCardProps) {
  const rootRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const glowLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (rootRef.current) {
      // 3D Parallax tilt reacting smoothly to mouse pointer
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        state.pointer.x * 0.42,
        0.06
      );
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        -state.pointer.y * 0.32 + 0.05,
        0.06
      );
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2;
      ring1Ref.current.rotation.y = t * 0.12;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.25;
      ring2Ref.current.rotation.z = t * 0.15;
    }

    if (glowLight.current) {
      glowLight.current.intensity = 22 + Math.sin(t * 3) * 6;
    }
  });

  return (
    <group ref={rootRef}>
      {/* Dynamic Cyber Studio Glow */}
      <pointLight
        ref={glowLight}
        position={[0, 0, -0.8]}
        color="#ff7138"
        intensity={22}
        distance={7}
      />
      <pointLight position={[2, 2, 1.5]} color="#00ffcc" intensity={14} distance={6} />
      <pointLight position={[-2, -2, 1]} color="#ff7138" intensity={18} distance={6} />

      {/* Floating 3D Code Snippets in space */}
      <FloatingBracket position={[-1.75, 1.4, 0.4]} text="< 费迪南 · Dev />" color="#00ffcc" speed={1.2} />
      <FloatingBracket position={[1.8, 1.3, 0.3]} text="{ Next.js 14 }" color="#ff7138" speed={1.5} />
      <FloatingBracket position={[-1.85, -1.2, 0.5]} text="npm run dev" color="#a78bfa" speed={1.8} />
      <FloatingBracket position={[1.75, -1.3, 0.4]} text="创作者 · Indo" color="#10b981" speed={1.3} />

      <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.4}>
        <group position={[0, 0, 0]}>
          {/* Main 3D Cyber Terminal Window Frame */}
          {/* Back Chassis */}
          <mesh position={[0, 0, -0.06]}>
            <boxGeometry args={[3.3, 2.7, 0.08]} />
            <meshStandardMaterial
              color="#0d0e12"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>

          {/* Neon Border Rim */}
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[3.36, 2.76]} />
            <meshBasicMaterial color="#ff7138" transparent opacity={0.4} />
          </mesh>

          {/* Optical Clear Glass Cover */}
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[3.24, 2.64, 0.02]} />
            <MeshTransmissionMaterial
              backside={false}
              samples={4}
              resolution={256}
              transmission={0.96}
              roughness={0.08}
              thickness={0.2}
              ior={1.46}
              chromaticAberration={0.04}
              color="#ffffff"
            />
          </mesh>

          {/* 3D Photo on the Left Side of Terminal */}
          <group position={[-0.92, -0.08, 0.04]}>
            <DreiImage
              url={photoUrl}
              scale={[1.18, 1.95]}
              radius={0.06}
              transparent
              toneMapped={false}
            />
            {/* Hologram Scanner Bar */}
            <mesh position={[0, 0, 0.02]}>
              <planeGeometry args={[1.18, 0.03]} />
              <meshBasicMaterial color="#00ffcc" transparent opacity={0.7} />
            </mesh>
          </group>

          {/* 3D Interactive Terminal Content on the Right */}
          <group position={[0.62, -0.06, 0.05]}>
            <Html transform distanceFactor={3.2} style={{ pointerEvents: "none" }}>
              <div
                style={{
                  width: "270px",
                  height: "220px",
                  background: "rgba(10, 11, 15, 0.95)",
                  border: "1px solid rgba(255, 113, 56, 0.25)",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: "11px",
                  lineHeight: "1.6",
                  color: "#d4d4d8",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                {/* Terminal Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    paddingBottom: "8px",
                    marginBottom: "8px"
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
                  </div>
                  <span style={{ fontSize: "9px", color: "#71717a", letterSpacing: "1px" }}>ferdinand.tsx</span>
                </div>

                {/* Code Body */}
                <div style={{ flex: 1, overflow: "hidden", fontSize: "10.5px" }}>
                  <div>
                    <span style={{ color: "#f43f5e" }}>const</span>{" "}
                    <span style={{ color: "#38bdf8" }}>developer</span> = {"{"}
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    <span style={{ color: "#a1a1aa" }}>name_id:</span>{" "}
                    <span style={{ color: "#ff7138" }}>&quot;Ferdinand Leandro&quot;</span>,
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    <span style={{ color: "#a1a1aa" }}>name_zh:</span>{" "}
                    <span style={{ color: "#ffd2a6" }}>&quot;费迪南 · 莱安德罗&quot;</span>,
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    <span style={{ color: "#a1a1aa" }}>studio:</span>{" "}
                    <span style={{ color: "#10b981" }}>&quot;FERNOVA (菲诺瓦)&quot;</span>,
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    <span style={{ color: "#a1a1aa" }}>skills:</span> [
                    <span style={{ color: "#38bdf8" }}>&quot;Next.js&quot;</span>,{" "}
                    <span style={{ color: "#a855f7" }}>&quot;3D Web&quot;</span>,{" "}
                    <span style={{ color: "#eab308" }}>&quot;Creative&quot;</span>],
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    <span style={{ color: "#a1a1aa" }}>status:</span>{" "}
                    <span style={{ color: "#10b981" }}>&quot;ONLINE (在线)&quot;</span>
                  </div>
                  <div>{"};"}</div>
                  <div style={{ marginTop: "4px", color: "#00ffcc", fontSize: "10px" }}>
                    &gt; halo dunia // 你好世界<span className="cursor-blink">_</span>
                  </div>
                </div>

                {/* Terminal Footer */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "6px",
                    marginTop: "6px",
                    fontSize: "8.5px",
                    color: "#71717a"
                  }}
                >
                  <span>UTF-8 // TypeScript</span>
                  <span style={{ color: "#10b981" }}>● 0 errors</span>
                </div>
              </div>
            </Html>
          </group>

          {/* Top Window Bar Title with cyber dots */}
          <mesh position={[0, 1.15, 0.05]}>
            <planeGeometry args={[3.1, 0.18]} />
            <meshBasicMaterial color="#14151b" />
          </mesh>

          {/* Precision Orbital Gimbal Rings */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[2.1, 0.016, 16, 120]} />
            <meshStandardMaterial
              color="#2a2b34"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>

          <mesh ref={ring2Ref} scale={1.08}>
            <torusGeometry args={[2.08, 0.012, 16, 120]} />
            <meshStandardMaterial
              color="#ff7138"
              emissive="#ff5412"
              emissiveIntensity={0.8}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>

          {/* Cybernetic Accent Satellites */}
          <mesh position={[2.1, 0.5, 0.4]} scale={0.06}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1} />
          </mesh>
          <mesh position={[-2.0, -0.6, 0.5]} scale={0.05}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ff7138" emissive="#ff7138" emissiveIntensity={1.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// 3D Crystal Core (Alternative Mode)
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
  initialMode?: "coding" | "sculpture";
}

export default function Scene3D({
  photoUrl = "/images/avatar/ferdinand.jpg",
  initialMode = "coding"
}: Scene3DProps) {
  const [mode, setMode] = useState<"coding" | "sculpture">(initialMode);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 44 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        {/* Key & Cyber Lighting */}
        <directionalLight position={[4, 5, 4]} intensity={2.8} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} color="#ff7138" intensity={26} distance={10} />
        <pointLight position={[3, -2, -2]} color="#00ffcc" intensity={22} distance={9} />
        <pointLight position={[0, 4, 1]} color="#a78bfa" intensity={14} distance={8} />

        <Suspense fallback={null}>
          {mode === "coding" ? (
            <CyberDevScene photoUrl={photoUrl} />
          ) : (
            <CrystalCore />
          )}

          {/* Matrix & Cyber Sparkles */}
          <Sparkles
            count={40}
            scale={5.2}
            size={2.2}
            speed={0.35}
            color="#00ffcc"
            opacity={0.6}
          />
          <Sparkles
            count={30}
            scale={4.5}
            size={1.8}
            speed={0.25}
            color="#ff7138"
            opacity={0.5}
          />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.6}
            scale={6.0}
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
          onClick={() => setMode("coding")}
          style={{
            background: mode === "coding" ? "var(--orange)" : "transparent",
            color: mode === "coding" ? "#120b07" : "#aaa",
            fontWeight: mode === "coding" ? 700 : 500,
            fontSize: "10px",
            border: "none",
            borderRadius: "20px",
            padding: "5px 11px",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          💻 3D Code IDE
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
