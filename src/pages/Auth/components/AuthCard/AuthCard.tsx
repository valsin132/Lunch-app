import classNames from 'classnames/bind';
import { ReactElement, useState } from 'react';
import { LogoHorizontal } from '../../../../utils/iconManager';
import { Card } from '../../../../components/Card';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { Tab } from '../../../../components/Tab';
import { Toast } from '../../../../components/Toast';
import { AuthMenus } from './AuthCard.types';
import styles from './AuthCard.module.css';

const cx = classNames.bind(styles);

export function AuthCard(): ReactElement {
  const [activeTab, setActiveTab] = useState<AuthMenus>('LOGIN');
  const [isToastShown, setIsToastShown] = useState(false);
  const handleRegistration = () => {
    setIsToastShown(true);
    setActiveTab('LOGIN');
  };
  const handleTabSwitch = (tabName: AuthMenus) => {
    setActiveTab(tabName);
    if (isToastShown) setIsToastShown(false);
  };
  return (
    <Card spacing="none" shadow="m" isNoBorder>
      {isToastShown && (
        <Toast
          content="Congratulations, your account has been succesfully created!"
          toastType="success"
          onClick={() => setIsToastShown(!isToastShown)}
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
          <LoginForm />
        ) : (
          <RegisterForm handleRegistration={handleRegistration} />
        )}
      </div>
    </Card>
  );
}
