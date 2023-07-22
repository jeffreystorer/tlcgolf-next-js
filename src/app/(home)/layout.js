import { RecoilRootWrapper } from '@/app/(home)/recoilrootwrapper';
import { NavBar } from '@/components/common/navbar';
import dynamic from 'next/dynamic';
const SubMenu = dynamic(() => import('@/components/common/submenu'), {
  ssr: false,
});
const ConfirmDeleteModal = dynamic(
  () => import('@/components/lineup/ConfirmDeleteModal'),
  {
    ssr: false,
  }
);
const GameOptionsModal = dynamic(
  () => import('@/components/lineup/GameOptionsModal'),
  {
    ssr: false,
  }
);
const MissingPlayerModal = dynamic(
  () => import('@/components/lineup/MissingPlayerModal'),
  {
    ssr: false,
  }
);

export default function HomeLayout({ children }) {
  return (
    <RecoilRootWrapper>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <SubMenu />
      <ConfirmDeleteModal />
      <GameOptionsModal />
      <MissingPlayerModal />
    </RecoilRootWrapper>
  );
}
