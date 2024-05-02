import { useState } from 'react';
import { useFetchData } from './useFetchData';

interface UserProps {
  email: string;
  password: string;
  name: string;
  surname: string;
  balance: number;
  img: string;
  orders: string[];
  orderhistory: string[];
}

export const useLogin = () => {
  const { data: userData } = useFetchData<UserProps>('http://localhost:3002/user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      if (userData?.email === email && userData?.password === password) {
        localStorage.setItem('user', JSON.stringify(userData));

        setLoading(false);
        return true;
      }

      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return false;
    } catch (_error) {
      setError('Login failed. Please try again later.');
      setLoading(false);
      return false;
    }
  };

  return { login, loading, error };
};
