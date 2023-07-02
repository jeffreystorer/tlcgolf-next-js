import { FetchData} from '@/app/users/fetchdata';

export default function Page({params}){
    const ghinNumber = params.ghinNumber;
    const dataMode = 'ghin';

    return <FetchData ghinNumber={ghinNumber} dataMode={dataMode} />;
}