"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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

function RevealTimeline({
  introDone,
  reduced,
  revealProgressRef,
}: {
  introDone: boolean;
  reduced: boolean;
  revealProgressRef: { current: number };
}) {
  const startedAt = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!introDone) {
      startedAt.current = null;
      revealProgressRef.current = 0;
      return;
    }

    if (reduced) {
      revealProgressRef.current = 1;
      return;
    }

    if (startedAt.current === null) startedAt.current = clock.elapsedTime + 0.28;
    revealProgressRef.current = THREE.MathUtils.clamp(
      (clock.elapsedTime - startedAt.current) / 4.2,
      0,
      1,
    );
  });

  return null;
}

const cursorBrackets = [
  { x: -0.045, y: 0.05, length: 0.022, angle: 0 },
  { x: -0.055, y: 0.04, length: 0.022, angle: Math.PI / 2 },
  { x: 0.045, y: 0.05, length: 0.022, angle: 0 },
  { x: 0.055, y: 0.04, length: 0.022, angle: Math.PI / 2 },
  { x: -0.045, y: -0.05, length: 0.022, angle: 0 },
  { x: -0.055, y: -0.04, length: 0.022, angle: Math.PI / 2 },
  { x: 0.045, y: -0.05, length: 0.022, angle: 0 },
  { x: 0.055, y: -0.04, length: 0.022, angle: Math.PI / 2 },
];

function CursorReveal({
  introDone,
  revealProgressRef,
  portraitPositionRef,
}: {
  introDone: boolean;
  revealProgressRef: { current: number };
  portraitPositionRef: { current: THREE.Vector3 };
}) {
  const { camera, size } = useThree();
  const eye = useRef<THREE.Group>(null);
  const trailGlow = useRef<THREE.MeshBasicMaterial>(null);
  const trailLine = useRef<THREE.MeshBasicMaterial>(null);
  const sparks = useRef<THREE.Group>(null);
  const screenTarget = useMemo(() => new THREE.Vector3(), []);
  const forward = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const up = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const sequence = introDone ? revealProgressRef.current : 0;
    const activation = THREE.MathUtils.smoothstep(sequence, 0.08, 0.22);
    const travel = THREE.MathUtils.smoothstep(sequence, 0.16, 0.66);
    const settle = 1 - 0.68 * THREE.MathUtils.smoothstep(sequence, 0.78, 0.96);
    const opacity = activation * settle;
    const perspective = camera as THREE.PerspectiveCamera;
    const distance = 1.15;
    const halfHeight =
      distance * Math.tan(THREE.MathUtils.degToRad(perspective.fov) / 2);
    const halfWidth = halfHeight * (size.width / Math.max(1, size.height));

    screenTarget.copy(portraitPositionRef.current).project(camera);
    const targetX = screenTarget.x * halfWidth;
    const targetY = screenTarget.y * halfHeight;
    const x = THREE.MathUtils.lerp(halfWidth - 0.085, targetX, travel);
    const y = THREE.MathUtils.lerp(targetY + 0.1, targetY, travel);

    camera.getWorldDirection(forward);
    right.setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    up.setFromMatrixColumn(camera.matrixWorld, 1).normalize();

    if (eye.current) {
      eye.current.position
        .copy(camera.position)
        .addScaledVector(forward, distance)
        .addScaledVector(right, x)
        .addScaledVector(up, y);
      eye.current.quaternion.copy(camera.quaternion);
      eye.current.visible = opacity > 0.001;
    }
    if (trailGlow.current) trailGlow.current.opacity = opacity * 0.14;
    if (trailLine.current) trailLine.current.opacity = opacity * 0.68;
    if (sparks.current) {
      sparks.current.children.forEach((spark, index) => {
        spark.position.y = Math.sin(clock.elapsedTime * 3 + index * 2) * 0.012;
        spark.visible = opacity > 0.08;
      });
    }
  });

  return (
    <group ref={eye} visible={false}>
      <mesh position={[0.12, 0, -0.002]}>
        <planeGeometry args={[0.24, 0.018]} />
        <meshBasicMaterial
          ref={trailGlow}
          color="#ff3028"
          transparent
          opacity={0}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.12, 0, -0.001]}>
        <planeGeometry args={[0.2, 0.003]} />
        <meshBasicMaterial
          ref={trailLine}
          color="#ffc4c0"
          transparent
          opacity={0}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {cursorBrackets.map((segment, index) => (
        <mesh
          key={index}
          position={[segment.x, segment.y, 0]}
          rotation={[0, 0, segment.angle]}
        >
          <planeGeometry args={[segment.length, 0.003]} />
          <meshBasicMaterial color="#ff4b42" toneMapped={false} />
        </mesh>
      ))}
      <mesh>
        <circleGeometry args={[0.007, 12]} />
        <meshBasicMaterial color="#fff0ee" toneMapped={false} />
      </mesh>
      <group ref={sparks} position={[0.08, 0, 0.002]}>
        {[0, 1, 2].map((spark) => (
          <mesh key={spark} position={[spark * 0.045, 0, 0]}>
            <circleGeometry args={[0.0035, 8]} />
            <meshBasicMaterial color={spark === 1 ? "#fff0ee" : "#ff554d"} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SceneContent({
  progress,
  introDone,
  reduced,
  mobile,
  revealProgressRef,
  portraitPositionRef,
}: {
  progress: number;
  introDone: boolean;
  reduced: boolean;
  mobile: boolean;
  revealProgressRef: { current: number };
  portraitPositionRef: { current: THREE.Vector3 };
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
      <RevealTimeline
        introDone={introDone}
        reduced={reduced}
        revealProgressRef={revealProgressRef}
      />
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.08}>
        <DeskWorkspace
          progress={progress}
          introDone={introDone}
          reduced={reduced}
          revealProgressRef={revealProgressRef}
          portraitPositionRef={portraitPositionRef}
        />
      </Float>
      {!reduced ? (
        <CursorReveal
          introDone={introDone}
          revealProgressRef={revealProgressRef}
          portraitPositionRef={portraitPositionRef}
        />
      ) : null}
      {!reduced && !mobile ? <Particles count={70} /> : <Particles count={28} />}
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
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const revealProgressRef = useRef(0);
  const portraitPositionRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateEnvironment = () => {
      setReduced(motionPreference.matches);
      setMobile(window.innerWidth < 768);
    };

    updateEnvironment();
    motionPreference.addEventListener("change", updateEnvironment);
    window.addEventListener("resize", updateEnvironment);
    return () => {
      motionPreference.removeEventListener("change", updateEnvironment);
      window.removeEventListener("resize", updateEnvironment);
    };
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
          reduced={reduced}
          mobile={mobile}
          revealProgressRef={revealProgressRef}
          portraitPositionRef={portraitPositionRef}
        />
      </Suspense>
    </Canvas>
  );
}
