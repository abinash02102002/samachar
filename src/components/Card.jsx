import React from 'react';

function Card({ news }) {
  const placeholderImage = 'https://via.placeholder.com/150'; // Fallback image URL

  return (
    <div className="news-card p-5 border-2 border-gray-500 rounded shadow">
      <img 
        src={news.urlToImage || placeholderImage} 
        alt={news.title || "News article"} 
        className="w-full h-48 object-cover mb-5" 
      />
      <h2 className="font-semibold text-lg mb-2">{news.title}</h2>
      <p className="text-gray-800 mb-5">{news.description}</p>
      <p className="text-gray-600 mb-5 text-sm">Publish date: {new Date(news.publishedAt).toLocaleString()}</p>
      <button
        className="morebtn block w-4/5 mx-auto py-3 text-white bg-black rounded-full hover:bg-gray-800 transition"
        onClick={() => { window.open(news.url, '_blank'); }} // Open link in a new tab
        aria-label={`Read more about ${news.title}`} // Accessibility
      >
        Read More
      </button>
    </div>
  );
}

export default Card;

