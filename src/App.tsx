import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import 'normalize.css';

import useWinSize from './utils/useWinSize';
import heartData from './assets/heart.json';

import './style.css';

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
  const [mode, setMode] = useState('quiet');

  const togglePlaying = () => setPlaying(!playing);

  const quiet = () => {
    setMode('quiet');
    audio.src = 'http://music.163.com/song/media/outer/url?id=17746129.mp3';
    setPlaying(true);
  };

  const high = () => {
    setMode('high');
    audio.src = 'http://music.163.com/song/media/outer/url?id=1805842261.mp3';
    setPlaying(true);
  };

  useEffect(() => {
    playing ? audio.pause() : audio.play();
  }, [playing]);

  const MODE_MAP = { quiet: ['#fff', '#333'], high: ['#333', '#fff'] };

  const lottieProps = {
    width: 240,
    height: 240,
    options: options,
    isPaused: playing,
  };

  const wrapperStyles = {
    ...size,
    color: MODE_MAP[mode][0],
    backgroundColor: MODE_MAP[mode][1],
    transition: 'all 0.3s',
  };

  return (
    <div id='wrapper' style={{ ...wrapperStyles }} onClick={togglePlaying}>
      <h1>听雨</h1>
      <Lottie {...lottieProps} />
      <div id='btn-wrapper'>
        <button onClick={quiet}>安静</button>
        <button onClick={high}>嗨起</button>
      </div>
    </div>
  );
};

export default App;
