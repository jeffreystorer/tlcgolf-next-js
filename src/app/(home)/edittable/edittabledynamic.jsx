'use client';
import dynamic from 'next/dynamic';
const EditTable = dynamic(() => import('@/app/(home)/edittable/edittable'), {
  ssr: false,
});

export function EditTableDynamic({ sheets }) {
  return <EditTable sheets={sheets} />;
}
