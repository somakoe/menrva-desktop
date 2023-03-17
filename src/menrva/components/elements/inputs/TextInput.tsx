/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, ...rest }) => {
  const [node, setNode] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    if (node === null) return () => {};
    const handleInput = (e) => {
      const { value } = e.target;
      onChange(value);
    };
    node.addEventListener('input', handleInput);
    return () => {
      node.removeEventListener('input', handleInput);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input {...rest} ref={setNode} />;
};

export default TextInput;
