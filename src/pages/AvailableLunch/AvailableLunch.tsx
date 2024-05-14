import { useState } from 'react';
import classNames from 'classnames/bind';
import { SelectInput, SelectInputOption } from '../../components/SelectInput';
import styles from './test.module.css';

const cx = classNames.bind(styles);
// THERE IS A TEST DATA WHAT SHOULD BE DELETED BEFORE MERGE
export function AvailableLunch() {
  const options: SelectInputOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  const [selectedOption, setSelectedOption] = useState<SelectInputOption | undefined>(undefined);

  const handleChange = (option: SelectInputOption | undefined) => {
    setSelectedOption(option);
  };
  return (
    <div className={cx('test-div')}>
      <SelectInput
        label="Select an Option"
        options={options}
        value={selectedOption}
        placeholder="Choose..."
        onChange={handleChange}
      />
    </div>
  );
}
