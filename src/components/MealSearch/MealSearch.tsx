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
  handleSort: (sortedBy: string) => void;
  isSortBy: boolean;
};

const cx = classNames.bind(styles);

export function MealSearch({ vendorsData, handleSearch, handleSort, isSortBy }: MealSearchProps) {
  const [mealTitle, setMealTitle] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<SelectInputOption | undefined>();
  const [sortButtonValue, setSortButtonValue] = useState('POPULARITY');

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
        {isSortBy && <div className={cx('meal-search__seperator')} />}
        <div className={cx('meal-search__sort-by')}>
          <button
            className={cx('meal-search__button-sort-by')}
            aria-label="Sort meals by selected criteria"
            type="button"
            onClick={() => handleSort(sortButtonValue)}>
            SORT BY
          </button>
          <Button
            buttonSize="xs"
            buttonType="tertiary"
            title="POPULARITY"
            aria-label="Select sort by popularity"
            isActive={sortButtonValue === 'POPULARITY'}
            onClick={() => {
              setSortButtonValue('POPULARITY');
            }}
          />
          <Button
            buttonSize="xs"
            buttonType="tertiary"
            title="PRICE"
            aria-label="Select sort by price"
            isActive={sortButtonValue === 'PRICE'}
            onClick={() => {
              setSortButtonValue('PRICE');
            }}
          />
          <Button
            buttonSize="xs"
            buttonType="tertiary"
            title="RATING"
            aria-label="Select sort by rating"
            isActive={sortButtonValue === 'RATING'}
            onClick={() => {
              setSortButtonValue('RATING');
            }}
          />
        </div>
      </div>
    </Card>
  );
}
