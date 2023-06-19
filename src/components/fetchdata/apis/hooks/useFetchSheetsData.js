import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchSheetsData(url, mode) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (url, mode) => {
      try {
        const { data: response } = await axios.get(url);
        switch (mode) {
          case 'many':
            setValues(response);
            break;
          case 'one':
            setValues(response.values);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData(url, mode);
  }, []);

  return [values, loading];
}
