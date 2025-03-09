import { motion } from "framer-motion"
import { Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-8 border-t border-gray-800"
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Shikhar Dwivedi. All rights reserved.</p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          
          <a
            href="https://www.linkedin.com/in/shikhar-dwivedi2003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00D2D2] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/sshikharr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00D2D2] transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

