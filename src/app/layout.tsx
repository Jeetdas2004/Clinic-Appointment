import type { Metadata } from "next";
import "./globals.css";
import WrapComponent from "./components/wrapComponent";
import NavBar from "./components/NavBar";
import { NavItem } from "./components/NavBar";
import Footre from "./components/Footre";

export const metadata: Metadata = {
  title: "AY-Clinic | Smart Healthcare & Appointment Booking",
  description: "Book appointments with top medical specialists online quickly and easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen flex flex-col relative text-slate-800"
        suppressHydrationWarning
      >
        {/* Dynamic Healthcare Ambient Mesh & Pattern Background */}
        <div className="medical-mesh-bg" aria-hidden="true">
          <div className="medical-dot-pattern" />
          <div className="glow-orb-1" />
          <div className="glow-orb-2" />
          <div className="glow-orb-3" />
        </div>

        <WrapComponent>
          <NavBar>
            <NavItem item="Home" />
            <NavItem item="services" />
            <NavItem item="doctors" />
            <NavItem item="about" />
            <NavItem item="contact" />
          </NavBar>
          <main className="flex-1">
            {children}
          </main>
          <Footre />
        </WrapComponent>
      </body>
    </html>
  );
}



