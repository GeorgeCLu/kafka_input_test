/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';

interface LongTextProps {
  text: string;
}

const LongText = (props: LongTextProps) => {
  const { text } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div style={{ width: windowWidth * 0.75, tableLayout: 'auto', wordWrap: 'break-word' }}>
      <br />
      {text}
    </div>
  );
};
export default LongText;
