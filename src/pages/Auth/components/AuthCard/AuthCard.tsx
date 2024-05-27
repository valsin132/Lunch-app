import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { LogoHorizontal } from '../../../../utils/iconManager';
import { Card } from '../../../../components/Card';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { Tab } from '../../../../components/Tab';
import { Toast } from '../../../../components/Toast';
import { AuthMenu } from './AuthCard.types';
import { AuthToastState } from '../Auth.types';
import styles from './AuthCard.module.css';

const cx = classNames.bind(styles);

const initialToastState: AuthToastState = {
  message: '',
  type: 'info',
};

export function AuthCard(): ReactElement {
  const [activeTab, setActiveTab] = useState<AuthMenu>('LOGIN');
  const [toastState, setToastState] = useState<AuthToastState>(initialToastState);

  const handleTabSwitch = (tabName: AuthMenu) => {
    setActiveTab(tabName);
    if (toastState.message) setToastState((prev) => ({ ...prev, message: '' }));
  };
  return (
    <Card spacing="none" shadow="m" isNoBorder>
      <Toast
        key={toastState.type}
        isVisible={!!toastState.message}
        content={toastState.message}
        toastType={toastState.type}
        onClick={() => setToastState((prev) => ({ ...prev, message: '' }))}
      />
      <div className={cx('auth-card')}>
        <LogoHorizontal className={cx('auth-card__logo')} />
        <nav className={cx('auth-card__header')}>
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
        </nav>
        {activeTab === 'LOGIN' ? (
          <LoginForm handleToast={setToastState} />
        ) : (
          <RegisterForm
            handleToast={setToastState}
            onRegister={() => {
              setActiveTab('LOGIN');
            }}
          />
        )}
      </div>
    </Card>
  );
}
