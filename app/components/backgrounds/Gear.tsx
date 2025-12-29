"use client";

export default function Gear() {
  return (
    <img
      src="/gear.svg"
      alt="Gear"
      className="absolute w-[260px] animate-gear-spin"
      style={{
        color: "rgba(200,200,200,0.8)",
        filter: "drop-shadow(0 0 20px rgba(220,220,220,0.35))",
      }}
    />
  );
}
