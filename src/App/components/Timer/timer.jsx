import React, { Component } from 'react';

class AppTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.timer || 0,
      isPaused: true,
      startTime: null,
    };
  }

  formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  startTimer = () => {
    const { seconds, isPaused, startTime } = this.state;

    if (seconds > 0 && !isPaused) {
      const currentTime = Date.now();
      const elapsed = startTime ? currentTime - startTime : 0;
      const remainingTime = Math.max(seconds * 1000 - elapsed, 0);

      this.setState({ seconds: Math.floor(remainingTime / 1000) }, () => {
        if (this.state.seconds > 0) {
          setTimeout(this.startTimer, 1000);
        }
      });
    } else {
      this.setState({ isPaused: true });
    }
  };

  onClickTogglePause = () => {
    this.setState(
      (prevState) => ({ isPaused: !prevState.isPaused }),
      () => {
        if (!this.state.isPaused && this.state.seconds > 0) {
          const currentTime = Date.now();
          this.setState({ startTime: currentTime }, this.startTimer);
        }
      }
    );
  };

  componentDidMount() {
    this.startTimer();
  }

  render() {
    const { isPaused, seconds } = this.state;

    if (seconds === 0) {
      return null; // Если таймер достиг нуля, можно возвращать null или другое значение
    }

    return (
      <span className="description">
        <button className={`icon-play-pause ${isPaused ? 'play' : ''}`} onClick={this.onClickTogglePause}></button>
        {this.formatTime(seconds)}
      </span>
    );
  }
}

export default AppTimer;
