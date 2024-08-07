import axios from 'axios';
import { useState, useEffect } from 'react';
import './Like.css';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

function Like({ postId, userId, currentLikesCount }) {
    // const [likesCount, setLikesCount] = useState(currentLikesCount);
    // const [isLiked, setIsLiked] = useState(false);


    // Handling Likes
    const handleLike = async () => {
        try {
            const response = await axios.post('/api/like', { postId, userId });
            if (response) {
                // setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
                // setIsLiked(!isLiked);
                alert("like updated")
            }
        } catch (error) {
            console.error("Error while Liking/Unliking the post", error);
        }
    }


    return (
        <>
            {/* <button
                className={
                    `like-button ${isLiked ? 'liked' : ''}`
                }
                onClick={handleLike}
            >
                {
                    isLiked ? <FaHeart /> : <FaRegHeart />
                }
                {likesCount}
            </button> */}
            <button onClick={handleLike}>{currentLikesCount}</button>
        </>
    )
}

export default Like;