import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';

const SingleBlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Post non trovato</h1>
        <button 
          onClick={() => navigate('/blog')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Torna al Blog
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/blog')}
        className="mb-8 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Torna al Blog
      </button>
      
      <article className="max-w-3xl mx-auto">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="text-gray-600 mb-8">
          {new Date(post.date).toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default SingleBlogPage; 