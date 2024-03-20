import React from "react";

const StarRating = ({ rating }) => {
  const MAX_RATING = 5; // Maximum rating
  const filledStars = Math.floor(rating); // Number of filled stars
  const remainder = rating - filledStars; // Remaining fraction for half star
  const emptyStars = MAX_RATING - filledStars - (remainder >= 0.5 ? 1 : 0); // Number of empty stars

  const renderFilledStar = () => <span className="text-2xl">&#9733;</span>;

  const renderEmptyStar = () => <span className="text-2xl">&#9734;</span>; // Unicode character for empty star

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
