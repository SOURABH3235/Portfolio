"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type RevealProgress = { current: number };
type PortraitPosition = { current: THREE.Vector3 };

const TOTAL_FRAMES = 72;

const portraitVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
`;

const portraitFragmentShader = `
  uniform sampler2D uMap;
  uniform float uReveal;

  varying vec2 vUv;

  void main() {
    vec4 portrait = texture2D(uMap, vUv);

    float scan = 1.0 - uReveal;

    float revealMask = smoothstep(
      scan - 0.025,
      scan + 0.025,
      vUv.y
    );

    float revealFade = smoothstep(
      0.0,
      0.12,
      uReveal
    );

    gl_FragColor = vec4(
      portrait.rgb,
      portrait.a * revealMask * revealFade
    );

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function PortraitReveal({
  introDone,
  reduced,
  revealProgressRef,
  portraitPositionRef,
}: {
  introDone: boolean;
  reduced: boolean;
  revealProgressRef: RevealProgress;
  portraitPositionRef: PortraitPosition;
}) {
  /*
   * Load all 72 frames.
   *
   * Files:
   * public/head_movement_frames_12fps/frame_0001.png
   * ...
   * public/head_movement_frames_12fps/frame_0072.png
   */
  const frameUrls = useMemo(
    () =>
      Array.from(
        { length: TOTAL_FRAMES },
        (_, index) =>
          `/head_movement_frames_12fps/frame_${String(
            index + 1,
          ).padStart(4, "0")}.png`,
      ),
    [],
  );

  const frames = useLoader(
    THREE.TextureLoader,
    frameUrls,
  );

  const portrait = useRef<THREE.Group>(null);
  const material =
    useRef<THREE.ShaderMaterial>(null);
  const scanLine =
    useRef<THREE.Mesh>(null);
  const scanMaterial =
    useRef<THREE.MeshBasicMaterial>(null);

  /*
   * Target frame from cursor
   */
  const targetFrame = useRef(35);

  /*
   * Current smooth frame
   */
  const currentFrame = useRef(35);

  /*
   * Prevent unnecessary texture updates
   */
  const lastAppliedFrame = useRef(-1);

  /*
   * Cursor tracking
   */
  useEffect(() => {
    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      if (
        window.innerWidth <= 0
      ) {
        return;
      }

      /*
       * Normalize cursor X:
       *
       * left   = -1
       * center =  0
       * right  = +1
       */
      const normalizedX =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      /*
       * Clamp value
       */
      const x = THREE.MathUtils.clamp(
        normalizedX,
        -1,
        1,
      );

      /*
       * Convert cursor position
       * into frame number.
       *
       * left  -> frame 1
       * center -> frame 36
       * right -> frame 72
       */
      const mappedFrame =
        THREE.MathUtils.clamp(
          Math.round(
            ((x + 1) / 2) *
              (TOTAL_FRAMES - 1),
          ),
          0,
          TOTAL_FRAMES - 1,
        );

      targetFrame.current =
        mappedFrame;
    };

    const handlePointerLeave = () => {
      /*
       * Return face to center
       */
      targetFrame.current = 35;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true },
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, []);

  /*
   * Use first frame to calculate image size.
   */
  const imageSize = useMemo(() => {
    const image =
      frames[0].image as {
        width: number;
        height: number;
      };

    const aspect =
      image.width / image.height;

    const height = Math.min(
      1.14,
      0.88 / aspect,
    );

    return {
      width: height * aspect,
      height,
    };
  }, [frames]);

  const geometryArgs = useMemo(
    () =>
      [
        imageSize.width,
        imageSize.height,
      ] as [number, number],
    [imageSize],
  );

  /*
   * Set correct color space
   * for every frame.
   */
  useEffect(() => {
    frames.forEach((texture) => {
      texture.colorSpace =
        THREE.SRGBColorSpace;

      texture.needsUpdate = true;
    });
  }, [frames]);

  /*
   * Shader uniforms
   */
  const uniforms = useMemo(
    () => ({
      uMap: {
        value: frames[35],
      },

      uReveal: {
        value: 0,
      },
    }),
    [frames],
  );

  useFrame(() => {
    /*
     * Smoothly move current frame
     * toward cursor target.
     */
    currentFrame.current =
      THREE.MathUtils.lerp(
        currentFrame.current,
        targetFrame.current,
        0.16,
      );

    const frameIndex = THREE.MathUtils.clamp(
      Math.round(
        currentFrame.current,
      ),
      0,
      TOTAL_FRAMES - 1,
    );

    /*
     * Change texture only when
     * frame actually changes.
     */
    if (
      material.current &&
      frameIndex !==
        lastAppliedFrame.current
    ) {
      material.current.uniforms.uMap.value =
        frames[frameIndex];

      lastAppliedFrame.current =
        frameIndex;
    }

    /*
     * Keep portrait world position
     * updated for CursorReveal.
     */
    if (portrait.current) {
      portrait.current.getWorldPosition(
        portraitPositionRef.current,
      );
    }

    /*
     * Existing reveal animation
     */
    const sequence =
      introDone
        ? revealProgressRef.current
        : 0;

    const reveal = reduced
      ? 1
      : THREE.MathUtils.smoothstep(
          sequence,
          0.34,
          0.83,
        );

    if (material.current) {
      material.current.uniforms.uReveal.value =
        reveal;
    }

    /*
     * Existing red scan line
     */
    if (
      scanLine.current &&
      scanMaterial.current
    ) {
      scanLine.current.position.y =
        (0.5 - reveal) *
        imageSize.height;

      scanMaterial.current.opacity =
        reduced
          ? 0
          : 0.42 *
              THREE.MathUtils.smoothstep(
                sequence,
                0.3,
                0.4,
              ) *
              (1 -
                THREE.MathUtils.smoothstep(
                  sequence,
                  0.78,
                  0.94,
                ));
    }
  });

  return (
    <group
      ref={portrait}
      position={[0, -0.04, 0.06]}
    >
      {/* Face */}
      <mesh>
        <planeGeometry
          args={geometryArgs}
        />

        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={
            portraitVertexShader
          }
          fragmentShader={
            portraitFragmentShader
          }
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Red scanning line */}
      <mesh
        ref={scanLine}
        position={[
          0,
          imageSize.height / 2,
          0.008,
        ]}
      >
        <planeGeometry
          args={[
            imageSize.width * 1.08,
            0.012,
          ]}
        />

        <meshBasicMaterial
          ref={scanMaterial}
          color="#ff3a32"
          transparent
          opacity={0}
          depthTest={false}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Monitor({
  progress,
  introDone,
  reduced,
  revealProgressRef,
  portraitPositionRef,
}: {
  progress: number;
  introDone: boolean;
  reduced: boolean;
  revealProgressRef: RevealProgress;
  portraitPositionRef: PortraitPosition;
}) {
  const glow =
    useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glow.current) {
      const mat =
        glow.current
          .material as THREE.MeshStandardMaterial;

      mat.emissiveIntensity =
        1.4 +
        Math.sin(
          clock.elapsedTime * 1.6,
        ) *
          0.25;
    }
  });

  return (
    <group
      position={[
        0,
        1.15,
        -0.35,
      ]}
    >
      {/* Monitor body */}
      <RoundedBox
        args={[
          2.4,
          1.45,
          0.08,
        ]}
        radius={0.04}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.7}
          roughness={0.35}
        />
      </RoundedBox>

      {/* Screen */}
      <mesh
        position={[
          0,
          0,
          0.045,
        ]}
      >
        <planeGeometry
          args={[2.2, 1.28]}
        />

        <meshStandardMaterial
          color="#f5f5f5"
          emissive="#ffffff"
          emissiveIntensity={
            0.35 + progress * 0.4
          }
          roughness={0.2}
        />
      </mesh>

      {/* Head / face */}
      <PortraitReveal
        introDone={introDone}
        reduced={reduced}
        revealProgressRef={
          revealProgressRef
        }
        portraitPositionRef={
          portraitPositionRef
        }
      />

      {/* Monitor stand */}
      <mesh
        position={[
          0,
          -0.85,
          0.05,
        ]}
      >
        <cylinderGeometry
          args={[
            0.05,
            0.08,
            0.35,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#171717"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Monitor base */}
      <mesh
        position={[
          0,
          -1.05,
          0.08,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.28,
            0.28,
            0.04,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#111111"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Monitor top light */}
      <mesh
        position={[
          0,
          0.78,
          0.06,
        ]}
      >
        <boxGeometry
          args={[
            1.6,
            0.04,
            0.06,
          ]}
        />

        <meshStandardMaterial
          color="#f8fafc"
          emissive="#fff7ed"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Red glow */}
      <mesh
        ref={glow}
        position={[
          0,
          0.1,
          -0.55,
        ]}
      >
        <circleGeometry
          args={[1.35, 48]}
        />

        <meshStandardMaterial
          color="#ff1f1f"
          emissive="#ff1f1f"
          emissiveIntensity={1.6}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh
        position={[
          0,
          0.1,
          -0.58,
        ]}
      >
        <circleGeometry
          args={[1.9, 48]}
        />

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
    <group
      position={[
        0,
        0.08,
        0.55,
      ]}
    >
      <RoundedBox
        args={[
          1.35,
          0.05,
          0.45,
        ]}
        radius={0.02}
        smoothness={3}
      >
        <meshStandardMaterial
          color="#121212"
          roughness={0.45}
          metalness={0.3}
        />
      </RoundedBox>

      {Array.from({
        length: 5,
      }).map((_, row) =>
        Array.from({
          length: 12,
        }).map((__, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.55 +
                col * 0.1,
              0.04,
              -0.14 +
                row * 0.08,
            ]}
          >
            <boxGeometry
              args={[
                0.08,
                0.02,
                0.06,
              ]}
            />

            <meshStandardMaterial
              color={
                col === 0 ||
                col === 11
                  ? "#ef4444"
                  : "#2a2a2a"
              }
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
    <group
      position={[
        0.95,
        0.08,
        0.65,
      ]}
    >
      <RoundedBox
        args={[
          0.18,
          0.05,
          0.3,
        ]}
        radius={0.03}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#151515"
          roughness={0.35}
          metalness={0.4}
        />
      </RoundedBox>
    </group>
  );
}

function Plant() {
  return (
    <group
      position={[
        -1.55,
        0.08,
        0.1,
      ]}
    >
      <mesh>
        <cylinderGeometry
          args={[
            0.12,
            0.1,
            0.18,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#1f1f1f"
        />
      </mesh>

      {[0, 1, 2, 3].map(
        (i) => (
          <mesh
            key={i}
            position={[
              Math.cos(
                (i / 4) *
                  Math.PI *
                  2,
              ) * 0.08,
              0.28,
              Math.sin(
                (i / 4) *
                  Math.PI *
                  2,
              ) * 0.08,
            ]}
            rotation={[
              0.4,
              i,
              0.2,
            ]}
          >
            <sphereGeometry
              args={[
                0.12,
                12,
                12,
              ]}
            />

            <meshStandardMaterial
              color="#14532d"
              roughness={0.8}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

export function DeskWorkspace({
  progress,
  introDone,
  reduced,
  revealProgressRef,
  portraitPositionRef,
}: {
  progress: number;
  introDone: boolean;
  reduced: boolean;
  revealProgressRef: RevealProgress;
  portraitPositionRef: PortraitPosition;
}) {
  return (
    <group>
      {/* Desk */}
      <mesh
        position={[
          0,
          0,
          0.2,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            4.2,
            0.08,
            2.2,
          ]}
        />

        <meshStandardMaterial
          color="#1a1210"
          roughness={0.55}
          metalness={0.15}
        />
      </mesh>

      {/* Desk mat */}
      <mesh
        position={[
          0,
          0.045,
          0.45,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[
            2.4,
            1.1,
          ]}
        />

        <meshStandardMaterial
          color="#7c2d12"
          roughness={0.85}
        />
      </mesh>

      {/* Monitor */}
      <Monitor
        progress={progress}
        introDone={introDone}
        reduced={reduced}
        revealProgressRef={
          revealProgressRef
        }
        portraitPositionRef={
          portraitPositionRef
        }
      />

      <Keyboard />

      <Mouse />

      <Plant />

      {/* Soft wall */}
      <mesh
        position={[
          0,
          1.6,
          -1.3,
        ]}
      >
        <planeGeometry
          args={[8, 5]}
        />

        <meshStandardMaterial
          color="#0b0b0b"
          roughness={1}
        />
      </mesh>
    </group>
  );
}