import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">ModernBlog</span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Sharing insights, tutorials, and thoughts on the latest in web development and technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Guides</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ModernBlog. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
