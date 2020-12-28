import { useCallback, useEffect, useState } from 'react';

const getWinSize = () => {
  const { clientWidth, clientHeight } = document.documentElement;
  const size = { width: clientWidth, height: clientHeight };
  return size;
};

const useWinSize = () => {
  const [size, setSize] = useState(getWinSize());
  const { addEventListener, removeEventListener } = window;
  const onResize = useCallback(() => setSize(getWinSize()), []);

  useEffect(() => {
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
};

export default useWinSize;
