import { useState } from "react"
import { motion } from "framer-motion"
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
      const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse"
      const formBody = new URLSearchParams({
        "entry.123456789": formData.name,    // Replace with your Name field's entry ID
        "entry.987654321": formData.email,   // Replace with your Email field's entry ID
        "entry.555555555": formData.message, // Replace with your Message field's entry ID
      })

      const response = await fetch(googleFormUrl, {
        method: "POST",
        body: formBody,
        mode: "no-cors", // Required because Google Forms doesn't send CORS headers
      })

      // Since mode is 'no-cors', we can't check response status, but submission usually succeeds if no errors
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-2">CONTACT</h2>
        <div className="w-16 h-1 bg-[#00D2D2]"></div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-white">Get In Touch</h3>
          <p className="text-gray-400">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my
            best to get back to you!
          </p>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300">
              <Mail className="text-[#00D2D2]" />
              <a href="mailto:shikhardwivedi2019@gmail.com" className="text-gray-300 hover:text-[#00D2D2]">
                shikhardwivedi2019@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300">
              <Phone className="text-[#00D2D2]" />
              <a href="tel:+917007118405" className="text-gray-300 hover:text-[#00D2D2]">
                +91 7007118405
              </a>
            </div>
            <div className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-300">
              <MapPin className="text-[#00D2D2]" />
              <span className="text-gray-300">Lucknow, India</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {submitStatus === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#112240] p-8 rounded-lg border border-green-500 flex flex-col items-center text-center"
            >
              <CheckCircle size={50} className="text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-300 mb-6">Your message has been sent successfully. I'll get back to you soon.</p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="px-6 py-3 bg-transparent border border-[#00D2D2] text-[#00D2D2] rounded hover:bg-[#00D2D2]/10 transition-all duration-300 text-sm font-medium"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : submitStatus === "error" ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#112240] p-8 rounded-lg border border-red-500 flex flex-col items-center text-center"
            >
              <AlertCircle size={50} className="text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Oops!</h3>
              <p className="text-gray-300 mb-6">Something went wrong. Please try again or contact me directly.</p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="px-6 py-3 bg-transparent border border-[#00D2D2] text-[#00D2D2] rounded hover:bg-[#00D2D2]/10 transition-all duration-300 text-sm font-medium"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#112240] border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded focus:outline-none focus:border-[#00D2D2] text-white transition-colors`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#112240] border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded focus:outline-none focus:border-[#00D2D2] text-white transition-colors`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-2 bg-[#112240] border ${
                    errors.message ? 'border-red-500' : 'border-gray-700'
                  } rounded focus:outline-none focus:border-[#00D2D2] text-white resize-none transition-colors`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-3 bg-transparent border border-[#00D2D2] text-[#00D2D2] rounded 
                  hover:bg-[#00D2D2]/10 transition-all duration-300 text-sm font-medium tracking-wider 
                  flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#00D2D2]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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