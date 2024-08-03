"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import "./PostList.css";
import formatDateTime from '@/formatDateTime';

function PostList({ apiUrl, headingText }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(apiUrl);
                if (response) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error(`Error while fetching posts from ${apiUrl}:`, error);
            }
        };
        fetchPosts();
    }, [apiUrl])

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
            <div className="posts-container">
                {
                    posts.map((post, index) => (
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
                                <span className="user-name">User Name</span>
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
    )
}

export default PostList;