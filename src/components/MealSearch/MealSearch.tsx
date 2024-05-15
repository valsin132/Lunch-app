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
  isSortBy?: boolean;
};

const cx = classNames.bind(styles);

export function MealSearch({ vendorsData, handleSearch, isSortBy = false }: MealSearchProps) {
  const [mealTitle, setMealTitle] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<SelectInputOption | undefined>();

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
            <div className={cx('meal-search__input')}>
              <SelectInput
                label="Vendor"
                placeholder="All vendors"
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
            onClick={() => {
              handleSearch(mealTitle, selectedVendor?.label ?? '');
            }}
          />
        </form>
        {isSortBy && <div className={cx('meal-search__seperator')} />}
      </div>
    </Card>
  );
}
