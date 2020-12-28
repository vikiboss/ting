import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import 'normalize.css';

import useWinSize from './utils/useWinSize';
import heartData from './assets/heart.json';

import './style.css';

dayjs.extend(duration);

const url = 'http://music.163.com/song/media/outer/url?id=17746129.mp3';
const audio = new Audio(url);

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
  const [timer, setTimer] = useState<any>(0);

  setInterval(() => setTime(new Date()), 1000);

  const togglePlaying = () => {
    if (playing) {
      setTimer(setInterval(() => setDiff((diff) => diff + 1000), 1000));
    } else {
      setDiff(0);
      clearInterval(timer);
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    playing ? audio.pause() : audio.play();
  }, [playing]);

  const timerText = dayjs(diff).subtract(8, 'h').format('HH:mm:ss');
  const btnText = playing ? '播放' : '暂停';
  const now = dayjs(time).format('HH:mm:ss ddd. MMM.D');

  const lottieProps = {
    width: '16rem',
    height: '16rem',
    options: options,
    isPaused: playing,
  };

  return (
    <div
      style={{ ...size }}
      onClick={togglePlaying}
      className={`bg ${!playing ? 'playing-bg' : ''}`}
    >
      <div className='title'>
        <span>听雨</span>
        <Lottie {...lottieProps} style={{ margin: 0 }} />
      </div>
      <div className={`timer ${!playing ? 'playing-timer playing' : ''}`}>
        {timerText}
      </div>
      <button onClick={togglePlaying}>{btnText}</button>
      <div className={`current-time ${!playing ? 'playing' : ''}`}>{now}</div>
    </div>
  );
};

export default App;
