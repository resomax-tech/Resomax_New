// // app/components/layout/Intro3DScene.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import gsap from "gsap";

type Props = {
  onLogoCentered: () => void;
  startTexts: boolean;
  onTextsComplete: () => void;
};

function LogoPlane({ onCentered }: { onCentered: () => void }) {
  const tex = useLoader(THREE.TextureLoader, "/logo.png");
  const ref = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current.position, { y: 3, x: 0 });
    gsap.set(ref.current.scale, { x: 0.35, y: 0.35, z: 0.35 });

    gsap.to(ref.current.position, {
      y: 1.2,
      duration: 1.0,
      ease: "power3.out",
      onComplete: onCentered,
    });
  }, []);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshStandardMaterial map={tex} transparent />
    </mesh>
  );
}

function ResoMax3D({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const resoRef = useRef<any>(null);
  const maxRef = useRef<any>(null);

  useEffect(() => {
    if (!active) return;

    // Both start in the center, slightly lower and invisible
    gsap.set(resoRef.current.position, { x: -0.55, y: -0.3, z: 0 });
    gsap.set(maxRef.current.position, { x: 0.55, y: -0.3, z: 0 });

    gsap.set([resoRef.current.material, maxRef.current.material], {
      opacity: 0,
    });

    const tl = gsap.timeline({ ease: "power3.out", onComplete });

    // Fade + Slide Up at the same time
    tl.to(
      resoRef.current.position,
      {
        x:-0.6,
        y: 0,
        duration: 1.2,
      },
      0
    );

    tl.to(
      maxRef.current.position,
      { 
        x:0.6,
        y: 0,
        duration: 1.2,
      },
      0
    );

    tl.to(
      [resoRef.current.material, maxRef.current.material],
      {
        opacity: 1,
        duration: 1.0,
      },
      0.2
    );
  }, [active, onComplete]);

  return (
    <>
      {/* RESO */}
      <Text
        ref={resoRef}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        RESO
        <meshStandardMaterial color="white" transparent opacity={0} />
      </Text>

      {/* MAX */}
      <Text
        ref={maxRef}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        MAX
        <meshStandardMaterial color="#FFAA17" transparent opacity={0} />
      </Text>
    </>
  );
}


export default function Intro3DScene({
  onLogoCentered,
  startTexts,
  onTextsComplete,
}: Props) {
  return (
    <div className="fixed inset-0 z-[9998] bg-black">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.8} position={[5, 5, 5]} />

        {/* REMOVE SUSPENSE — prevents double render */}
        <LogoPlane onCentered={onLogoCentered} />
        <ResoMax3D active={startTexts} onComplete={onTextsComplete} />
      </Canvas>
    </div>
  );
}
// app/components/layout/Intro3DScene.tsx

// "use client";

// import React, { useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";
// import { useLoader } from "@react-three/fiber";
// import gsap from "gsap";

// type Props = {
//   onLogoCentered: () => void;
//   onTextsComplete: () => void;
// };

// function LogoPlane({ onCentered, onDone }: any) {
//   const tex = useLoader(THREE.TextureLoader, "/logo.png");
//   const ref = useRef<THREE.Mesh | null>(null);

//   useEffect(() => {
//     if (!ref.current) return;

//     // Start above
//     gsap.set(ref.current.position, { x: 0, y: 3, z: 0 });
//     gsap.set(ref.current.scale, { x: 0.7, y: 0.7, z: 0.7 });

//     // Step 1 → Move to center
//     gsap.to(ref.current.position, {
//       y: 0.6,
//       duration: 1,
//       ease: "power3.out",
//       onComplete: onCentered,
//     });

//     // Step 2 → After pause, move to top-left corner
//     gsap.to(ref.current.position, {
//       x: -3.2,
//       y: 2.2,
//       duration: 1.2,
//       ease: "power3.inOut",
//       delay: 1.2,
//       onComplete: onDone,
//     });

//     // Shrink to small size while going to corner
//     gsap.to(ref.current.scale, {
//       x: 0.25,
//       y: 0.25,
//       z: 0.25,
//       duration: 1.2,
//       ease: "power3.inOut",
//       delay: 1.2,
//     });

//   }, []);

//   return (
//     <mesh ref={ref}>
//       <planeGeometry args={[1.5, 1.5]} />
//       <meshStandardMaterial map={tex} transparent />
//     </mesh>
//   );
// }

// export default function Intro3DScene({
//   onLogoCentered,
//   onTextsComplete,
// }: Props) {
//   return (
//     <div className="fixed inset-0 z-[9998] bg-black">
//       <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
//         <color attach="background" args={["#000"]} />
//         <ambientLight intensity={0.8} />
//         <directionalLight intensity={1} position={[5, 5, 5]} />

//         <LogoPlane
//           onCentered={onLogoCentered}
//           onDone={onTextsComplete}
//         />
//       </Canvas>
//     </div>
//   );
// }
