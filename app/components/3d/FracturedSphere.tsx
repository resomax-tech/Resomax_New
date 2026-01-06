// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { Environment } from "@react-three/drei";
// import { useMemo, useRef, useEffect } from "react";
// import gsap from "gsap";

// function FracturedSphereMesh() {
//   const meshRef = useRef<THREE.InstancedMesh | null>(null);
//   const dummy = useMemo(() => new THREE.Object3D(), []);
//   const SHARD_COUNT = 180;

//   /* ---------------- COLORS (SUBTLE VARIATION) ---------------- */
//   const colors = useMemo(
//     () => [
//       new THREE.Color("#0f172a"),
//       new THREE.Color("#111827"),
//       new THREE.Color("#1f2937"),
//     ],
//     []
//   );

//   /* ---------------- TRANSFORMS ---------------- */
//   const transforms = useMemo(() => {
//     return Array.from({ length: SHARD_COUNT }).map(() => {
//       const radius = 1.6 + Math.random() * 0.5;
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(2 * Math.random() - 1);

//       return {
//         position: new THREE.Vector3(
//           radius * Math.sin(phi) * Math.cos(theta),
//           radius * Math.sin(phi) * Math.sin(theta),
//           radius * Math.cos(phi)
//         ),
//         rotation: new THREE.Euler(
//           Math.random() * Math.PI,
//           Math.random() * Math.PI,
//           Math.random() * Math.PI
//         ),
//         color: colors[Math.floor(Math.random() * colors.length)],
//       };
//     });
//   }, [colors]);

//   /* ---------------- GEOMETRY ---------------- */
//   const geometry = useMemo(() => {
//     const shape = new THREE.Shape();
//     shape.moveTo(0, 0);
//     shape.lineTo(0.25, 0);
//     shape.lineTo(0.12, 0.28);
//     shape.lineTo(0, 0);

//     const geo = new THREE.ShapeGeometry(shape);
//     geo.center();
//     return geo;
//   }, []);

//   /* ---------------- MATERIAL (SOFT + DARK) ---------------- */
//   const material = useMemo(
//     () =>
//       new THREE.MeshStandardMaterial({
//         metalness: 0.6,
//         roughness: 0.35,
//         transparent: true,
//         opacity: 0.55,          // 👈 big change
//         side: THREE.DoubleSide,
//         envMapIntensity: 0.6,   // 👈 softer reflections
//       }),
//     []
//   );

//   /* ---------------- INIT ---------------- */
//   useEffect(() => {
//     const inst = meshRef.current;
//     if (!inst) return;

//     transforms.forEach((t, i) => {
//       dummy.position.copy(t.position);
//       dummy.rotation.copy(t.rotation);
//       dummy.scale.setScalar(0);
//       dummy.updateMatrix();

//       inst.setMatrixAt(i, dummy.matrix);
//       inst.setColorAt(i, t.color); // 👈 per-shard color
//     });

//     inst.instanceMatrix.needsUpdate = true;
//     inst.instanceColor!.needsUpdate = true;
//   }, [transforms]);

//   /* ---------------- INTRO ---------------- */
//   useEffect(() => {
//     const inst = meshRef.current;
//     if (!inst) return;

//     const tl = gsap.timeline();

//     transforms.forEach((t, i) => {
//       const scaleObj = { s: 0 };

//       tl.to(
//         scaleObj,
//         {
//           s: 1,
//           duration: 1.4,
//           ease: "power3.out",
//           onUpdate: () => {
//             dummy.position.copy(t.position);
//             dummy.rotation.copy(t.rotation);
//             dummy.scale.setScalar(scaleObj.s);
//             dummy.updateMatrix();
//             inst.setMatrixAt(i, dummy.matrix);
//             inst.instanceMatrix.needsUpdate = true;
//           },
//         },
//         i * 0.008
//       );
//     });

//     return () => {
//       tl.kill();
//     };
//   }, [transforms]);

//   /* ---------------- AMBIENT LIFE ---------------- */
//   useFrame(({ clock }) => {
//     const inst = meshRef.current;
//     if (!inst) return;

//     const t = clock.getElapsedTime();

//     transforms.forEach((base, i) => {
//       dummy.position.copy(base.position);
//       dummy.rotation.copy(base.rotation);

//       dummy.position.y += Math.sin(t * 0.4 + i) * 0.001;
//       dummy.rotation.x += Math.sin(t * 0.3 + i) * 0.0006;
//       dummy.rotation.y += Math.cos(t * 0.25 + i) * 0.0006;

//       dummy.scale.setScalar(1);
//       dummy.updateMatrix();
//       inst.setMatrixAt(i, dummy.matrix);
//     });

//     inst.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <instancedMesh
//       ref={meshRef}
//       args={[geometry, material, SHARD_COUNT]}
//     />
//   );
// }

// /* ---------------- CANVAS ---------------- */
// export default function FracturedSphere() {
//   return (
//     <div className="fixed inset-0 pointer-events-none">
//       <Canvas camera={{ position: [0, 0, 8], fov: 38 }}>
//         <ambientLight intensity={0.15} />
//         <directionalLight intensity={1.2} position={[4, 5, 6]} />
//         <directionalLight intensity={0.4} position={[-5, -3, -4]} />

//         <Environment preset="studio" />
//         <FracturedSphereMesh />
//       </Canvas>
//     </div>
//   );
// }
