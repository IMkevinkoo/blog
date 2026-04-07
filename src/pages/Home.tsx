import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import PostCard from '../components/PostCard';
import { motion } from 'motion/react';
import { Post } from '../types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      {featuredPost && (
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden bg-indigo-900 text-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-6 w-fit">
                  Featured Post
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {featuredPost.title}
                </h1>
                <p className="text-indigo-100 text-lg mb-8 max-w-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{featuredPost.author}</p>
                    <p className="text-sm text-indigo-300">{new Date(featuredPost.date).toLocaleDateString()} · {featuredPost.readTime}</p>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-transparent to-transparent lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-transparent lg:hidden block" />
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
          {posts.length === 0 && (
            <p className="text-gray-500">No posts found. Be the first to write one!</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-24 rounded-3xl bg-gray-900 p-8 sm:p-12 lg:p-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay in the loop</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive the latest updates, tutorials, and insights directly in your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
