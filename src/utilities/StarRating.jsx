import React from "react";

const StarRating = ({ rating }) => {
  const MAX_RATING = 5;
  const filledStars = Math.floor(rating);
  const remainder = rating - filledStars;
  const emptyStars = MAX_RATING - filledStars - (remainder >= 0.5 ? 1 : 0);

  const renderFilledStar = () => (
    <span className="text-2xl text-yellow-300">&#9733;</span>
  );

  const renderEmptyStar = () => (
    <span className="text-2xl text-yellow-400">&#9734;</span>
  );

  return (
    <div>
      {[...Array(filledStars)].map((_, index) => (
        <span key={index}>{renderFilledStar()}</span>
      ))}
      {remainder >= 0.5 && <span>{renderFilledStar()}</span>}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index}>{renderEmptyStar()}</span>
      ))}
    </div>
  );
};

export default StarRating;
