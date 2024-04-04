import styles from './Badge.module.css'

import classNames from 'classnames/bind'

interface BadgeProps {
    count: number;
}

const cx = classNames.bind(styles);

export const BadgeFree = () => {
    return (
        <div className={cx('badge', 'badge--free')}>
            <p>Free</p>
        </div>
    )
}

export const BadgeContent = ({ count }: BadgeProps) => {
    return (
        <div className={cx('badge', 'badge--content')}>
            {count}
        </div>
    )
}
