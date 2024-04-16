import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames/bind';
import { loginIllustration1 } from '../../utils/imageManager';
import styles from './AuthContainer.module.css';

const cx = classNames.bind(styles);
type AuthContainerProps = {
  children: ReactNode;
};
export function AuthContainer({ children }: AuthContainerProps): ReactElement {
  return (
    <div className={cx('auth')}>
      <div className={cx('auth-image')}>
        <img src={loginIllustration1} alt="login illustration" />
      </div>
      <div className={cx('auth-card')}>{children}</div>
    </div>
  );
}
