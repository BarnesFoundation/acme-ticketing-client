import { ReservationObject } from "../../../interfaces/acmeReservationsPayloads";
import { CREATE_RESERVATION, UPDATE_RESERVATION } from "../../../utils/acmeEndpoints";
import { performRequest } from "../../acmeRequestor";

/** Creates a new reservation with an empty shopping cart
 * 
 * ACME documentation: https://developers.acmeticketing.com/support/solutions/articles/33000250677-reservations
 * @returns {Promise<ReservationObject>}
 */
export async function createReservation(throwRaw = false): Promise<ReservationObject> {
  const payload = await performRequest({ url: CREATE_RESERVATION, method: "post", data: { reservationItems: [] }, throwRaw }) as ReservationObject;

  return payload;
}

/** Updates an existing reservation
 * 
 * ACME documentation: https://developers.acmeticketing.com/support/solutions/articles/33000250677-reservations
 * @param {number} reservationId - Reservation to be updated
 * @param {string} eventId - ACME ID for the event that the reservation will be updated for
 * @param {number} quantity - Number of ticket to be reserved for the event
 * @returns {Promise<ReservationObject>}
 */
export async function updateReservation(
  reservationId: number,
  eventId: string,
  quantity: number,
  throwRaw = false,
): Promise<ReservationObject> {
  const payload = await performRequest({
    url: UPDATE_RESERVATION,
    method: "put",
    data: {
      id: reservationId,
      reservationItems: [{ reservationId, eventId, quantity }]
    },
    throwRaw,
  }
  ) as ReservationObject;

  return payload;
}
