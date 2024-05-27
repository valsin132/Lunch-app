import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { SelectInput, SelectInputOption } from '../SelectInput';
import { Vendor } from '../../pages/FoodMenu/FoodMenu.types';
import styles from './MealSearch.module.css';

type MealSearchProps = {
  vendorsData: Vendor[] | null;
  handleSearch: (title: string, vendor: string) => void;
  handleSort?: (sortBy: string) => void;
};

const cx = classNames.bind(styles);

export function MealSearch({ vendorsData, handleSearch, handleSort }: MealSearchProps) {
  const [mealTitle, setMealTitle] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<SelectInputOption | undefined>();
  const [selectedSortButtonValue, setSelectedSortButtonValue] = useState('POPULARITY');
  const sortByValues = ['POPULARITY', 'PRICE', 'RATING'];
  const isSortBy = !!handleSort;

  const vendorOptions: SelectInputOption[] = useMemo(() => {
    if (!vendorsData) return [];
    return vendorsData.map((vendor) => {
      const selectOption: SelectInputOption = { label: vendor.name, value: Number(vendor.id) };
      return selectOption;
    });
  }, [vendorsData]);

  return (
    <Card spacing="none" shadow="s" isFullWidth isNoBorder>
      <div className={cx('meal-search')}>
        <form className={cx('meal-search__form')} role="search" aria-label="Meal search form">
          <div className={cx('meal-search__inputs')}>
            <div className={cx('meal-search__input')}>
              <Input
                id="mealTitle"
                label="What dish are you looking for?"
                withIcon
                name="mealTitle"
                textFieldType="text"
                placeholder="Enter a dish"
                aria-label="Enter the title of the meal you are looking for"
                onChange={(e) => {
                  setMealTitle(e.target.value);
                }}
                value={mealTitle}
              />
            </div>
            <div className={cx('meal-search__input')}>
              <SelectInput
                label="Vendor"
                placeholder="All vendors"
                aria-label="Select a vendor"
                value={selectedVendor}
                options={vendorOptions}
                onChange={(option) => {
                  setSelectedVendor(option);
                }}
              />
            </div>
          </div>
          <Button
            buttonSize="md"
            buttonType="primary"
            title="Search"
            aria-label="Search for meals"
            onClick={() => {
              handleSearch(mealTitle, selectedVendor?.label ?? '');
            }}
          />
        </form>
        {isSortBy && (
          <div className={cx('meal-search__sort-by-container')}>
            <div className={cx('meal-search__seperator')} />
            <div className={cx('meal-search__sort-by')}>
              <span
                className={cx('meal-search__label-sort-by')}
                aria-labelledby="Sort buttons label">
                Sort By
              </span>
              {sortByValues.map((value) => (
                <Button
                  key={value}
                  buttonSize="xs"
                  buttonType={selectedSortButtonValue === value ? 'secondary' : 'tertiary'}
                  title={value}
                  aria-label={`Select sort by ${value.toLocaleLowerCase()}`}
                  onClick={() => {
                    setSelectedSortButtonValue(value);
                    if (handleSort) {
                      handleSort(value);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
