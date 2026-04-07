import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../types';
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Post);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `posts/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this post?')) return;
    
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'posts', id));
      navigate('/');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to articles
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {(isAdmin || (user && user.uid === post.authorId)) && (
              <button 
                onClick={handleDelete}
                disabled={deleting}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                title="Delete Post"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="prose prose-indigo prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-2xl">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <footer className="mt-16 pt-12 border-t border-gray-200">
        <div className="bg-gray-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author}</h3>
            <p className="text-gray-600">
              Tech enthusiast and software engineer passionate about building modern web applications and sharing knowledge with the community.
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}
