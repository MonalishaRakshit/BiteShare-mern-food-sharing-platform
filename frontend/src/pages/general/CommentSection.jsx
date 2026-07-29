import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

import "../../styles/CommentSection.css";

const CommentSection = ({ foodId, closeComments, refreshFoods }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Get comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/food/${foodId}/comments`,
        {
          withCredentials: true,
        },
      );

      console.log("Comments:", res.data);

      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Add comment
  const handleComment = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/api/food/comment",
        {
          foodId,
          text,
        },
        {
          withCredentials: true,
        },
      );

      setText("");

      await fetchComments();
      await refreshFoods();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-overlay">
      <div className="comment-box">
        <div className="comment-header">
          <h3>Comments</h3>

          <button onClick={closeComments}>
            <FaTimes />
          </button>
        </div>

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comment">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <div className="avatar">
                  {comment.user?.fullName?.charAt(0)}
                </div>

                <div>
                  <h4>{comment.user?.fullName}</h4>

                  <p>{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="comment-input">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={handleComment} disabled={loading}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
