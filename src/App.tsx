import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import 'normalize.css';

import useWinSize from './utils/useWinSize';
import heartData from './assets/heart.json';

import './style.css';

dayjs.extend(duration);

const musicUrl = 'http://music.163.com/song/media/outer/url?id=17746129.mp3';
const rainUrl = 'http://media.xxoojoke.com/tingyu/therain.m4a';
const music = new Audio(musicUrl);
const rain = new Audio(rainUrl);

const options = {
  loop: true,
  autoplay: false,
  animationData: heartData,
};

const App: React.FC = () => {
  const size = useWinSize();
  const [playing, setPlaying] = useState<boolean>(true);
  const [time, setTime] = useState<Date>(new Date());
  const [diff, setDiff] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);

  setInterval(() => setTime(new Date()), 1000);

  const togglePlaying = () => {
    if (playing) {
      setTimer(setInterval(() => setDiff((diff) => diff + 1000), 1000));
    } else {
      clearInterval(timer);
      setDiff(0);
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    if (playing) {
      music.pause();
      rain.pause();
    } else {
      music.play();
      rain.play();
    }
  }, [playing]);

  const timerText = dayjs(diff).subtract(8, 'h').format('HH:mm:ss');
  const now = dayjs(time).format('HH:mm:ss ddd. MMM.D');

  const lottieProps = {
    width: '4rem',
    height: '4rem',
    options: options,
    isPaused: playing,
  };

  return (
    <div
      style={{ ...size }}
      onClick={togglePlaying}
      className={`${!playing ? 'playing' : ''} bg`}
    >
      <div className='title'>
        <span>听雨</span>
        <Lottie {...lottieProps} style={{ margin: 0 }} />
      </div>
      <div className={`${!playing ? 'playing-timer' : ''} timer`}>
        {timerText}
      </div>
      <button
        onClick={togglePlaying}
        className={`${!playing ? 'playing-btn' : ''}`}
      />
      <div className={`${!playing ? 'playing' : ''} current-time`}>{now}</div>
    </div>
  );
};

export default App;
