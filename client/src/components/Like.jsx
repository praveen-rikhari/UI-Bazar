import axios from 'axios';
import { useState, useEffect } from 'react'

function Like({ postId, userId, currentLikesCount }) {
    const [likesCount, setLikesCount] = useState(currentLikesCount);
    const [isLiked, setIsLiked] = useState(false);


    // Handling Likes
    const handleLike = async () => {
        try {
            const response = await axios.post('/api/like', { postId, userId });
            if (response) {
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error("Error while Liking/Unliking the post", error);
        }
    }


    return (
        <>
            <button onClick={handleLike}>
                Likes: {likesCount}
            </button>
        </>
    )
}

export default Like;