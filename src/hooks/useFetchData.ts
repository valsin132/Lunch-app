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

  const fetchAndSetData = async () => {
    try {
      const response = await fetch(endpoint);
      setData(await response.json());
    } catch (_error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  return { data, isError, isLoading };
};
