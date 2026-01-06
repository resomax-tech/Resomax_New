import './globals.css'
// import { Cormorant_Garamond, Playfair_Display, Manrope } from 'next/font/google'
import IntroController from './components/layouts/IntroController'
import localFont from "next/font/local";
import Footer from "./components/layouts/Footer";




const neueHaas = localFont({
  src: [
    {
      path: "./fonts/NeueHaasDisplay-Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/NeueHaasDisplay-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NeueHaasDisplay-Mediu.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-neuehaas",
  display: "swap",
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning   // 👈 THIS IS THE FIX
      className={`${neueHaas.variable}`}
    >
      <body className={`bg-white text-white`}>

        <IntroController />
        {children}
        <Footer/>
      </body>
    </html>
  )
}
