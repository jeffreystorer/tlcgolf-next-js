import { FetchData } from '@/app/fetchdata/fetchdata'

export default function FetchDataPage({searchParams}){
/**
 * searchParams
 *   ghinNumber
 *   lastName
 *   dataMode
 *   groupsArray
 *   allPlayersInTableArray
 */
const groupsArray= decodeURIComponent(JSON.parse(searchParams.groupsArray));
const groups = groupsArray.split(',');

const allPlayersInTableArray= decodeURIComponent(JSON.parse(searchParams.allPlayersInTableArray));
const allPlayersInTableFlat = allPlayersInTableArray.split(',');
const fieldCount = groups.length + 6;
const playerCount = allPlayersInTableFlat.length / fieldCount;
let allPlayersInTable = [];
for (let i = 0; i < playerCount; i++ ){
    let player = [];
    for (let j = 0; j < fieldCount; j++) {
       player.push(allPlayersInTableFlat[i*fieldCount+j])
    }
    allPlayersInTable.push(player);
}

const data = {
    ghinNumber: searchParams.ghinNumber,
    lastName: searchParams.lastName,
    dataMode: searchParams.dataMode,
    groups: groups,
    allPlayersInTable: allPlayersInTable
}

 return <FetchData incomingData={data} />    
}