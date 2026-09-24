"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Particles } from "./Particles";

function ContactOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.25;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <Float speed={1} floatIntensity={0.5}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.7, 0.22, 128, 24]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.85}
          roughness={0.2}
          emissive="#ff2d2d"
          emissiveIntensity={0.45}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#ff2d2d"
          emissive="#ff2d2d"
          emissiveIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

export function ContactScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 1, 2]} intensity={2} color="#ff2d2d" />
          <ContactOrb />
          <Particles count={40} />
        </Suspense>
      </Canvas>
    </div>
  );
}
