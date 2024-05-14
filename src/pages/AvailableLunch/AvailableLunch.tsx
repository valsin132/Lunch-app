import { Pagination } from '../../components/Pagination';

export function AvailableLunch() {
  const vendors = [
    { id: 1, name: 'Tasty Bites1' },
    { id: 2, name: 'Spice Haven2' },
    { id: 3, name: 'Pizza Delizi3osa' },
    { id: 4, name: 'Smash Burgers4' },
    { id: 5, name: 'Tasty Bites5' },
    { id: 6, name: 'Spice Haven6' },
    { id: 7, name: 'Pizza Deliz7iosa' },
    { id: 8, name: 'Smash Burger8s' },
    { id: 9, name: 'Tasty Bites9' },
    { id: 10, name: 'Spice Haven10' },
    { id: 11, name: 'Pizza Delizio11sa' },
    { id: 12, name: 'Smash Burgers12' },
    { id: 13, name: 'Tasty Bites13' },
    { id: 14, name: 'Spice Haven14' },
    { id: 15, name: 'Pizza Delizio15sa' },
    { id: 16, name: 'Smash Burgers16' },
    { id: 17, name: 'Tasty Bites17' },
    { id: 18, name: 'Spice Haven18' },
    { id: 19, name: 'Pizza Delizio19sa' },
    { id: 20, name: 'Smash Burger20s' },
  ];

  const vendorNames = vendors.map((vendor) => vendor.name);

  return <Pagination items={vendorNames} />;
}
