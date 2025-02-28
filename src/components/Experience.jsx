import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { experienceData } from "../data/data"
import { Briefcase, Calendar, Building, X } from "lucide-react"

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(null)
  const sectionRef = useRef(null)
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const yBG = useTransform(scrollYProgress, [0, 1], [0, -80])

  // Handle card interactions
  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y: yBG }}
        className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#112240] opacity-95 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00D2D2_0.3px,transparent_0.8px)] bg-[length:25px_25px] opacity-15" />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 mb-20 text-center"
      >
        <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
          Professional Experience
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

      {/* Card Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
        {experienceData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group"
          >
            {/* Collapsed Card */}
            <motion.div
              className={`relative bg-[#112240]/90 backdrop-blur-sm rounded-xl shadow-xl cursor-pointer border border-[#00D2D2]/20 ${
                activeIndex === index ? 'hidden' : 'block'
              }`}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px rgba(0, 210, 210, 0.15)"
              }}
              onClick={() => handleCardClick(index)}
              layoutId={`container-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D2D2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.role}</h3>
                    <div className="flex items-center space-x-2">
                      <Building size={16} className="text-[#00D2D2]" />
                      <h4 className="text-base text-gray-300">{item.company}</h4>
                    </div>
                  </div>
                  <motion.div 
                    className="py-1 px-3 rounded-full bg-[#0A192F] border border-[#00D2D2]/30 whitespace-nowrap"
                    whileHover={{ scale: 1.05, backgroundColor: "#00D2D2", color: "#0A192F" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} className="text-[#00D2D2]" />
                      <span className="text-[#00D2D2] text-xs font-medium">{item.period}</span>
                    </div>
                  </motion.div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.responsibilities[0]}</p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.slice(0, 3).map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="px-2 py-1 bg-[#1D2D50]/80 text-xs rounded-full text-gray-300 border border-[#00D2D2]/20"
                      whileHover={{ 
                        backgroundColor: "#00D2D2", 
                        color: "#0A192F",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-[#1D2D50]/80 text-xs rounded-full text-[#00D2D2] border border-[#00D2D2]/20">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Expanded View */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  layoutId={`container-${index}`}
                  className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onClick={(e) => e.target === e.currentTarget && handleCardClick(index)}
                >
                  <motion.div
                    className="relative bg-[#112240]/95 backdrop-blur-md rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-[#00D2D2]/25"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <motion.div 
                      className="p-6 bg-[#0A192F] border-b border-[#00D2D2]/20"
                      initial={{ y: -50 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <button
                        onClick={() => handleCardClick(index)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-[#00D2D2] transition-colors"
                      >
                        <X size={24} />
                      </button>
                      <motion.span 
                        className="inline-block px-4 py-1 rounded-full bg-[#00D2D2]/10 text-[#00D2D2] text-sm font-medium mb-3"
                        whileHover={{ backgroundColor: "#00D2D2", color: "#0A192F" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.period}
                      </motion.span>
                      <h3 className="text-2xl font-semibold text-white mb-2">{item.role}</h3>
                      <div className="flex items-center space-x-2">
                        <Building size={18} className="text-[#00D2D2]" />
                        <h4 className="text-lg text-gray-300">{item.company}</h4>
                      </div>
                    </motion.div>

                    {/* Scrollable Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                      <h5 className="text-lg font-medium text-[#00D2D2] mb-4">Key Responsibilities</h5>
                      <ul className="space-y-3 text-gray-300 text-sm">
                        {item.responsibilities.map((responsibility, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start"
                          >
                            <span className="text-[#00D2D2] mr-2 mt-1">•</span>
                            <span>{responsibility}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <h5 className="text-lg font-medium text-[#00D2D2] mt-6 mb-4">Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + idx * 0.03 }}
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: "#00D2D2", 
                              color: "#0A192F"
                            }}
                            className="px-3 py-1 bg-[#1D2D50]/80 text-sm rounded-full text-gray-200 border border-[#00D2D2]/30"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <motion.div
                      className="p-6 bg-[#0A192F]/50 border-t border-[#00D2D2]/20 grid grid-cols-2 gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-center">
                        <motion.div className="text-3xl font-semibold text-[#00D2D2]" whileHover={{ scale: 1.05 }}>
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </motion.div>
                        <div className="text-sm text-gray-400">Years</div>
                      </div>
                      <div className="text-center">
                        <motion.div className="text-3xl font-semibold text-[#00D2D2]" whileHover={{ scale: 1.05 }}>
                          {item.technologies.length}
                        </motion.div>
                        <div className="text-sm text-gray-400">Technologies</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Subtle Hint */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-12 text-center text-gray-400 text-sm"
      >
        Click a card to view details
      </motion.div>
    </section>
  )
}