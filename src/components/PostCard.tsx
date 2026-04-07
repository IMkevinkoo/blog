import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Post } from '../types';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/post/${post.id}`} className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <Link to={`/post/${post.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs">
              {post.author.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>
          
          <Link 
            to={`/post/${post.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Read more
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
