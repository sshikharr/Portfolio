import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skillsData } from "../data/data";

const SkillCard = ({ category, skills, index, isActive, onClick }) => {
  const gradientColors = [
    ["#4A00E0", "#8E2DE2"],
    ["#00D2D2", "#2E86C1"],
    ["#FF416C", "#FF4B2B"],
    ["#00C9FF", "#92FE9D"],
    ["#8A2387", "#E94057"],
    ["#1A2980", "#26D0CE"]
  ];
  
  const colorSet = gradientColors[index % gradientColors.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden rounded-xl backdrop-blur-md bg-[#112240]/90 shadow-xl border border-[#00D2D2]/20 transition-all duration-300`}
      whileHover={{
        y: -8,
        boxShadow: "0 15px 30px rgba(0, 210, 210, 0.15)",
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
    >
      {/* Subtle glow effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, ${colorSet[0]}30 0%, transparent 70%)`,
          mixBlendMode: "overlay"
        }}
      />
      
      {/* Category Header */}
      <div className="p-5 border-b border-[#00D2D2]/10">
        <motion.h3 
          className="text-lg font-semibold text-white relative"
          style={{
            background: `linear-gradient(to right, ${colorSet[0]}, ${colorSet[1]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {category}
          <motion.span
            className="absolute top-0 right-0 w-2 h-2 bg-[#00D2D2] rounded-full"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.h3>
      </div>
      
      {/* Skills List */}
      <ul className="p-5 space-y-2 min-h-40">
        {skills.map((skill, idx) => (
          <motion.li
            key={idx}
            className="flex items-center text-gray-300 text-sm group-hover:text-white transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
          >
            <span 
              className="w-1 h-1 rounded-full mr-2"
              style={{ backgroundColor: colorSet[0] }}
            />
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

// Simplified Particle Canvas
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    const particlesArray = [];
    const numberOfParticles = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(0, 210, 210, ${Math.random() * 0.2 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => window.removeEventListener('resize', setCanvasDimensions);
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />;
};

export default function Skills() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yBG = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const handleCardClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div
        style={{ y: yBG }}
        className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#112240] opacity-95 z-0"
      >
        <ParticleCanvas />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 mb-20 text-center px-4"
      >
        <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
          Professional Competencies
          <motion.span
            className="inline-block w-2 h-2 bg-[#00D2D2] rounded-full ml-2 align-super"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </h2>
        <motion.div
          className="w-20 h-1 bg-[#00D2D2] mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Skills Grid */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <SkillCard
              key={index}
              category={category}
              skills={skills}
              index={index}
              isActive={activeCategory === category}
              onClick={() => handleCardClick(category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}