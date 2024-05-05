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
  const [activeTab, setActiveTab] = useState('LOGIN');

  return (
    <Card spacing="s" shadow="m">
      <div className={cx('auth-card')}>
        <div className={cx('auth-card__container')}>
          <LogoHorizontal className={cx('auth-card__logo')} />
          <div className={cx('auth-card__header')}>
            <Tab
              label="LOGIN"
              isActive={activeTab === 'LOGIN'}
              onClick={() => setActiveTab('LOGIN')}
            />
            <Tab
              label="REGISTER"
              isActive={activeTab === 'REGISTER'}
              onClick={() => setActiveTab('REGISTER')}
            />
          </div>
          {activeTab === 'LOGIN' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </Card>
  );
}
