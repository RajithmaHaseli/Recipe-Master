import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import './CommentApp.css'; // Importing the renamed CSS file
import  Navbar from './Navbar'

function CommentApp() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [replyTexts, setReplyTexts] = useState({}); // Separate state for replies

  // Fetch comments from the backend
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle adding a comment
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post('http://localhost:8080/api/comments', {
          content: newComment,
          username: 'User', // Assuming username is hardcoded for now
          parent: null,
        });
        setComments(prevComments => [...prevComments, response.data]);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // Handle adding a reply to a comment
  const handleReplyTextChange = (commentId, text) => {
    setReplyTexts(prevState => ({ ...prevState, [commentId]: text }));
  };

  const handleAddReply = async (commentId) => {
    const text = replyTexts[commentId];
    if (text.trim()) {
      try {
        const response = await axios.post('http://localhost:8080/api/comments', {
          content: text,
          username: 'User', // Assuming username is hardcoded for now
          parent: { id: commentId },
        });
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === commentId
              ? { ...comment, replies: [...comment.replies, response.data] }
              : comment
          )
        );
        setReplyTexts(prevState => ({ ...prevState, [commentId]: '' }));
      } catch (error) {
        console.error('Error adding reply:', error);
      }
    }
  };

  // Handle editing a comment
  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    setEditingText(commentToEdit.content);
  };

  // Handle saving the edited comment
  const handleSaveEdit = async (commentId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/comments/${commentId}`, {
        content: editingText,
      });
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId ? { ...comment, content: response.data.content } : comment
        )
      );
      setEditingCommentId(null);
      setEditingText('');
    } catch (error) {
      console.error('Error saving comment edit:', error);
    }
  };

  // Handle deleting a comment or reply
  const handleDelete = async (commentId, replyId) => {
    try {
      if (replyId) {
        // Deleting a reply
        await axios.delete(`http://localhost:8080/api/comments/${replyId}`);
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === commentId
              ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
              : comment
          )
        );
      } else {
        // Deleting a comment
        await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment or reply:', error);
    }
  };

  return (
    <div className="AppRecipeUnique">
      <Navbar/>
      <h1>Problem Section</h1>

      {/* New comment input */}
      <input
        className="comment-input-box"
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Type in the input box and press Enter"
      />
      <button className="submit-comment-button" onClick={handleAddComment}>Add Comment</button>

      {/* Display comments */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-box">
            {/* Edit comment */}
            {editingCommentId === comment.id ? (
              <div>
                <input
                  className="edit-comment-input-box"
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button className="submit-comment-button" onClick={() => handleSaveEdit(comment.id)}>Save</button>
                <button className="submit-comment-button" onClick={() => setEditingCommentId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p className="comment-text">{comment.content}</p>
                <div className="comment-actions-container">
                  <button className="submit-comment-button" onClick={() => handleEditComment(comment.id)}>Edit</button>
                  <button className="submit-comment-button" onClick={() => handleDelete(comment.id)}>Delete</button>
                </div>
              </div>
            )}

            {/* Reply to comment */}
            <div>
              <input
                className="reply-input-box"
                type="text"
                value={replyTexts[comment.id] || ''}
                onChange={(e) => handleReplyTextChange(comment.id, e.target.value)}
                placeholder="Type your reply"
              />
              <button className="submit-comment-button" onClick={() => handleAddReply(comment.id)}>Reply</button>
            </div>

            {/* Display replies */}
            <div className="replies-container">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="reply-box">
                  <p className="reply-text">{reply.content}</p>
                  <div className="reply-actions-container">
                    <button className="submit-comment-button" onClick={() => handleDelete(comment.id, reply.id)}>Delete Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentApp;