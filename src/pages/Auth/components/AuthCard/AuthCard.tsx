import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { LogoHorizontal } from '../../../../utils/iconManager';
import { Card } from '../../../../components/Card';
import { LoginForm } from '../LoginForm/LoginForm';
import { Tab } from '../../../../components/Tab';
import styles from './AuthCard.module.css';

const cx = classNames.bind(styles);

export function AuthCard(): ReactElement {
  const handleTabClick = () => {};

  return (
    <Card spacing="s" shadow="m">
      <div className={cx('auth-card')}>
        <div className={cx('auth-card__container')}>
          <LogoHorizontal className={cx('auth-card__logo')} />
          <div className={cx('auth-card__header')}>
            <Tab label="Login" isActive onClick={() => handleTabClick} />
            <Tab label="Register" isActive={false} onClick={() => handleTabClick} />
          </div>
          <LoginForm />
        </div>
      </div>
    </Card>
  );
}
