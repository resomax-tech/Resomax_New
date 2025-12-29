"use client";

export default function BulbSVG() {
  return (
    <svg
      viewBox="0 0 730 980"
      className="w-[520px]"
      style={{
        color: "rgba(210,210,210,0.45)", // GLASS GREY
        filter: `
          drop-shadow(0 0 30px rgba(220,220,220,0.35))
          drop-shadow(0 0 90px rgba(200,200,200,0.15))
        `,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bulb outline */}
      <path
        d="M365 40
           C190 40 70 190 70 360
           C70 510 160 610 200 660
           C225 690 230 740 230 780
           L230 830
           C230 880 260 920 300 940
           L430 940
           C470 920 500 880 500 830
           L500 780
           C500 740 505 690 530 660
           C570 610 660 510 660 360
           C660 190 540 40 365 40
           Z"
        fill="currentColor"
      />
    </svg>
  );
}
