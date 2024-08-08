import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const Comment = ({ postId, addComment }) => {
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
        addComment(response.data);
        setComment("");
        setShowEmojiPicker(false);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setComment((currentCommentText) => currentCommentText + emoji.native);
  };

  return (
    <>
      <div className="title">Comments</div>
      <hr />
      <div className="form-box">
        <form className="form-container" onSubmit={handleCommentSubmit}>
          <div className="user-pic">
            <img
              src={user.imageUrl}
              alt="User Image"
            />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Comment as ${user.fullName}...`}
            required
          />
          <div className="emoji-picker-container">
            <button
              type="button"
              className="emoji-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😀
            </button>
            {
              showEmojiPicker && (
                <div className="emoji-picker">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                  />
                </div>
              )
            }
          </div>
          <button className="comment-btn" type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default Comment;
