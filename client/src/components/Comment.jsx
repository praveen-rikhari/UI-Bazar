import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Picker } from '@emoji-mart/react';
import data from '@emoji-mart/data';

const Comment = ({ postId, addComment }) => {
  const [comment, setComment] = useState("");
  const [showPicker, setShowPicker] = useState(false); // State to toggle emoji picker
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/comment/', {
        userId: user.id,
        postId,
        comment,
        imgUrl: user.imageUrl,
        fullName: user.fullName,
      });
      if (response) {
        console.log(response.data);
        addComment(response.data); // Call the addComment function with the new comment
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setComment(prev => prev + emoji.native); 
    setShowPicker(false);
  };

  return (
    <>
      <div className="title">Comments</div>
      <hr />
      <div className="form-box">
        <form className="form-container" onSubmit={handleCommentSubmit}>
          <div className="user-pic">
            <img src={user.imageUrl} alt="User Image" />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Comment as ${user.fullName}...`}
            required
          />
          <button
            type="button"
            className="emoji-btn"
            onClick={() => setShowPicker(!showPicker)}
          >
            😀
          </button>
          {showPicker && (
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              style={{ position: 'absolute', bottom: '60px' }}
            />
          )}
          <button className="comment-btn" type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default Comment;
