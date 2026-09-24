"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

function Monitor({ progress }: { progress: number }) {
  const glow = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.4 + Math.sin(clock.elapsedTime * 1.6) * 0.25;
    }
  });

  return (
    <group position={[0, 1.15, -0.35]}>
      {/* Bezel */}
      <RoundedBox args={[2.4, 1.45, 0.08]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.35} />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.2, 1.28]} />
        <meshStandardMaterial
          color="#f5f5f5"
          emissive="#ffffff"
          emissiveIntensity={0.35 + progress * 0.4}
          roughness={0.2}
        />
      </mesh>
      {/* Character desk vignette on screen */}
      <mesh position={[0, -0.12, 0.05]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color="#1a1020" emissive="#3b1d5c" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.02, -0.02, 0.055]}>
        <capsuleGeometry args={[0.08, 0.14, 4, 8]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[0.02, 0.14, 0.055]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#f0c8a8" />
      </mesh>
      <mesh position={[0.02, 0.2, 0.055]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial color="#6d28d9" />
      </mesh>
      <Text
        position={[0.78, -0.42, 0.06]}
        fontSize={0.2}
        color="#111111"
        anchorX="right"
        anchorY="middle"
      >
        {`${Math.round(progress * 100)}%`}
      </Text>
      {/* Stand */}
      <mesh position={[0, -0.85, 0.05]}>
        <cylinderGeometry args={[0.05, 0.08, 0.35, 16]} />
        <meshStandardMaterial color="#171717" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.05, 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Light bar */}
      <mesh position={[0, 0.78, 0.06]}>
        <boxGeometry args={[1.6, 0.04, 0.06]} />
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#fff7ed"
          emissiveIntensity={1.2}
        />
      </mesh>
      {/* Red sunset glow disc behind monitor */}
      <mesh ref={glow} position={[0, 0.1, -0.55]}>
        <circleGeometry args={[1.35, 48]} />
        <meshStandardMaterial
          color="#ff1f1f"
          emissive="#ff1f1f"
          emissiveIntensity={1.6}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.1, -0.58]}>
        <circleGeometry args={[1.9, 48]} />
        <meshStandardMaterial
          color="#7f1d1d"
          emissive="#991b1b"
          emissiveIntensity={0.7}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, 0.08, 0.55]}>
      <RoundedBox args={[1.35, 0.05, 0.45]} radius={0.02} smoothness={3}>
        <meshStandardMaterial color="#121212" roughness={0.45} metalness={0.3} />
      </RoundedBox>
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 12 }).map((__, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-0.55 + col * 0.1, 0.04, -0.14 + row * 0.08]}
          >
            <boxGeometry args={[0.08, 0.02, 0.06]} />
            <meshStandardMaterial
              color={col === 0 || col === 11 ? "#ef4444" : "#2a2a2a"}
              roughness={0.5}
            />
          </mesh>
        )),
      )}
    </group>
  );
}

function Mouse() {
  return (
    <group position={[0.95, 0.08, 0.65]}>
      <RoundedBox args={[0.18, 0.05, 0.3]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#151515" roughness={0.35} metalness={0.4} />
      </RoundedBox>
    </group>
  );
}

function Plant() {
  return (
    <group position={[-1.55, 0.08, 0.1]}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.1, 0.18, 16]} />
        <meshStandardMaterial color="#1f1f1f" />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 0.08,
            0.28,
            Math.sin((i / 4) * Math.PI * 2) * 0.08,
          ]}
          rotation={[0.4, i, 0.2]}
        >
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#14532d" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function DeskWorkspace({ progress }: { progress: number }) {
  return (
    <group>
      {/* Desk */}
      <mesh position={[0, 0, 0.2]} receiveShadow>
        <boxGeometry args={[4.2, 0.08, 2.2]} />
        <meshStandardMaterial color="#1a1210" roughness={0.55} metalness={0.15} />
      </mesh>
      {/* Desk mat */}
      <mesh position={[0, 0.045, 0.45]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 1.1]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.85} />
      </mesh>
      <Monitor progress={progress} />
      <Keyboard />
      <Mouse />
      <Plant />
      {/* Soft wall */}
      <mesh position={[0, 1.6, -1.3]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#0b0b0b" roughness={1} />
      </mesh>
    </group>
  );
}
