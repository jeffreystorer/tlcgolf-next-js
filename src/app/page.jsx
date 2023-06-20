import ParentClientComponent from './parentclientcomponent';
import ChildServerComponent from './childservercomponent';

export default function RootPage() {
  const params = {
    ghinNumber: '585871',
  };
  return (
    <ParentClientComponent>
      <ChildServerComponent params={params} />
    </ParentClientComponent>
  );
}
