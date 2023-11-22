import React, { Component } from 'react';

class AppTimer extends Component {
  formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  handleTimerClick = () => {
    const { isPaused, startTimer, pauseTimer, id } = this.props;
    if (isPaused) {
      startTimer(id);
    } else {
      pauseTimer(id);
    }
  };

  render() {
    const { isPaused, seconds } = this.props;
    if (seconds === 0) {
      return (
        <span className="description">
          <button className={'icon-the-end'}></button>
          the end
        </span>
      ); // Если таймер достиг нуля, можно возвращать null или другое значение
    } else if (seconds === 'no') {
      return null;
    }
    return (
      <span className="description">
        <button className={`icon-play-pause ${isPaused ? 'play' : ''}`} onClick={this.handleTimerClick}></button>
        {this.formatTime(seconds)}
      </span>
    );
  }
}

export default AppTimer;
