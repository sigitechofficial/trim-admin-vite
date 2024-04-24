import React from "react";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";

const StarRating = ({ rating }) => {
  const MAX_RATING = 5;
  const filledStars = Math.floor(rating);
  const remainder = rating - filledStars;
  const emptyStars = MAX_RATING - filledStars - (remainder > 0 ? 1 : 0);

  // console.log("Remainder ", remainder);
  // console.log("Empty Stars", emptyStars);

  // const renderFilledStar = () => (
  //   <span className="text-2xl text-yellow-300">&#9733;</span>
  // );

  // const renderEmptyStar = () => (
  //   <span className="text-2xl text-yellow-400">&#9734;</span>
  // );

  return (
    <div className="flex ">
      {[...Array(filledStars)].map((_, index) => (
        <span key={index}>{<IoStar size={22} color="#FDE24F" />}</span>
      ))}
      {remainder <= 0.5 && remainder >= 0.1 ? (
        <span>{<IoStarHalf size={22} color="#FDE24F" />}</span>
      ) : remainder > 0.5 ? (
        <span>{<IoStar size={22} />}</span>
      ) : null}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="text-[#FDE24F]">
          {<IoStarOutline size={22} />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
