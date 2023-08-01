'use client';
import { RecoilRoot } from 'recoil';

export function RecoilRootWrapper({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
