import { Price } from "./acmeEventPayloads";
import { IPaginationResponseSettings } from "./pagination";

export interface Discount {
  id: string;
  code: string;
  name: string;
  description: string;
}

export interface ListDiscounts {
  list: Discount[];
  pagination: IPaginationResponseSettings;
}

export interface DiscountValue {
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
}

export interface DiscountObject extends Discount {
  value: DiscountValue;
}

export interface DiscountPriceList {
  prices: Price[];
}