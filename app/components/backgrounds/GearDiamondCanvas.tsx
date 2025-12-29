"use client";

import { useEffect, useRef } from "react";

export default function GearDiamondCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let gearRotation = 0;
    let time = 0;

    // Diamond shards
    const diamonds = Array.from({ length: 10 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 30 + Math.random() * 60,
      size: 10 + Math.random() * 14,
      speed: 0.002 + Math.random() * 0.002,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 - 40);

      /* ======================
         BIG GEAR (main object)
      ====================== */
      gearRotation += 0.004;
      ctx.save();
      ctx.rotate(gearRotation);

      const gearGradient = ctx.createRadialGradient(0, 0, 40, 0, 0, 160);
      gearGradient.addColorStop(0, "rgba(220,220,220,0.9)");
      gearGradient.addColorStop(0.6, "rgba(170,170,170,0.6)");
      gearGradient.addColorStop(1, "rgba(120,120,120,0.35)");

      ctx.fillStyle = gearGradient;
      ctx.globalAlpha = 0.9;

      const teeth = 12;
      for (let i = 0; i < teeth; i++) {
        ctx.rotate((Math.PI * 2) / teeth);
        ctx.fillRect(120, -14, 36, 28);
      }

      // Gear center
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      /* ======================
         DIAMOND SHARDS
      ====================== */
      diamonds.forEach((d) => {
        d.angle += d.speed;
        const x = Math.cos(d.angle + time) * d.radius;
        const y = Math.sin(d.angle + time) * d.radius;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(d.angle);

        const diamondGradient = ctx.createLinearGradient(
          -d.size,
          -d.size,
          d.size,
          d.size
        );
        diamondGradient.addColorStop(0, "rgba(230,240,255,0.9)");
        diamondGradient.addColorStop(1, "rgba(160,190,210,0.4)");

        ctx.fillStyle = diamondGradient;
        ctx.beginPath();
        ctx.moveTo(0, -d.size);
        ctx.lineTo(d.size, 0);
        ctx.lineTo(0, d.size);
        ctx.lineTo(-d.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      ctx.restore();

      time += 0.005;
      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none bg-black"
    />
  );
}
