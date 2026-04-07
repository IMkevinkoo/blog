import { motion } from 'motion/react';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About ModernBlog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are a team of developers and writers dedicated to bringing you the best content in technology and software development.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
            alt="Our Workspace"
            className="rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to empower developers by providing high-quality, accessible, and up-to-date information on the latest web technologies. We believe in the power of community and open-source software.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're a seasoned professional or just starting your journey in tech, we aim to provide content that inspires and educates.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="#" className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-indigo-600 hover:text-white transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-indigo-600 hover:text-white transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-indigo-600 hover:text-white transition-all">
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-6">Want to contribute?</h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg">
          We're always looking for passionate writers and developers to share their expertise. If you have a story to tell, we'd love to hear from you.
        </p>
        <a 
          href="mailto:hello@modernblog.com" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
        >
          <Mail size={20} />
          Get in touch
        </a>
      </motion.section>
    </div>
  );
}
