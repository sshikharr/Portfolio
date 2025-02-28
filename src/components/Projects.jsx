import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { projectsData } from "../data/data"

export default function Projects() {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const yBG = useTransform(scrollYProgress, [0, 1], [0, -60])

  // Close popup handler
  const handleClosePopup = () => setSelectedProject(null)

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 overflow-hidden">
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
          Selected Projects
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

      {/* Project Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group bg-[#112240]/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#00D2D2]/20 overflow-hidden"
            whileHover={{
              y: -8,
              boxShadow: "0 15px 30px rgba(0, 210, 210, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <motion.img
                src={project.image || "/placeholder.svg?height=200&width=400"}
                alt={project.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
              />
              <motion.div
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#00D2D2] flex items-center justify-center text-[#0A192F] font-semibold text-sm"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                {index + 1}
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#112240]/80 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p 
                className="text-gray-400 text-sm mb-2 line-clamp-2 cursor-pointer hover:text-[#00D2D2]"
                onClick={() => setSelectedProject(project)}
              >
                {project.description}
              </p>
              
              {/* Company Tag */}
              {project.company && (
                <motion.span
                  className="inline-block px-4 py-1.5 bg-[#0A192F]/90 text-sm rounded-full text-[#26A69A] border border-[#26A69A]/50 mb-4 font-medium tracking-wide"
                  whileHover={{
                    backgroundColor: "#26A69A",
                    color: "#0A192F",
                    borderColor: "#26A69A",
                    transition: { duration: 0.2 }
                  }}
                >
                  {project.company}
                </motion.span>
              )}

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
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
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.github && project.github !== null && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#00D2D2] transition-colors"
                    aria-label="GitHub Repository"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                  </motion.a>
                )}
                {project.live && project.live !== null && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#00D2D2] transition-colors"
                    aria-label="Live Demo"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4"
          onClick={handleClosePopup}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#112240] rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4">{selectedProject.title}</h3>
            <p className="text-gray-300 mb-4">{selectedProject.description}</p>
            {selectedProject.company && (
              <motion.span
                className="inline-block px-4 py-1.5 bg-[#0A192F]/90 text-sm rounded-full text-[#26A69A] border border-[#26A69A]/50 mb-4 font-medium tracking-wide"
              >
                {selectedProject.company}
              </motion.span>
            )}
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-[#00D2D2] text-[#0A192F] rounded-lg hover:bg-[#00D2D2]/80 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Subtle Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-12 text-center text-gray-400 text-sm"
      >
        Click descriptions for more details
      </motion.div>
    </section>
  )
}