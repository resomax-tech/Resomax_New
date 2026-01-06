"use client";

export default function ClientsSection() {
  return (
    <section className="w-full bg-[#f4f4f2] py-20">

      {/* TOP LINE + TITLE */}
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-black/30" />
          <p className="text-xs md:text-sm uppercase tracking-widest text-black/80 whitespace-nowrap">
            Clients we’ve worked with
          </p>
          <div className="flex-1 h-px bg-black/30" />
        </div>
      </div>

      {/* LOGOS */}
      <div className="mt-14 overflow-x-auto">
        <div className="flex items-center gap-20 px-6 md:px-24 min-w-max justify-center">
          <span className="text-3xl font-serif text-black/90">smile</span>
          <span className="text-3xl font-serif text-black/90">sigma</span>
          <span className="text-3xl font-serif text-black/90">callisto</span>
          <span className="text-3xl font-serif text-black/90">BRONX</span>
          <span className="text-3xl font-serif text-black/90">SIRIUS.</span>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="max-w-7xl mx-auto px-6 md:px-24 mt-16">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-black/30" />
          <p className="text-sm text-black/80 whitespace-nowrap">
            Trusted by <span className="font-medium">12,000+</span> Users
          </p>
          <div className="flex-1 h-px bg-black/30" />
        </div>
      </div>

    </section>
  );
}
