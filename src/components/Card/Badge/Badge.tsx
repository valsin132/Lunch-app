import styles from './Badge.module.css'

import classNames from 'classnames/bind'

interface BadgeProps {
    free: boolean;
    count?: number;
}

const cx = classNames.bind(styles);

export const Badge = ({ free, count }: BadgeProps) => {
    return (
        <div className={cx('badge', free)}>
            <div className={`${styles.badge} ${styles['badge--' + free]}`}>
                {free ? count : 'Free'}
            </div>
        </div>
    )
}
