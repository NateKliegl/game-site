import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let a = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let b = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [a, b];
};
const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: "RIGHT",
  snake: [
    [0, 0],
    [2, 0],
  ],
};

class HomePage extends Component {
  state = initialState;
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }
  componentDidUpdate() {
    this.checkIfOut();
    this.checkCollapsed();
    this.checkIfAte();
  }
  onkeydown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
    }
  };
  // implementing movement functionality
  moveSnake = () => {
    let dots = [...this.state.snake];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head); // allows for adding head
    dots.shift(); // allows to remove tail

    this.setState({
      snake: dots,
    });
  };
  //finding coordinates of the snake head is in the game area
  checkIfOut() {
    let head = this.state.snake[this.state.snake.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }
  checkCollapsed() {
    let snake = [...this.state.snake];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    });
  }
  checkIfAte() {
    let head = this.state.snake[this.state.snake.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates(),
      });
      this.increaseSnake();
      this.increaseSpeed();
    }
  }
  increaseSnake() {
    let newSnake = [...this.state.snake];
    newSnake.unshift([]);
    this.setState({
      snake: newSnake,
    });
  }
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }

  onGameOver() {
    alert(`Game over. You got ${this.state.snake.length}!`);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="area">
        <Snake snake={this.state.snake} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default HomePage;
