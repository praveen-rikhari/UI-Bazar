import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const Comment = ({ postId, addComment }) => {
  const [comment, setComment] = useState("");
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
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
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

          <button className="comment-btn" type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default Comment;
