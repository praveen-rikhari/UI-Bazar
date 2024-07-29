"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./browse.css"
import Link from 'next/link';

const Browse = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/post');
                if (response) {
                    setPosts(response.data);
                }

            } catch (error) {
                console.error("Error while fetching posts: ", error);
            }
        }
        fetchPosts();
    }, [])

    const createIframeContent = (htmlCode, cssCode) => {
        const iframeDocument = `
            <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0; /* Remove default padding */
                        display: flex; /* Use flexbox for centering */
                        justify-content: center; /* Center horizontally */
                        align-items: center; /* Center vertically */
                        height: 100vh; /* Full viewport height */
                        background-color: #f0f0f0; /* Background color for better contrast */
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
            <h1>All Snippets</h1>
            <div className="posts-container">
                {
                    posts.map((post, index) => (
                        <div key={post._id} className='posts-card'>
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
                                <span className="user-name">User Name</span>
                                <div className="footer-right">
                                    <button className="like-btn">Like</button>
                                    <span className="date-update">Date</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Browse;
