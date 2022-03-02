import React from 'react';
import {useState} from 'react';

const useBoolean = (init = false) => {
  const [isTrue, setIsTrue] = useState(init);

  const onPress = () => {
    setIsTrue(prev => !prev);
  };
  return [isTrue, onPress];
};

export default useBoolean;
