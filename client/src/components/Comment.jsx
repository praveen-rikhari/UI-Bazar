import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const Comment = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/comment/', { userId: user.id, postId, comment });
      if (response) {
        console.log(response.data);
        setComment("")
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment..."
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comment;
