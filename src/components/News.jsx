import React, { useRef, useEffect, useState } from 'react';
import Card from './Card';

function News() {
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState("bitcoin"); // Default query can be modified as needed
    const qin = useRef(null);

    // Fetch news articles based on the query
    const fetchNews = async () => {
        try {
            const params = new URLSearchParams({
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                page: 1, // You can implement pagination as needed
            });

            const response = await fetch(`https://newsapi.org/v2/everything?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': '6f2bbe65dc004d4bbdadde005c5bbb63', // Replace with your actual API key
                },
            });

            const data = await response.json();
            
            if (data.articles) {
                setNewsList(data.articles);
            } else {
                setNewsList([]); // Clear newsList if no articles are returned
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            alert("An error occurred: " + error.message);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [query]);

    // Handle input changes
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = qin.current.value;
        setQuery(value);
    };

    return (
        <div className='news-app w-4/5 mx-auto my-10'>
            <h1 className="font-mono text-3xl mb-5">Samachar</h1>

            <form onSubmit={handleSubmit} className="flex mb-5">
                <input className='qu w-full p-4 border-2 border-black rounded' type="text" ref={qin} />
                <button className='but p-4 text-white bg-gray-800 rounded ml-2' type="submit">Submit</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {newsList.map(news => (
                    <Card key={news.url} news={news} />
                ))}
            </div>
        </div>
    );
}

export default News;
