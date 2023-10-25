import { useState } from "react";
import PropTypes from "prop-types";

const starRatingContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1",
};

const starsContainerStyle = {
  display: "flex",
  padding: "1rem",
  alignItems: "center",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  messages: PropTypes.array,
  color: PropTypes.string,
  size: PropTypes.number,
  onSetMovieRate: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  messages = [],
  color = "#ffd43b",
  size = 18,
  onSetUserRate,
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleSetRating(rate) {
    setRating(rate);

    if (!onSetUserRate) return;
    onSetUserRate(rate);
  }

  function handleHover(rate) {
    setTempRating(rate);
  }

  function handleLeave() {
    setTempRating(0);
  }

  return (
    <div style={starRatingContainerStyle}>
      <Stars>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onSetRating={() => handleSetRating(i + 1)}
            onHover={() => handleHover(i + 1)}
            onLeave={() => handleLeave()}
            filled={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </Stars>

      <Result
        rating={rating}
        tempRating={tempRating}
        size={size}
        color={color}
        messages={messages}
        maxRating={maxRating}
      />
    </div>
  );
}

function Stars({ children }) {
  return <div style={starsContainerStyle}>{children}</div>;
}

function Star({ onSetRating, filled, size, color, onHover, onLeave }) {
  const starStyle = {
    display: "block",
    width: `${size}px`,
    height: `${size}px`,

    cursor: "pointer",
  };

  return (
    <svg
      role="button"
      style={starStyle}
      onClick={onSetRating}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? `${color}` : "none"}
      stroke={color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Result({ rating, size, color, tempRating, messages, maxRating }) {
  const resultStyle = {
    fontSize: `${size}px`,
    color: color,
    margin: "0",
  };

  return (
    <p style={resultStyle}>
      {messages.length === maxRating
        ? messages[tempRating ? tempRating - 1 : rating - 1]
        : tempRating || rating || ""}
    </p>
  );
}
