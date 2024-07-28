"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Browse = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/getPosts');
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
    return (
        <div className="home-page">
            <h1>All Snippets</h1>
            <div className="posts-container">
                {
                    posts.map((post) => (
                        <div key={post._id} className='post-card'>
                            <h2>
                                {post.name}
                            </h2>
                            <p>
                                {post.description}
                            </p>
                            <div className="code-preview" dangerouslySetInnerHTML={{ __html: post.htmlCode }} />
                            <style>{post.cssCode}</style>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Browse;