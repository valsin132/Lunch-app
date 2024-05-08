import classNames from 'classnames/bind';
import { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import styles from './MealSearch.module.css';

type MealSearchProps = {
  handleSearch: (title: string) => void;
  isSortBy?: boolean;
};

const cx = classNames.bind(styles);

export function MealSearch({ handleSearch, isSortBy = false }: MealSearchProps) {
  const [mealTitle, setMealTitle] = useState('');

  return (
    <Card spacing="none" shadow="s" isFullWidth isNoBorder>
      <div className={cx('meal-search')}>
        <form className={cx('meal-search__form')}>
          <div className={cx('meal-search__inputs')}>
            <div className={cx('meal-search__input')}>
              <Input
                id="mealTitle"
                label="What dish are you looking for?"
                withIcon
                name="mealTitle"
                textFieldType="text"
                placeholder="Enter a dish"
                onChange={(e) => {
                  setMealTitle(e.target.value);
                }}
                value={mealTitle}
              />
            </div>
          </div>
          <Button
            buttonSize="md"
            buttonType="primary"
            title="Search"
            onClick={() => {
              handleSearch(mealTitle);
            }}
          />
        </form>
        {isSortBy && <div className={cx('meal-search__seperator')} />}
      </div>
    </Card>
  );
}
