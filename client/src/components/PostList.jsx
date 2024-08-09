"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import "./PostList.css";
import formatDateTime from '@/formatDateTime';
import Like from './Like';
import { useUser } from '@clerk/nextjs';

function PostList({ apiUrl, headingText }) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); // Add this line
    const [selectedCategory, setSelectedCategory] = useState(''); // Add this line
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState(false);

    const { isLoaded, isSignedIn, user } = useUser();

    // Normalization function
    function normalizeResponseData(data) {
        return data.map(item => {
            // Check if the post data is wrapped in a "postId" property
            if (item.postId) {
                return {
                    _id: item.postId._id,
                    userId: item.postId.userId,
                    userFullName: item.postId.userFullName,
                    name: item.postId.name,
                    description: item.postId.description,
                    category: item.postId.category,
                    htmlCode: item.postId.htmlCode,
                    cssCode: item.postId.cssCode,
                    likesCount: item.postId.likesCount,
                    createdAt: item.postId.createdAt,
                    updatedAt: item.postId.updatedAt,
                    __v: item.postId.__v
                };
            } else {
                // Already in the desired format
                return item;
            }
        });
    }

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(apiUrl);
                if (response) {
                    const normalizedData = normalizeResponseData(response.data);
                    setPosts(normalizedData);
                    setFilteredPosts(normalizedData); // Initially, show all posts
                }
            } catch (error) {
                console.error(`Error while fetching posts from ${apiUrl}:`, error);
            }
        };
        fetchPosts();
    }, [apiUrl]);


    // function to save fav post
    const handleSaveToFav = async (postId) => {
        try {
            const response = await axios.post('/api/fav', {
                userId: user.id,
                postId
            });

            if (response) {
                console.log("Post saved Successfully", response);
                setMessage(true);
                setTimeout(() => {
                    setMessage(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error while saving Post", response);
        }
    }

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

            {
                message && (
                    <div className="success-message">
                        Snippet saved Successfully! View it on your profile page.
                    </div>
                )
            }

            <div className="posts-container">
                {
                    filteredPosts.map((post, index) => (
                        <div key={post._id} className="posts-card">
                            <div className="card-header">
                                <span className="ship-name">{post.name}</span>
                                <Link
                                    href={`/snip-page/${post._id}`}
                                    className="get-code-btn">
                                    Get Code
                                </Link>
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

                                    <Like
                                        postId={post._id}
                                        userId={user?.id}
                                        currentLikesCount={post.likesCount}

                                    />

                                    <span className="date-update">
                                        {formatDateTime(post.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <br />
                            <button onClick={() => handleSaveToFav(post._id)}>
                                Save to Fav
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default PostList;
