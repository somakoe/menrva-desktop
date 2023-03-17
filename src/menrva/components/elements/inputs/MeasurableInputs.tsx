import { TransparentButton } from '@components/elements/Button';
import { useNanoDatabase } from '@database/hooks/nano-hooks';
import React, { useEffect, useState } from 'react';

const { $ } = require('react-jquery-plugin');

const MeasurableInput = ({
  name,
  dbName,
  placeholder,
}: {
  name: string;
  dbName: string;
  placeholder: string;
}) => {
  const database = useNanoDatabase(dbName);
  const [isLoading, setIsLoading] = useState(false);
  const [inputRef, setInputRef] = useState();
  const [unitRef, setUnitRef] = useState();

  useEffect(() => {
    const countries = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: 'https://pages.revox.io/json/countries-list.json',
    });

    if (inputRef !== null || inputRef !== undefined) $(inputRef).autoNumeric();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef]);

  return (
    <div className="form-group form-group-default required">
      <label className="w-100 inline-block">
        {placeholder} (
        <TransparentButton
          classNames="inline"
          onClick={() => {
            console.log('Clicked!');
          }}
        >
          <span className="btn btn-link no-top-padding no-bottom-padding fs-13 bold m-l-5 m-r-5">
            mg
          </span>
        </TransparentButton>
        )
      </label>
      <input
        name={name}
        ref={setInputRef}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default MeasurableInput;
