"use client";

import { useEffect, useRef } from "react";

export default function GearCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        let rotation = 0;
        let speed = 0.002; // 👈 increased so you can SEE it

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);

            rotation += speed;
            speed += (Math.random() - 0.5) * 0.0001;

            ctx.rotate(rotation);

            // 🔥 Make it visible first
            const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
            gradient.addColorStop(0, "rgba(220,220,220,0.9)");
            gradient.addColorStop(0.5, "rgba(180,180,180,0.6)");
            gradient.addColorStop(1, "rgba(120,120,120,0.3)");

            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.6;

            ctx.filter = "blur(0.3px)";


            for (let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI / 4);
                ctx.fillRect(70, -14, 36, 28);
            }

            ctx.beginPath();
            ctx.arc(0, 0, 22, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            requestAnimationFrame(draw);
        };

        draw();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
