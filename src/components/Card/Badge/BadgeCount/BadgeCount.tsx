import * as styles from '../Badge.modules.css';
import classNames from 'classnames/bind'

interface BadgeProps {
    count: number;
}

const cx = classNames.bind(styles);

export const BadgeCount = ({ count }: BadgeProps) => {
    return (
        <div className={cx('badge', 'badge--count')}>
            {count}
        </div>
    )
}
