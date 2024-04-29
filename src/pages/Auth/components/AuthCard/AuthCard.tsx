import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { LogoHorizontal } from '../../../../utils/iconManager';
import { Card } from '../../../../components/Card';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { Tab } from '../../../../components/Tab';
import styles from './AuthCard.module.css';

const cx = classNames.bind(styles);

export function AuthCard(): ReactElement {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  const handleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <Card spacing="s" shadow="m">
      <div className={cx('auth-card')}>
        <div className={cx('auth-card__container')}>
          <LogoHorizontal className={cx('auth-card__logo')} />
          <div className={cx('auth-card__header')}>
            <Tab label="LOGIN" isActive={showLogin} onClick={handleLogin} />
            <Tab label="REGISTER" isActive={showRegister} onClick={handleRegister} />
          </div>
          {showLogin && <LoginForm />}
          {showRegister && <RegisterForm handleLogin={handleLogin} />}
        </div>
      </div>
    </Card>
  );
}
