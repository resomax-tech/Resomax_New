"use client";

import { ReactNode } from "react";
import FracturedSphere from "./FracturedSphere";

type Props = {
  children: ReactNode;
};

export default function BackgroundProvider({ children }: Props) {
  return (
    <>
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <FracturedSphere />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
