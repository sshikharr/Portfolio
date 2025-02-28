import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { Github, Linkedin, Twitter, Dribbble } from "lucide-react"; // Import required icons

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const shapeRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // 3D effect with Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a geometric shape - using #00D2D2 color
    const geometry = new THREE.IcosahedronGeometry(isMobile ? 3 : 5, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00d2d2,
      wireframe: true,
      emissive: 0x00d2d2,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add ambient and point lights - using #00D2D2 color
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d2d2, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 10;

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate the shape
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;

      // Make it respond to mouse movement
      sphere.rotation.x += (mousePosition.y * 0.002 - sphere.rotation.x) * 0.1;
      sphere.rotation.y += (mousePosition.x * 0.002 - sphere.rotation.y) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      scene.remove(sphere);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isMobile, mousePosition]); // Added mousePosition to dependencies

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        setMousePosition({
          x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(e.touches[0].clientY / window.innerHeight) * 2 + 1,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A192F]"
    >
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-5 mix-blend-overlay z-10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#0A192F]/90 to-[#112240] opacity-90 z-20" />

      {/* Content Container */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - Takes up 3 columns on large screens */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "80px" }}
                transition={{ duration: 1.2 }}
                className="h-px bg-gradient-to-r from-[#00D2D2] to-transparent"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#00D2D2] font-mono tracking-wider text-sm"
              >
                FULL STACK DEVELOPER
              </motion.p>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight"
            >
              <span className="relative inline-block">
                SHIKHAR
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
                  className="absolute -bottom-2 left-0 h-1 bg-[#00D2D2]"
                />
              </span>
              <br />
              <span className="text-gray-400">DWIVEDI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-gray-400 max-w-lg text-lg leading-relaxed"
            >
              Creating immersive digital experiences at the intersection of
              design and code. Specializing in cutting-edge web technologies and
              interactive interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-transparent overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-[#00D2D2] font-medium tracking-wider text-sm transition-colors duration-500 group-hover:text-[#0A192F]">
                  VIEW MY WORK
                </span>
                <span className="absolute inset-0 border border-[#00D2D2] group-hover:bg-[#00D2D2] transition-all duration-300 ease-out"></span>
                <span className="absolute inset-0 flex justify-end items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative px-8 py-4 bg-transparent overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-gray-400 font-medium tracking-wider text-sm transition-colors duration-500 group-hover:text-white">
                  CONTACT ME
                </span>
                <span className="absolute inset-0 border border-gray-800 group-hover:border-gray-500 transition-all duration-300 ease-out"></span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex gap-6 pt-8"
            >
              {[
                {
                  platform: "github",
                  url: "https://github.com/sshikharr",
                  icon: <Github className="w-5 h-5" />,
                },
                {
                  platform: "linkedin",
                  url: "https://www.linkedin.com/in/shikhar-dwivedi2003/",
                  icon: <Linkedin className="w-5 h-5" />,
                }
              ].map((platform, index) => (
                <motion.a
                  key={platform.platform}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="text-gray-500 hover:text-[#00D2D2] transition-colors duration-300"
                  aria-label={platform.platform}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Glowing Profile Area - Takes up 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:col-span-2 flex justify-center items-center relative"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[#00D2D2]/30 bg-[#112240]/50 backdrop-blur-sm"
              initial={{ scale: 0.8, rotateX: 10, rotateY: 10 }}
              animate={{ scale: 1, rotateX: 0, rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
              whileHover={{ rotateX: -5, rotateY: 5, transition: { duration: 0.3 } }}
            >
              <img
                src="https://res.cloudinary.com/dlzkqms1c/image/upload/v1740672318/yjzxh8th4gx2klzguhzn.jpg"
                alt="Shikhar Dwivedi"
                className="object-cover w-full h-full"
              />
              {/* Glowing Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#00D2D2]/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 0.5 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#00D2D2]/10"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1.15, opacity: 0.3 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
            {/* Subtle Glow Effect */}
            <motion.div
              className="absolute w-[120%] h-[120%] rounded-full bg-[#00D2D2]/10 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1.5, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}