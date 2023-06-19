import React from 'react';
import { useVisibilityChange } from 'use-visibility-change';
import { FetchData } from '@/components/fetchdata';
import { Table } from '@/components/lineup';
import { loginStale } from '@/components/common/utils';

export default function LineupPage() {
  const onShow = () => {
    window.location.reload();
  };
  useVisibilityChange({ onShow });

  if (loginStale()) return <FetchData />;

  return (
    <>
      <Table />
    </>
  );
}
