import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { LogoHorizontal } from '../../../../utils/iconManager';
import { Card } from '../../../../components/Card';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { Tab } from '../../../../components/Tab';
import { Toast } from '../../../../components/Toast';
import { AuthMenu, ToastState } from './AuthCard.types';
import styles from './AuthCard.module.css';

const cx = classNames.bind(styles);

export function AuthCard(): ReactElement {
  const [activeTab, setActiveTab] = useState<AuthMenu>('LOGIN');
  const [toastState, setToastState] = useState<ToastState>('NONE');
  const handleRegistration = () => {
    setToastState('REGISTER_SUCCESS');
    setActiveTab('LOGIN');
  };
  const handleTabSwitch = (tabName: AuthMenu) => {
    setActiveTab(tabName);
    if (toastState !== 'NONE') setToastState('NONE');
  };
  return (
    <Card spacing="none" shadow="m" isNoBorder>
      {toastState === 'REGISTER_SUCCESS' && (
        <Toast
          content="Congratulations, your account has been succesfully created!"
          toastType="success"
          onClick={() => setToastState('NONE')}
        />
      )}
      {toastState === 'LOGIN_WARNING' && (
        <Toast
          toastType="warning"
          content="Incorrect email or password. Please try again."
          onClick={() => setToastState('NONE')}
        />
      )}
      <div className={cx('auth-card')}>
        <LogoHorizontal className={cx('auth-card__logo')} />
        <div className={cx('auth-card__header')}>
          <Tab
            label="LOGIN"
            isActive={activeTab === 'LOGIN'}
            onClick={() => handleTabSwitch('LOGIN')}
          />
          <Tab
            label="REGISTER"
            isActive={activeTab === 'REGISTER'}
            onClick={() => handleTabSwitch('REGISTER')}
          />
        </div>
        {activeTab === 'LOGIN' ? (
          <LoginForm
            handleUnsuccessfulLogin={() => {
              setToastState('LOGIN_WARNING');
            }}
          />
        ) : (
          <RegisterForm handleRegistration={handleRegistration} />
        )}
      </div>
    </Card>
  );
}
