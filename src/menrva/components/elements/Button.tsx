import React, { useState, useEffect } from 'react';

const Button = ({
  onClick,
  children,
  ...rest
}: {
  onClick: EventListener;
  children: string;
}) => {
  const [node, setNode] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (node === null) return () => {};
    node.addEventListener('click', onClick);
    return () => {
      node.removeEventListener('click', onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, onClick]);

  return (
    <button
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={setNode}
      className="form-control"
    >
      {children}
    </button>
  );
};

const TransparentButton = ({
  classNames,
  onClick,
  children,
}: {
  classNames: string;
  onClick: EventListener;
  children: JSX.Element;
}) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (node === null) return () => {};
    node.addEventListener('click', onClick);
    return () => {
      node.removeEventListener('click', onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, onClick]);

  return (
    <div className={`p-0 m-0 ${classNames}`} ref={setNode}>
      {children}
    </div>
  );
};

const AnimatedButton = ({
  children,
  onClick,
  className,
}: {
  children: JSX.Element[];
  onClick: EventListener;
  className: string;
}) => {
  const [node, setNode] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (node === null) return () => {};
    node.addEventListener('click', onClick);
    return () => {
      node.removeEventListener('click', onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, onClick]);
  return (
    <button
      ref={setNode}
      aria-label=""
      // eslint-disable-next-line react/button-has-type
      type="button"
      className={`btn btn-primary btn-cons btn-animated from-left ${className}`}
    >
      <> {children}</>
    </button>
  );
};

export { Button, TransparentButton, AnimatedButton };
