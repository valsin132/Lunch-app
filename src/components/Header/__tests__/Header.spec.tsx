import { render } from '@testing-library/react';
import { Header } from '../Header';

describe('<Header />', () => {
  it('should render correct content according to page type', () => {
    const result = render(<Header pageType="foodMenu" />);

    expect(result.getByText('Lunch Menu')).toBeVisible();
  });
});
