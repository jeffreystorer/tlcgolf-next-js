import React from 'react';
import { useVisibilityChange } from 'use-visibility-change';
import { Table } from '@/components/export';
import { FetchData } from '@/components/fetchdata';
import { loginStale } from '@/components/common/utils';

export default function ExportPage() {
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
