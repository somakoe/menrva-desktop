import { useNanoDatabase } from '@database/hooks/nano-hooks';
import React, { useEffect, useState } from 'react';

const { $ } = require('react-jquery-plugin');

const TypeAheadInput = ({
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
  const [options, setOptions] = useState([]);
  const [ref, setRef] = useState();

  useEffect(() => {
    const countries = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: 'https://pages.revox.io/json/countries-list.json',
    });

    if (ref !== null || ref !== undefined)
      $(ref).typeahead(null, {
        name: 'countries',
        source: countries,
        templates: {
          empty: [
            '<div class="empty-message p-2">',
            'No medicine matching name was found.',
            '</div>',
          ].join('\n'),
          // suggestion: Handlebars.compile('<div>{{value}}– {{year}}</div>'),
        },
      });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const handleSearch = async (query: string) => {
    const items = await database.query({
      selector: {
        name: { $regex: `.*${query}.*` },
      },
      limit: 5,
    });
    setOptions(items);
  };

  return (
    <>
      <div className="form-group form-group-default required typehead">
        <label className="">Drug</label>
        <input
          ref={setRef}
          name={name}
          className="typeahead form-control"
          type="text"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default TypeAheadInput;
