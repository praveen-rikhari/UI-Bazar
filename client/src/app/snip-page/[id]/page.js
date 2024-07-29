"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import './SnipPage.css'

const SnipPage = ({ params }) => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/post/${params.id}`);
                if (response) {
                    setPosts(response.data);
                    console.log(response.data);
                }

            } catch (error) {
                console.error("Error while fetching single post : ", error);
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

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    }

    return (
        <div className="singlePost-page">
            <div className="post-container">
                {
                    <div className='post-card'>
                        <h3>
                            {posts.name}
                        </h3>
                        <iframe
                            srcDoc={createIframeContent(posts.htmlCode, posts.cssCode)}
                            className="code-preview"
                            title={`Post ${posts._id}`}
                            sandbox="allow-scripts allow-same-origin"
                        />
                        <div className='htmlCode-box'>
                            <code>
                                {posts.htmlCode}
                            </code>
                            <button className="copy-button" onClick={() => copyToClipboard(posts.htmlCode)}>
                                Copy HTML
                            </button>
                        </div>
                        <div className='cssCode-box'>
                            <code>
                                {posts.cssCode}
                            </code>
                            <button className="copy-button" onClick={() => copyToClipboard(posts.cssCode)}>
                                Copy CSS
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SnipPage;