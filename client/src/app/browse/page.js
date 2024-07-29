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
                    console.log(response.data);
                    setPosts(response.data);
                }

            } catch (error) {
                console.error("Error while fetching posts : ", error);
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
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            height: 100vh;
                                            margin: 0;
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
                    posts.map((post, index) => {
                        return (
                            <div key={post._id} className='post-card'>
                                <h3>
                                    {post.name}
                                </h3>

                                <Link href={`/snip-page/${post._id}`}>go to snip-page</Link>

                                <iframe
                                    srcDoc={createIframeContent(post.htmlCode, post.cssCode)}
                                    className="code-preview"
                                    title={`Post ${index}`}
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Browse;