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

const initialToastState: ToastState = {
  message: '',
  type: 'info',
};

export function AuthCard(): ReactElement {
  const [activeTab, setActiveTab] = useState<AuthMenu>('LOGIN');
  const [toastState, setToastState] = useState<ToastState>(initialToastState);
  const handleRegistration = (message: string) => {
    setToastState({ message, type: 'success' });
    setActiveTab('LOGIN');
  };
  const handleTabSwitch = (tabName: AuthMenu) => {
    setActiveTab(tabName);
    if (toastState.message) setToastState(initialToastState);
  };
  return (
    <Card spacing="none" shadow="m" isNoBorder>
      {toastState.message && (
        <Toast
          key={toastState.type}
          content={toastState.message}
          toastType={toastState.type}
          onClick={() => setToastState(initialToastState)}
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
            handleUnsuccessfulLogin={(message: string) => {
              setToastState({ message, type: 'warning' });
            }}
          />
        ) : (
          <RegisterForm handleRegistration={handleRegistration} />
        )}
      </div>
    </Card>
  );
}
