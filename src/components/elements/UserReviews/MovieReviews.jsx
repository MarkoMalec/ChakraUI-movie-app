import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../fetch';
import { useLocation } from 'react-router-dom';
import ReviewText from './ReviewText';

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState();
  const currentLocation = useLocation();

  useEffect(() => {
    const endpoint = `${API_URL}${currentLocation.pathname}/reviews?api_key=${API_KEY}&page=1`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setMovieReviews(result.results);
        console.log(result);
      });
  }, [currentLocation.pathname]);

  return (
    <>
      {movieReviews?.length
        ? movieReviews.slice(0, 4).map(review => (
            <div key={review.id} className="review-box">
              <div className="review-user-info">
                <img
                  src={
                    review.author_details.avatar_path?.includes('gravatar')
                      ? `https://www.gravatar.com/avatar/${review.author_details.avatar_path.slice(
                          33,
                          200
                        )}`
                      : `${IMAGE_BASE_URL}w154${review.author_details.avatar_path}`
                  }
                  alt={review.author.name}
                />
                <h3>{review.author_details.username}</h3>
                <span>{review.created_at.slice(0, 10)}</span>
              </div>
              <div className="review-text">
                <ReviewText text={review.content} />
              </div>
            </div>
          ))
        : 'No reviews available for this movie.'}
    </>
  );
};

export default MovieReviews;
