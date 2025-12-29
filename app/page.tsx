import GlassBulb from "@/app/components/backgrounds/GlassBulb";
import Gear from "@/app/components/backgrounds/Gear";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <GlassBulb />

      <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
        <Gear />
      </div>

      <section className="relative z-30 flex items-center justify-center h-screen">
        <h1 className="text-5xl font-light">
          Digital for the Future
        </h1>
      </section>

    </main>
  );
}
