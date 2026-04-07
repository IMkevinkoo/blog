import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, uploadImage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { Save, X, Image as ImageIcon, Clock, Tag, Upload, Loader2 } from 'lucide-react';

export default function CreatePost() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingContent, setUploadingContent] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'React',
    image: '',
    readTime: '5 min read'
  });

  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>Only administrators can create posts.</p>
      </div>
    );
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, image: url });
    } catch (error) {
      console.error("Cover upload failed:", error);
      alert("Failed to upload cover image.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingContent(true);
    try {
      const url = await uploadImage(file);
      const markdownImage = `\n![${file.name}](${url})\n`;
      
      const textarea = contentRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = 
          formData.content.substring(0, start) + 
          markdownImage + 
          formData.content.substring(end);
        
        setFormData({ ...formData, content: newContent });
      } else {
        setFormData({ ...formData, content: formData.content + markdownImage });
      }
    } catch (error) {
      console.error("Content image upload failed:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingContent(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        author: user.displayName || 'Anonymous',
        authorId: user.uid,
        date: new Date().toISOString(),
        image: formData.image || `https://picsum.photos/seed/${Math.random()}/800/400`
      };

      const path = 'posts';
      await addDoc(collection(db, path), postData);
      navigate('/');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <button 
            onClick={() => navigate('/')}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Tag size={16} /> Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option>React</option>
                <option>CSS</option>
                <option>JavaScript</option>
                <option>Trends</option>
                <option>Tutorial</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} /> Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon size={16} /> Cover Image
            </label>
            <div className="flex gap-4">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <label className="cursor-pointer px-4 py-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all flex items-center gap-2 whitespace-nowrap">
                {uploadingCover ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                <span>Upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover} />
              </label>
            </div>
            {formData.image && (
              <div className="mt-2 relative rounded-xl overflow-hidden h-32 w-full max-w-md border border-gray-100">
                <img src={formData.image} alt="Cover preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Excerpt</label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A short summary of your post"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Content (Markdown)</label>
              <label className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-all">
                {uploadingContent ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                <span>Insert Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleContentImageUpload} disabled={uploadingContent} />
              </label>
            </div>
            <textarea
              required
              rows={12}
              ref={contentRef}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="# Your post content starts here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg shadow-indigo-200"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save size={20} />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
