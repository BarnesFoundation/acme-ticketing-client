import { IPaginationResponseSettings } from "./pagination";

export interface DiscountObject {
  id: string;
  code: string;
  name: string;
  description: string;
  values: {
    personTypeId: string;
    personType: {
      name: string;
      description: string;
      type: string;
      active: boolean;
      displayOrder: number;
      children: {
        personTypeId: string;
        quantity: number;
      }[];
    }
    discountType: string;
    value: number;
  }[]
}

export interface ListDiscounts {
  list: DiscountObject[];
  pagination: IPaginationResponseSettings;
}