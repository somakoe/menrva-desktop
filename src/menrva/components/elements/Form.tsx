import React, { useEffect, useState } from 'react';

const Form = ({
  children,
  onSubmit,
}: {
  children: JSX.Element;
  onSubmit: (data) => void;
}) => {
  const [form, setForm] = useState<HTMLFormElement | undefined>();
  useEffect(() => {
    if (form !== undefined && form !== null) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formdata = new FormData(this);
        onSubmit(formdata);
      });
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  return (
    <form method="post" ref={setForm}>
      {children}
    </form>
  );
};

export default Form;
