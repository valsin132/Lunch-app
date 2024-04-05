import styles from './BadgeCount.module.css';
import classNames from 'classnames/bind'

interface BadgeProps {
    count: number;
}

const cx = classNames.bind(styles);

export const BadgeCount = ({ count }: BadgeProps) => {
    return (
        <div className={cx('badge--count')}>
            {count}
        </div>
    )
}
