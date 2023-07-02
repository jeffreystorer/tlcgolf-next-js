import { FetchData} from '@/app/users/fetchdata';

export default function Page({params}){
    const ghinNumber = params.ghinNumber;
    const dataMode = 'roster';

    return <FetchData ghinNumber={ghinNumber} dataMode={dataMode} />;
}