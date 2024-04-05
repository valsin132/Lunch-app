import styles from './BadgeFree.module.css';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

export const BadgeFree = () => {
    return (
        <div className={cx('badge--free')}>
            <p>Free</p>
        </div>
    )
}
