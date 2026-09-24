"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { DeskWorkspace } from "./DeskWorkspace";
import { Particles } from "./Particles";

function CameraRig({
  progress,
  introDone,
}: {
  progress: number;
  introDone: boolean;
}) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 1.05, -0.2), []);

  useFrame(({ clock }) => {
    const breathe = Math.sin(clock.elapsedTime * 0.35) * 0.04;
    // Start wide cinematic, dolly into the screen
    const start = new THREE.Vector3(0.15, 1.55, 3.6);
    const end = new THREE.Vector3(0, 1.15, 1.55);
    const deep = new THREE.Vector3(0, 1.12, 0.55);
    const p = introDone ? Math.min(1, progress) : Math.min(1, progress * 0.85);
    const from = start.clone().lerp(end, Math.min(1, p * 1.2));
    const pos = from.lerp(deep, Math.max(0, (p - 0.55) / 0.45));
    pos.y += breathe;
    camera.position.lerp(pos, 0.08);
    camera.lookAt(target);
  });

  return null;
}

function SceneContent({
  progress,
  introDone,
  reduced,
}: {
  progress: number;
  introDone: boolean;
  reduced: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 4.5, 12]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[2.5, 4, 2]}
        intensity={0.55}
        color="#fff1e6"
        castShadow={!reduced}
      />
      <pointLight position={[0, 1.4, -0.8]} intensity={2.4} color="#ff2d2d" distance={6} />
      <pointLight position={[-1.5, 2, 1.5]} intensity={0.45} color="#ffb4a2" />
      <spotLight
        position={[0, 3.2, 1.2]}
        angle={0.45}
        penumbra={0.7}
        intensity={1.1}
        color="#fff7ed"
      />
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.08}>
        <DeskWorkspace progress={progress} />
      </Float>
      {!reduced ? <Particles count={70} /> : <Particles count={28} />}
      <ContactShadows
        position={[0, 0.01, 0.2]}
        opacity={0.45}
        scale={8}
        blur={2.4}
        far={3}
      />
      <Environment preset="city" environmentIntensity={0.25} />
      <CameraRig progress={progress} introDone={introDone} />
    </>
  );
}

type Props = {
  progress: number;
  introDone: boolean;
};

export function HeroScene({ progress, introDone }: Props) {
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 768;
  }, []);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0.15, 1.55, 3.6], fov: 42, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <SceneContent
          progress={progress}
          introDone={introDone}
          reduced={reduced.current}
        />
      </Suspense>
    </Canvas>
  );
}
