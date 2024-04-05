import * as styles from '../Badge.modules.css';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

export const BadgeFree = () => {
    return (
        <div className={cx('badge', 'badge--free')}>
            <p>Free</p>
        </div>
    )
}
