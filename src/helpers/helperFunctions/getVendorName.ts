import { Vendor } from '../../pages/FoodMenu/FoodMenu.types';

export const getVendorName =
  (vendorsData: Vendor[] | null) =>
  (vendorId: number): string =>
    vendorsData?.find((vendor) => Number(vendor.id) === vendorId)?.name ?? '';
