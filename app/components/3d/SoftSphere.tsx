// app/components/3d/SoftSphere.tsx
"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

/**
 * SoftSphere: a single R3F component that renders a glossy, noise-deformed,
 * mouse-reactive sphere — in the style of RESN's homepage sphere.
 *
 * Notes:
 * - Uses a custom ShaderMaterial (noise + simple lighting + rim)
 * - Mouse position is fed to the shader for parallax/distortion
 * - Time uniform drives smooth animation
 */

function SphereScene() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size, viewport } = useThree();

  // track mouse normalized [-1,1]
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // page coordinates -> normalized -1..1 (center)
      const x = (e.clientX / size.width) * 2 - 1;
      const y = -((e.clientY / size.height) * 2 - 1);
      mouse.current = [x, y];
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [size.width, size.height]);

  // GLSL noise (Ashima 3D simplex) + small FBM built-in
  const vertexShader = `
    // GLSL classic 3D simplex noise (Ashima) - compact version
    // (source: https://github.com/ashima/webgl-noise)
    vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      //  x0 = x0 - 0.0 + 0.0 * C
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0 + 3.0*C.x = -0.5
      // Permutations
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      // Gradients: 7x7 points over a cube, mapped onto an octahedron.
      float n_ = 1.0/7.0; // N=7
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  // mod(p,7*7)
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.y;
      vec4 y = y_ *ns.x + ns.y;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 g0 = vec3(a0.x, a0.y, h.x);
      vec3 g1 = vec3(a0.z, a0.w, h.y);
      vec3 g2 = vec3(a1.x, a1.y, h.z);
      vec3 g3 = vec3(a1.z, a1.w, h.w);
      // Normalize gradients
      vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
      g0 *= norm.x; g1 *= norm.y; g2 *= norm.z; g3 *= norm.w;
      // Mix contributions from the four corners
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(g0,x0), dot(g1,x1),
                                    dot(g2,x2), dot(g3,x3) ) );
    }

    // simple fbm (sum of octaves)
    float fbm(vec3 p){
      float value = 0.0;
      float amp = 0.5;
      float freq = 1.0;
      for(int i=0;i<4;i++){
        value += amp * snoise(p * freq);
        freq *= 2.0;
        amp *= 0.5;
      }
      return value;
    }

    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uDistort;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying float vNoise;

    void main(){
      vNormal = normal;
      vec3 pos = position;

      // sample noise in 3D: based on world position + time
      vec3 noisePos = (pos * 0.9) + vec3(uTime * 0.3);
      float n = fbm(noisePos);

      // mouse influence (move the center slightly)
      vec2 m = uMouse * 0.6;
      vec3 mouseOffset = vec3(m.x, m.y, 0.0);

      // distort along normal
      float displacement = n * uDistort + length(mouseOffset) * 0.4;
      vec3 displaced = pos + normal * displacement;

      vNoise = n;

      vec4 worldPosition = modelMatrix * vec4(displaced + mouseOffset, 1.0);
      vWorldPos = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `;

  // fragment shader: soft rim + glossy highlight
  const fragmentShader = `
    precision highp float;
    uniform vec3 uColor;
    uniform vec3 uLightPos;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying float vNoise;

    void main(){
      // Normalized normal
      vec3 N = normalize(normalMatrix * vNormal);
      vec3 L = normalize(uLightPos - vWorldPos);

      float diff = max(dot(N, L), 0.0);

      // rim effect
      float rim = 1.0 - max(dot(N, normalize(-vWorldPos)), 0.0);
      rim = smoothstep(0.2, 1.0, rim);

      // subtle iridescent tint from noise
      vec3 base = uColor * (0.35 + diff * 0.9);
      vec3 tint = mix(vec3(0.05,0.05,0.06), vec3(0.35,0.28,0.2), vNoise * 0.5);

      // specular-ish highlight
      float spec = pow(max(dot(reflect(-L, N), normalize(-vWorldPos)), 0.0), 24.0) * 1.6;

      vec3 color = base + tint * 0.6 + rim * 0.18 + spec * 0.8;

      // subtle vignette based on normal
      float fog = smoothstep(0.0, 1.0, length(vWorldPos) / 6.0);

      gl_FragColor = vec4(color * (1.0 - fog), 1.0);
    }
  `;

  // Create material once
  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uDistort: { value: 0.22 },
        uColor: { value: new THREE.Color(0.06, 0.06, 0.06) }, // dark/black shades
        uLightPos: { value: new THREE.Vector3(5, 5, 5) },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
    });
    return mat;
  }, [vertexShader, fragmentShader]);

  // keep ref to material for uniform updates
  useEffect(() => {
    materialRef.current = material;
  }, [material]);

  // animate time + mouse uniforms
  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;

    // lerp mouse for smoother motion
    const targetX = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uMouse.value.x,
      mouse.current[0],
      0.08
    );
    const targetY = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uMouse.value.y,
      mouse.current[1],
      0.08
    );
    materialRef.current.uniforms.uMouse.value.set(targetX, targetY);

    // small pulsating distortion
    materialRef.current.uniforms.uDistort.value =
      0.18 + Math.sin(clock.elapsedTime * 0.7) * 0.03;
  });

  // render the sphere
  return (
    <>
      <mesh ref={meshRef} material={material} rotation={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 6]} /> {/* high res: detail=6 */}
      </mesh>

      {/* environment to add nice reflections in the scene */}
      <Environment preset="studio" />
    </>
  );
}

export default function SoftSphere() {
  // wrapper canvas to make sure it covers hero area
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.25} />
        <directionalLight intensity={0.9} position={[5, 5, 5]} />
        <SphereScene />
      </Canvas>
    </div>
  );
}
