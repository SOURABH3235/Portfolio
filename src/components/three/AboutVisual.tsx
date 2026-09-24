"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function OrbitCore() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.35;
      group.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.8}
          roughness={0.25}
          emissive="#7f1d1d"
          emissiveIntensity={0.35}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#ff2d2d"
          emissive="#ff2d2d"
          emissiveIntensity={0.8}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[0.35, 0.35, 0.08]}
          radius={0.04}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 1.15,
            Math.sin((i / 3) * Math.PI * 2) * 0.45,
            Math.sin((i / 3) * Math.PI * 2) * 0.5,
          ]}
          rotation={[0.4, i, 0.2]}
        >
          <meshStandardMaterial
            color="#0a0a0a"
            transparent
            opacity={0.85}
            metalness={0.5}
            roughness={0.2}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

export function AboutVisual() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent md:h-[420px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,45,45,0.28),transparent_55%)]" />
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.2], fov: 42 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <pointLight position={[2, 2, 2]} intensity={1.2} color="#ff6b6b" />
          <pointLight position={[-2, -1, 1]} intensity={0.5} color="#ffffff" />
          <Float speed={1.4} floatIntensity={0.6} rotationIntensity={0.25}>
            <OrbitCore />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
