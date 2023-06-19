import React, { useEffect, useState } from 'react';
import { LookupEntryForm, LookupGolfer } from '@/components/lookup';
import { get, remove, set } from '@/components/common/utils';

export default function LookupPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    remove('last_name');
    remove('first_name');
    remove('state');
    remove('golfers');
  }, []);

  function handleClick() {
    if (get('last_name')) setLoading(false);
  }

  const handleInputChange = (field, event) => {
    const target = event.target;
    if (target) set(`${field}`, target.value.trim());
  };

  return (
    <>
      {loading ? (
        <LookupEntryForm
          handleInputChange={handleInputChange}
          handleClick={handleClick}
        />
      ) : (
        <>
          <LookupGolfer />
        </>
      )}
    </>
  );
}
