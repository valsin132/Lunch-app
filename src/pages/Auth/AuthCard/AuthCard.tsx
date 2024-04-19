import classNames from 'classnames/bind';
import { ReactElement } from 'react';
import { LogoHorizontal } from '../../../utils/iconManager';
import { Card } from '../../../components/Card';
import { Login } from '../components/login/login';
import { Tab } from '../../../components/Tab';
import styles from './AuthCard.module.css';

const cx = classNames.bind(styles);

export function AuthCard(): ReactElement {
  const handleTabClick = () => {};

  return (
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
          <Login />
        </div>
      </div>
    </Card>
  );
}
