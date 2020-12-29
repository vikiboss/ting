import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import dayjs from 'dayjs';
import 'normalize.css';

import useWinSize from './utils/useWinSize';
import heartData from './assets/heart.json';

import './style.css';

const musicUrl = 'http://music.163.com/song/media/outer/url?id=17746129.mp3';
const rainUrl = 'http://media.xxoojoke.com/tingyu/therain.m4a';

const music = new Audio(musicUrl);
const rain = new Audio(rainUrl);
music.loop = true;
rain.loop = true;

const play = () => {
  music.play();
  rain.play();
};

const pause = () => {
  music.pause();
  rain.pause();
};

const options = {
  loop: true,
  autoplay: false,
  animationData: heartData,
};

const App: React.FC = () => {
  const size = useWinSize();
  const [time, setTime] = useState<Date>(new Date());
  const [playing, setPlaying] = useState<boolean>(true);

  const togglePlaying = () => setPlaying(!playing);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  useEffect(() => (playing ? pause() : play()), [playing]);

  const now = dayjs(time).format('HH:mm:ss ddd. M/D/YYYY');
  const playClass = playing ? '' : 'playing';

  const lottieProps = {
    width: '4rem',
    height: '4rem',
    options: options,
    isPaused: playing,
  };

  const wraperProps = {
    style: { ...size },
    onClick: togglePlaying,
    className: `${playClass} bg flex`,
  };

  return (
    <div {...wraperProps}>
      <div className='title flex'>
        <span>听雨</span>
        <Lottie {...lottieProps} style={{ margin: 0 }} />
      </div>
      <button onClick={togglePlaying} className={`${playClass} btn`} />
      <div className={`${playClass} now`}>{now}</div>
    </div>
  );
};

export default App;
