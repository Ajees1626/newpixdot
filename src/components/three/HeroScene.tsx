import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

const GROUP_OFFSET: [number, number, number] = [1.7, 0.15, 0];

function GradientSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 6) * 0.2;
    meshRef.current.rotation.y = t / 10;

    const targetX = (state.pointer.x * Math.PI) / 32;
    const targetY = (state.pointer.y * Math.PI) / 32;
    meshRef.current.rotation.x += targetY * 0.1;
    meshRef.current.rotation.y += targetX * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.65}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color={theme === "dark" ? "#7C5CFF" : "#6C4DFF"}
          attach="material"
          distort={0.32}
          speed={1.1}
          roughness={0.1}
          metalness={0.55}
          emissive={theme === "dark" ? "#3a2a8f" : "#a893ff"}
          emissiveIntensity={0.22}
        />
      </mesh>
    </Float>
  );
}

/** A slim, slowly-tumbling orbit ring for a subtle "tech node" accent. */
function OrbitRing({
  radius,
  rotation,
  color,
  speed = 0.05,
}: {
  radius: number;
  rotation: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

function FloatingShard({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} />
      </mesh>
    </Float>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.25 - camera.position.x) * 0.02;
    camera.position.y += (pointer.y * 0.18 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Premium, restrained 3D hero backdrop: an off-center distorted gradient
 * icosahedron ringed by thin orbit lines and a couple of accent shards,
 * evoking a "future tech" network node. Sits to the right of the hero copy
 * (masked out on the left via CSS) and moves slowly to stay premium rather
 * than busy.
 */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 4]} intensity={1.3} />
        <directionalLight position={[-4, -2, -4]} intensity={0.55} color="#22D3EE" />
        <pointLight position={[0, 2, 3]} intensity={0.7} color="#FF9F45" />

        <group position={GROUP_OFFSET}>
          <GradientSphere />
          <OrbitRing radius={2.15} rotation={[1.35, 0.4, 0]} color="#22D3EE" speed={0.04} />
          <OrbitRing radius={2.5} rotation={[1.5, -0.3, 0.4]} color="#7C5CFF" speed={-0.03} />
          <FloatingShard position={[-1.6, 1.7, -1.2]} color="#22D3EE" scale={0.22} />
          <FloatingShard position={[1.9, -1.9, -1]} color="#FF9F45" scale={0.16} />
          <Sparkles count={45} scale={5.5} size={2} speed={0.2} opacity={0.4} color="#ffffff" />
        </group>

        <Rig />
      </Suspense>
    </Canvas>
  );
}
