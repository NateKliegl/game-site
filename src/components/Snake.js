import React from "react";

export default (props) => {
  return (
    <div>
      {props.snake.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return <div className="snake" key={i} style={style}></div>;
      })}
    </div>
  );
};

// the movement of the snake is by increasing the x value by 2 and also by deleting the tail
// if move down you increase the y value by 2
// if snake goes to left decrease x value by 2
