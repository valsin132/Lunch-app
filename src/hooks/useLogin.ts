import { useState } from 'react';

export const useLogin = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');

  const login = async (
    email: string,
    password: string,
    setShowToast: (value: boolean) => void
  ): Promise<void> => {
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:3002/user');
      const userData = await response.json();

      if (userData?.email === email && userData?.password === password) {
        window.localStorage.setItem('userData', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
      } else {
        setErrorMsg('Incorrect email or password. Please try again.');
        setShowToast(true);
      }
    } catch (_error) {
      setErrorMsg('Login failed. Please try again later.');
      setShowToast(true);
    }
  };

  return { login, errorMsg };
};
