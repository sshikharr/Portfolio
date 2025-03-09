import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { experienceData } from "../data/data";
import { Briefcase, Calendar, Building, X, ChevronRight, Award } from "lucide-react";

export default function ProfessionalExperience() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const sectionRef = useRef(null);
  
  // Subtle background parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yBG = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Handle card interactions
  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    if (activeIndex !== index) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Responsive adjustments
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation variants with more subtle effects
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -6,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Professional gradient background */}
      <motion.div 
        style={{ y: yBG }}
        className="absolute inset-0 bg-gradient-to-b from-[#0A192F] to-[#112240] z-0"
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      {/* Professional Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 mb-14 md:mb-20 text-center px-4 md:px-6"
      >
        <div className="inline-flex items-center justify-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0A192F] border border-[#64FFDA]">
            <Briefcase size={20} className="text-[#64FFDA]" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Professional Experience
        </h2>
        
        <p className="text-gray-300 max-w-2xl mx-auto text-base">
          A detailed overview of my career path and key achievements
        </p>
        
        <div className="w-20 h-px bg-[#64FFDA]/50 mx-auto mt-6" />
      </motion.div>

      {/* Timeline connector - vertical line */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#64FFDA]/40 to-transparent h-full top-0 hidden lg:block" />
      </div>

      {/* Experience Cards with Alternating Layout */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {experienceData.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true, margin: "-50px" }}
            className={`mb-8 md:mb-12 px-4 md:px-6 ${
              index % 2 === 0 ? 'lg:ml-auto lg:mr-8 lg:pr-8 lg:pl-0' : 'lg:mr-auto lg:ml-8 lg:pl-8 lg:pr-0'
            } lg:w-5/12 relative`}
          >
            {/* Timeline node for desktop */}
            <div className={`absolute top-8 hidden lg:block ${
              index % 2 === 0 ? '-left-3' : '-right-3'
            }`}>
              <div className="w-6 h-6 rounded-full bg-[#0A192F] border border-[#64FFDA] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#64FFDA]" />
              </div>
              <div className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-px bg-[#64FFDA]/60 ${
                index % 2 === 0 ? 'right-full' : 'left-full'
              }`} />
            </div>
            
            {/* Experience Card */}
            <motion.div
              className="relative bg-[#112240] rounded-lg shadow-md border border-[#64FFDA]/10 overflow-hidden cursor-pointer"
              whileHover="hover"
              variants={cardVariants}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Card header */}
              <div className="border-b border-[#64FFDA]/10 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium text-[#64FFDA] bg-[#64FFDA]/10 mb-3">
                      {item.period}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.role}</h3>
                    <div className="flex items-center space-x-2">
                      <Building size={14} className="text-[#64FFDA]" />
                      <h4 className="text-sm text-gray-300">{item.company}</h4>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 rounded bg-[#64FFDA]/10 flex items-center justify-center">
                    <ChevronRight size={16} className="text-[#64FFDA]" />
                  </div>
                </div>
              </div>
              
              {/* Card content preview */}
              <div className="p-5">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.responsibilities[0]}</p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.slice(0, isMobile ? 3 : 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#0A192F]/80 text-xs rounded text-gray-300 border border-[#64FFDA]/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > (isMobile ? 3 : 4) && (
                    <span className="px-2 py-1 bg-[#0A192F]/80 text-xs rounded text-[#64FFDA]">
                      +{item.technologies.length - (isMobile ? 3 : 4)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.target === e.currentTarget && handleCardClick(activeIndex)}
          >
            <motion.div
              className="relative bg-[#112240] rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-lg border border-[#64FFDA]/20"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Header */}
              <div className="p-5 md:p-6 bg-[#0A192F] border-b border-[#64FFDA]/20 relative">
                <button
                  onClick={() => handleCardClick(activeIndex)}
                  className="absolute top-4 right-4 text-white hover:text-[#64FFDA] transition-colors p-2"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 rounded text-xs font-medium text-[#64FFDA] bg-[#64FFDA]/10">
                    {experienceData[activeIndex].period}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{experienceData[activeIndex].role}</h3>
                <div className="flex items-center space-x-2">
                  <Building size={16} className="text-[#64FFDA]" />
                  <h4 className="text-base md:text-lg text-gray-300">{experienceData[activeIndex].company}</h4>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-5 md:p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div>
                  <h5 className="text-base font-medium text-[#64FFDA] mb-4 flex items-center">
                    <span className="w-5 h-px bg-[#64FFDA] mr-3"></span>
                    Responsibilities
                  </h5>
                  <ul className="space-y-3 text-gray-200 text-sm ml-5">
                    {experienceData[activeIndex].responsibilities.map((responsibility, idx) => (
                      <li
                        key={idx}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 mr-3 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#64FFDA]"></div>
                        </div>
                        <span className="flex-1">{responsibility}</span>
                      </li>
                    ))}
                  </ul>

                  <h5 className="text-base font-medium text-[#64FFDA] mt-6 mb-4 flex items-center">
                    <span className="w-5 h-px bg-[#64FFDA] mr-3"></span>
                    Technologies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {experienceData[activeIndex].technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#0A192F] text-xs rounded text-gray-300 border border-[#64FFDA]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 md:p-5 bg-[#0A192F] border-t border-[#64FFDA]/20 flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  Position {activeIndex + 1} of {experienceData.length}
                </div>
                <div className="flex items-center space-x-1 text-xs text-[#64FFDA]">
                  <Award size={14} className="text-[#64FFDA]" />
                  <span>{experienceData[activeIndex].technologies.length} skills</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle interaction hint */}
      <div className="relative z-10 mt-6 text-center">
        <span className="text-gray-400 text-xs">
          Click on a card to view details
        </span>
      </div>
    </section>
  );
}