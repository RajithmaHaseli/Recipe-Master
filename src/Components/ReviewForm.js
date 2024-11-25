import React, { useState, useEffect } from 'react';
import ReactStars from 'react-stars';
import axios from 'axios';
import './ReviewForm.css';


const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null); // For editing mode
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = 'currentUserName'; // Replace with the actual logged-in user's name

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/review');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      name,
      rating,
      comment,
      owner: currentUser,
    };

    if (isEdit) {
      try {
        await axios.put(`http://localhost:8080/api/review/${editingReviewId}`, reviewData);
        alert('Review updated successfully!');
        setEditingReviewId(null); // Exit editing mode
        setIsEdit(false);
        fetchReviews();
      } catch (error) {
        console.error('Error updating review:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:8080/api/review', reviewData);
        alert('Review submitted successfully!');
        fetchReviews();
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }

    setRating(0);
    setComment('');
    setName('');
  };

  const handleEdit = (review) => {
    setIsEdit(true);
    setName(review.name);
    setEditingReviewId(review.id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Review ID is undefined');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/review/${id}`);
      alert('Review deleted successfully!');
      fetchReviews(); // Refresh the reviews after deletion
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete the review. Please try again.');
    }
  };

  return (
    <div className="background">
  
      <div className="review-form">
        <h2>{editingReviewId ? 'Edit Review' : 'Leave a Review'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <ReactStars
              count={5}
              size={40}
              half={false}
              value={rating}
              onChange={setRating}
              color2={'#ffd700'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Your Review</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isEdit ? 'Update Review' : 'Submit Review'}</button>
        </form>

        <div className="reviews-list">
          <h3>Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <ReactStars
                  count={5}
                  size={24}
                  value={review.rating}
                  edit={false}
                  color2={'#ffd700'}
                />
                <p>{review.comment}</p>
                <h6>{review.name}</h6>
                <div className="Review-button">
                  <button onClick={() => handleEdit(review)}>Edit</button>
                  <button onClick={() => handleDelete(review.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
