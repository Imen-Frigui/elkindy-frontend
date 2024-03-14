import React, { useEffect, useRef } from 'react';
import Tagify from '@yaireo/tagify';

const TagInput = ({ name, placeholder, value, onChange }) => {
  const inputRef = useRef(null);
  const tagifyRef = useRef(null);

  useEffect(() => {
    tagifyRef.current = new Tagify(inputRef.current, {
      whitelist: ['foo', 'bar', 'and baz', 0, 1, 2],
      callbacks: {
        add: onChangeTags,
        remove: onChangeTags,
      },
    });

    return () => {
      tagifyRef.current.destroy();
    };
  }, []);

  const onChangeTags = () => {
    if (tagifyRef.current) {
      const tags = tagifyRef.current.value.map((tag) => tag.value);
      onChange(name, tags);
    }
  };

  return <input ref={inputRef} name={name} placeholder={placeholder} defaultValue={value.join(',')} />;
};

export default TagInput;
