// src/pages/Home.js
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Profiles from "./components/Profiles"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ParticleBackground from "./components/ParticleBackground"
import FuturisticScrollbar from "./components/FuturisticScrollBar"

export default function Home() {
  return (
    <main className="bg-[#0A192F] text-gray-300 min-h-screen">
      <ParticleBackground />
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Profiles />
        <Contact />
        <Footer />
      </div>
      <FuturisticScrollbar />
    </main>
  )
}