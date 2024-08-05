"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import "./PostList.css";
import formatDateTime from '@/formatDateTime';

function PostList({ apiUrl, headingText }) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); // Add this line
    const [selectedCategory, setSelectedCategory] = useState(''); // Add this line
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(apiUrl);
                if (response) {
                    setPosts(response.data);
                    setFilteredPosts(response.data); // Initially, show all posts
                }
            } catch (error) {
                console.error(`Error while fetching posts from ${apiUrl}:`, error);
            }
        };
        fetchPosts();
    }, [apiUrl]);

    useEffect(() => {
        if (selectedCategory === '') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.category === selectedCategory));
        }
    }, [selectedCategory, posts]); // Add this useEffect

    useEffect(() => {
        const normalizedSearchQuery = searchQuery.replace(/\s+/g, '').toLowerCase(); // Normalize search query by removing spaces
    
        const filteredPosts = posts.filter(post => {
            const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
            const matchesName = post.name.replace(/\s+/g, '').toLowerCase().includes(normalizedSearchQuery); // Normalize post name
            const matchesUserName = post.userFullName ? post.userFullName.replace(/\s+/g, '').toLowerCase().includes(normalizedSearchQuery) : false; // Normalize user name
            
            return matchesCategory && (matchesName || matchesUserName); // Return true if matches
        });
    
        setFilteredPosts(filteredPosts); // Update filteredPosts state
    }, [selectedCategory, searchQuery, posts]); // Updated dependencies
    

    const createIframeContent = (htmlCode, cssCode) => {
        const iframeDocument = `
          <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f0f0f0;
              }
              ${cssCode}
            </style>
          </head>
          <body>
            ${htmlCode}
          </body>
          </html>
        `;
        return iframeDocument;
    };

    return (
        <div className="browse-page">
            <h1>{headingText}</h1>
            <div className="filter-container">
            <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Button">Button</option>
                <option value="CheckBox">CheckBox</option>
                <option value="Toggle Switches">Toggle Switches</option>
                <option value="Card">Card</option>
                <option value="Input">Input</option>
                <option value="Loader">Loader</option>
                <option value="Forms">Forms</option>
                <option value="Other">Other</option>
            </select>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
        </div>
            <div className="posts-container">
                {
                    filteredPosts.map((post, index) => ( // Change posts to filteredPosts
                        <div key={post._id} className="posts-card">
                            <div className="card-header">
                                <span className="ship-name">{post.name}</span>
                                <Link href={`/snip-page/${post._id}`} className="get-code-btn">Get Code</Link>
                            </div>
                            <div className="card-body">
                                <iframe
                                    srcDoc={createIframeContent(post.htmlCode, post.cssCode)}
                                    className="code-preview"
                                    title={`Post ${index}`}
                                    sandbox="allow-scripts allow-same-origin allow-forms"
                                />
                            </div>
                            <div className="card-footer">
                                <span className="user-name">{post.userFullName}</span>
                                <div className="footer-right">
                                    <button className="like-btn">Like</button>
                                    <span className="date-update">
                                        {formatDateTime(post.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default PostList;
