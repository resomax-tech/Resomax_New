"use client";

import dynamic from "next/dynamic";

const BulbGearScene = dynamic(
  () => import("./BulbGearScene"),
  { ssr: false }
);

export default function BulbWrapper() {
  console.log("BulbWrapper mounted");
  return <BulbGearScene />;
}
