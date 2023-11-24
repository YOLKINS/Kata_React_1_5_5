import React from 'react';

const AppTimer = (props) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleTimerClick = () => {
    const { isPaused, startTimer, pauseTimer, id } = props;
    if (isPaused) {
      startTimer(id);
    } else {
      pauseTimer(id);
    }
  };

  const { isPaused, seconds } = props;
  if (seconds === 0) {
    return (
      <span className="description">
        <button className={'icon-the-end'}></button>
        the end
      </span>
    );
  } else if (seconds === 'no') {
    return null;
  }
  return (
    <span className="description">
      <button className={`icon-play-pause ${isPaused ? 'play' : ''}`} onClick={handleTimerClick}></button>
      {formatTime(seconds)}
    </span>
  );
};

export default AppTimer;
