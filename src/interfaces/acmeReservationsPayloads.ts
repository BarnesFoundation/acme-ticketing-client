import { ShoppingCartObject } from "./acmeCheckoutManagementPayloads";

export type ReservationObject = {
 id?: number;
    expirationTimestamp?: string;
    reservationItems: ReservationItem[];
}

export type ReservationItem = {
  id?: number;
  reservationId?: number;
  eventId: string;
  quantity: number;
};

export type ReservationPayload = {
  reservation: ReservationObject;
  cart: ShoppingCartObject;
};
