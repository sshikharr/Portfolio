import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  // Add the missing sectionRef and parallax effect
  const sectionRef = useRef(null)
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const yBG = useTransform(scrollYProgress, [0, 1], [0, -80])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = "Please enter a valid email"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // Using Formspree for form submission
      const response = await fetch("https://formspree.io/f/manewzal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background matching other sections */}
      <motion.div 
        style={{ y: yBG }}
        className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#112240] opacity-95 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00D2D2_0.3px,transparent_0.8px)] bg-[length:25px_25px] opacity-15" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 mb-20 text-center"
      >
        <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
          Get In Touch
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

      <div className="relative z-10 grid md:grid-cols-2 gap-10 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-gray-400 leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my
            best to get back to you!
          </p>

          <div className="space-y-4 mt-8">
            <motion.div 
              className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 rounded-full bg-[#112240] flex items-center justify-center">
                <Mail className="text-[#00D2D2] h-5 w-5" />
              </div>
              <a href="mailto:shikhardwivedi2019@gmail.com" className="text-gray-300 hover:text-[#00D2D2]">
                shikhardwivedi2019@gmail.com
              </a>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 rounded-full bg-[#112240] flex items-center justify-center">
                <Phone className="text-[#00D2D2] h-5 w-5" />
              </div>
              <a href="tel:+917007118405" className="text-gray-300 hover:text-[#00D2D2]">
                +91 7007118405
              </a>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 rounded-full bg-[#112240] flex items-center justify-center">
                <MapPin className="text-[#00D2D2] h-5 w-5" />
              </div>
              <span className="text-gray-300">Lucknow, India</span>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-[#112240]/80 backdrop-blur-sm rounded-xl border border-[#00D2D2]/20"
          >
            <h4 className="text-[#00D2D2] font-medium mb-2">Looking for opportunities</h4>
            <p className="text-gray-400 text-sm">Open to full-time positions, freelance projects, and creative collaborations.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#112240]/80 backdrop-blur-sm rounded-xl border border-[#00D2D2]/20 p-6"
        >
          {submitStatus === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle size={30} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-300 mb-6">Your message has been sent successfully. I'll get back to you soon.</p>
              <motion.button
                onClick={() => setSubmitStatus(null)}
                className="px-6 py-3 bg-transparent border border-[#00D2D2] text-[#00D2D2] rounded-lg hover:bg-[#00D2D2]/10 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Another Message
              </motion.button>
            </motion.div>
          ) : submitStatus === "error" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                <AlertCircle size={30} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Oops!</h3>
              <p className="text-gray-300 mb-6">Something went wrong. Please try again or contact me directly.</p>
              <motion.button
                onClick={() => setSubmitStatus(null)}
                className="px-6 py-3 bg-transparent border border-[#00D2D2] text-[#00D2D2] rounded-lg hover:bg-[#00D2D2]/10 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#0A192F]/80 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg focus:outline-none focus:border-[#00D2D2] text-white transition-colors`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#0A192F]/80 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg focus:outline-none focus:border-[#00D2D2] text-white transition-colors`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-[#0A192F]/80 border ${
                    errors.message ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg focus:outline-none focus:border-[#00D2D2] text-white resize-none transition-colors`}
                  placeholder="Your message here..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </motion.div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(0, 210, 210, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`w-full px-6 py-4 mt-4 bg-transparent border border-[#00D2D2] text-[#00D2D2] rounded-lg 
                  transition-all duration-300 text-sm font-bold tracking-wider 
                  flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-[#00D2D2]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}