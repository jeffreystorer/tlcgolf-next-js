import { EditTableDynamic} from '@/app/(home)/edittable/edittabledynamic'
import { SHEET_URL } from '@/components/fetchdata/apis/constants';

async function fetchSheetsData() {
  const res = await fetch(SHEET_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch sheetsData');
  }

  return res.json();
}

export default async function Page() {
  const sheets = await fetchSheetsData();

  return <EditTableDynamic sheets={sheets} />;
}
