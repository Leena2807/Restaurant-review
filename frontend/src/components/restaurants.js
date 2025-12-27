import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams, useNavigate } from "react-router-dom";

const Restaurant = props => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="fade-in">
      {restaurant ? (
        <div>
          <div className="restaurant-header">
            <h2 className="restaurant-title">{restaurant.name}</h2>
            <div className="restaurant-meta">
              <span className="cuisine-badge">{restaurant.cuisine}</span>
              <span className="restaurant-address">
                {restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
              </span>
            </div>
          </div>
          
          <div className="action-bar">
            <Link to={"/restaurants/" + id + "/review"} className="btn-primary">
              ✍️ Add Review
            </Link>
          </div>

          <div className="reviews-section">
            <h3 className="reviews-title">Reviews</h3>
            
            {restaurant.reviews.length > 0 ? (
              <div className="reviews-grid">
                {restaurant.reviews.map((review, index) => {
                  return (
                    <div key={index} className="card review-card">
                      <div className="card-body">
                        <p className="review-text">{review.text}</p>
                        <div className="review-meta">
                          <span className="review-user">👤 {review.name}</span>
                          <span className="review-date">📅 {new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        {props.user && props.user.id === review.user_id &&
                          <div className="review-actions">
                            <button 
                              onClick={() => deleteReview(review._id, index)} 
                              className="btn-danger"
                            >
              🗑️ Delete
                            </button>
                            <Link 
                              to={"/restaurants/" + id + "/review"} 
                              state={{ currentReview: review }} 
                              className="btn-accent"
                            >
              ✏️ Edit
                            </Link>
                          </div>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-reviews">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loading-state">
          <p>Loading restaurant details...</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;