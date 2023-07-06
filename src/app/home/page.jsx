'use client';
import { get } from '@/components/common/utils'
export default function Page() {
  const ghinNumber = get('ghinNumber')
  return (
    <>
      <h1>Home Page</h1>
      <h2>GHIN Number: {ghinNumber}</h2>
    </>);
  
}
