import { useEffect, useState } from 'react';

interface UseFetchDataResult<DataType> {
  isLoading: boolean;
  isError: boolean;
  data: DataType | null;
}

export const useFetchData = <DataType>(endpoint: string): UseFetchDataResult<DataType> => {
  const [data, setData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!isMounted) return;
        setData(await response.json());
      } catch (_error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetData();
    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, isError, isLoading };
};
