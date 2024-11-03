import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

function News() {
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState("india");
    const qin = useRef(null);

    const API = '6f2bbe65dc004d4bbdadde005c5bbb63';
    const url = ` https://newsapi.org/v2/everything?q=${query}&from=2024-11-03&sortBy=popularity&apiKey=${API}`;
   // https://newsapi.org/v2/everything?q=${query}&from=2024-11-03&sortBy=popularity&apiKey=${API}
    useEffect(() => {
        fetchData();
    }, [query]);

    async function fetchData() {
        try {
            const response = await axios.get(url);
            console.log("Response Data:", response.data); // Debugging log
            setNewsList(response.data.articles || []);
        } catch (error) {
            console.error("Error fetching data:", error.message); // Better error logging
            alert("An error occurred while fetching data. Please check the console for details.");
        }
    }

    // Unified function to handle category changes
    const handleCategoryClick = (category) => {
        setQuery(category);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = qin.current.value;
        setQuery(value);
    }

    return (
        <div className="news-app w-4/5 mx-auto my-10">
            <h1 className="font-mono text-3xl mb-8">Samachar</h1>

            <form onSubmit={handleSubmit} className="flex mb-4">
                <input className="qu w-full mb-5 p-5 text-lg border-2 border-black" type="text" ref={qin} />
                <button className="but mb-5 px-16 py-5 flex items-center text-white bg-black" type="submit">Submit</button>
            </form>

            <div className="mb-4 space-x-2">
                <button className="buttono mb-5 px-10 py-2 text-black mx-6 bg-green-200" onClick={() => handleCategoryClick("cricket")}>Cricket</button>
                <button className="buttono mb-5 px-10 py-2 text-black mx-6 bg-green-200" onClick={() => handleCategoryClick("football")}>Football</button>
                <button className="buttono mb-5 px-10 py-2 text-black mx-6 bg-green-200" onClick={() => handleCategoryClick("weather")}>Weather</button>
                <button className="buttono mb-5 px-10 py-2 text-black mx-6 bg-green-200" onClick={() => handleCategoryClick("science")}>Science</button>
                <button className="buttono mb-5 px-10 py-2 text-black mx-6 bg-green-200" onClick={() => handleCategoryClick("startup")}>Startup</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {newsList.map(news => (
                    <Card key={news.url + news.urlToImage} news={news} />
                ))}
            </div>
        </div>
    );
}

export default News;
