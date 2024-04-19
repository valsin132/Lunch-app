import React, { useReducer } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { useAuth } from '../../../../helpers/AuthContext';
import { EMAIL_REGEX } from '../../../../constants';
import styles from './login.module.css';

const cx = classNames.bind(styles);

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

interface State {
  email: string;
  password: string;
  emailError: boolean;
  passwordError: boolean;
  errorMessage: string;
}

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_EMAIL_ERROR'; payload: boolean }
  | { type: 'SET_PASSWORD_ERROR'; payload: boolean }
  | { type: 'SET_ERROR_MESSAGE'; payload: string };

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialState = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    errorMessage: '',
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, password, emailError, passwordError, errorMessage } = state;

  const setEmail = (value: string) => dispatch({ type: 'SET_EMAIL', payload: value });
  const setPassword = (value: string) => dispatch({ type: 'SET_PASSWORD', payload: value });
  const setEmailError = (value: boolean) => dispatch({ type: 'SET_EMAIL_ERROR', payload: value });
  const setPasswordError = (value: boolean) =>
    dispatch({ type: 'SET_PASSWORD_ERROR', payload: value });
  const setErrorMessage = (value: string) =>
    dispatch({ type: 'SET_ERROR_MESSAGE', payload: value });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
    setErrorMessage('');
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setErrorMessage('');
  };
  const handleLogin = () => {
    if (!email && !password) {
      setErrorMessage('Please fill all required fields.');
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    if (!email) {
      setErrorMessage('Please enter your email.');
      setEmailError(true);
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      setPasswordError(true);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Invalid email address');
      setEmailError(true);
      return;
    }
    login();
    navigate('/menu');
  };

  return (
    <form className={cx('login__form')} aria-label="Login Form">
      <div className={cx('login__form-head')}>
        <h1>Login</h1>
        <p>Lunch won’t order itself</p>
      </div>
      <div className={cx('login__form-input')}>
        <Input
          id="email"
          textFieldType="email"
          placeholder="Email"
          label="Email"
          value={email}
          name="email"
          onChange={handleEmailChange}
          aria-required="true"
          aria-label="Email Input Field"
          isError={emailError}
          errorMessage={emailError ? errorMessage : ''}
        />
        <Input
          id="password"
          textFieldType="password"
          placeholder="Password"
          label="Password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
          aria-required="true"
          aria-label="Password Input Field"
          isError={passwordError}
          errorMessage={passwordError ? errorMessage : ''}
        />
        <button aria-label="Forgot Password" className={cx('login__form-link')} type="button">
          Forgot Password?
        </button>
      </div>
      <div className={cx('login__form-button')}>
        <Button
          title="Log in"
          buttonSize="md"
          buttonType="primary"
          buttonWidth="full"
          iconType="arrow"
          onClick={handleLogin}
        />
      </div>
    </form>
  );
}
