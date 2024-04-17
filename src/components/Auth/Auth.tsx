import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoHorizontal } from '../../utils/iconManager';
import { Card } from '../Card';
import { Button } from '../Button';
import { Input } from '../Input';
import { Tab } from '../Tab';
import { useAuth } from '../../helpers/AuthContext';
import styles from './Auth.module.css';

const cx = classNames.bind(styles);

export function Auth(): ReactElement {
  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email address');
      setEmailError(true);
      return;
    }
    login();
    navigate('/menu');
  };

  const handleTabClick = () => {};

  return (
    <div>
      <Card spacing="s" shadow="m">
        <div className={cx('login')}>
          <div className={cx('login__container')}>
            <LogoHorizontal className={cx('login__logo')} />
            <div className={cx('login__header')}>
              <div>
                <Tab label="Login" isActive onClick={() => handleTabClick} />
              </div>
              <div>
                <Tab label="Register" isActive={false} onClick={() => handleTabClick} />
              </div>
            </div>
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
                <a href="/login" aria-label="Forgot Password" className={cx('login__form-link')}>
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
          <Button
            title="Log in"
            buttonSize="md"
            buttonType="primary"
            buttonWidth="full"
            iconType="arrow"
            onClick={handleLogin}
          />
        </div>
      </Card>
    </div>
  );
}
