// Ticketing/Order endpoints
export const WILLCALL_CHECKIN_EXTERNAL = "/v2/b2b/willcall/checkinexternal";
export const ORDER_FOR_ORDER_ID = "/v2/b2b/willcall/orders";
export const CHECK_IN_TICKETS = "/v2/b2b/willcall/checkintickets";

// Event Management - Event Instances endpoints
export const LIST_EVENTS = "/v2/b2b/event/instances";
export const LIST_EVENT_SUMMARIES = "/v2/b2b/event/instances/summaries";
export const GET_EVENT = "/v2/b2b/event/instances";

// Event Management - Event Template endpoints
export const LIST_EVENT_TEMPLATES = "/v2/b2b/event/templates";
export const LIST_EVENT_TEMPLATES_SUMMARIES =
    "/v2/b2b/event/templates/summaries";
export const GET_EVENT_TEMPLATE = (id: string | number) => {
    return `/v2/b2b/event/template/${id}`;
};

// Event Management - Event Images endpoints
export const READ_EVENT_TEMPLATE_IMAGE = (templateId: string, size: string) =>
    `/v2/b2b/photos/program/${templateId}/${size}`;

// Membership endpoints
export const GET_MEMBERSHIP = "/v2/b2b/memberships";

// Membership Card endpoints
export const LIST_MEMBERSHIP_CARDS = "/v2/b2b/membership/cards";

// Membership Summary endpoints
export const GET_MEMBERSHIP_SUMMARIES = "/v2/b2b/membership/summaries";

// Membership Levels endpoints
export const LIST_MEMBERSHIP_LEVELS = "/v2/b2b/membership/levels";
export const GET_MEMBERSHIP_LEVEL = (id: string) =>
    `/v2/b2b/membership/levels/${id}`;
export const VALIDATE_MEMBERSHIP_CHECKOUT =
    "/v2/b2b/memberships/checkout/validate";

// Orders Management - Orders endpoints
export const GET_ORDER = "/v2/b2c/orders";
export const SEARCH_ORDERS = "/v2/b2c/orders/search";
export const GET_ORDERS_FOR_EVENT = "/v2/b2c/orders/event";
export const REFUND_ORDER = "/v1/b2b/b2b/refunds";
export const UPDATE_ORDER = "/v2/b2b/orders/update";
export const REBOOK_ORDER = "/v1/b2b/rebook/orders";

// Session endpoints
export const CREATE_SESSION = "/v2/b2b/customer/session";

// Analytics - Reports endpoints
export const LIST_REPORTS = "/v2/b2b/analytics/report/definitions";
export const GET_REPORT = "/v2/b2b/analytics/report/definitions";
export const EXECUTE_REPORT = "/v2/b2b/async/report";
export const POLL_REPORT_STATUS = "/v2/b2b/async/report/";
export const EXECUTE_ADHOC_REPORT = "/v2/b2b/analytics/report/execute";

// Checkout Management - Event Template B2C endpoints
export const LIST_EVENT_TEMPLATES_B2C = "/v2/b2c/event/templates";
export const LIST_EVENT_TEMPLATE_INSTANCES_B2C = (eventTemplateId: string) =>
    `v2/b2c/event/templates/${eventTemplateId}/instances`;
export const LIST_EVENT_TEMPLATES_SUMMARIES_B2C =
    "/v2/b2c/event/templates/summaries";
export const LIST_TEMPLATE_TIMES = (id?: string | number) => {
    if (id) return `/v2/b2c/event/templates/${id}/times`;
    return `/v2/b2c/event/templates/times`;
};
export const GET_EVENT_TEMPLATE_B2C = (id: string | number) => {
    return `/v2/b2c/event/templates/${id}`;
};
export const GET_ACTIVITY_CALENDAR_FOR_TEMPLATE = (id: string | number) => {
    return `/v2/b2c/event/templates/${id}/calendar`;
};

// Checkout Management - E-Commerce B2C Check endpoints
export const B2C_CHECKOUT = "/v2/b2c/checkout/";

// Checkout Management - Shopping Cart B2C endpoints
export const B2C_SHOPPING_CART = "/v2/b2c/carts";
export const ENTITLEMENTS_VALIDATE = "/v2/b2c/entitlements/validate";

// Checkout Management - B2B Checkout
export const B2B_CHECKOUT = "/v2/b2b/checkout";
export const B2B_CHECKOUT_KIOSK = "/v2/b2b/checkout/kiosk/";
export const B2B_SEND_ORDER_EMAIL = (orderNumber: string) => {
    return `/v2/b2b/orders/${orderNumber}/email`;
};

// Platform APIs - Add-Ons
export const GET_ADD_ONS = "/v2/b2b/addons";
export const GET_FORMS_RESPONSES = "/v2/b2c/forms/responses";

// Discounts
export const LIST_DISCOUNTS = "/v2/b2b/discounts";
export const GET_DISCOUNT = (discountId: string | number) => {
    return `/v2/b2b/discounts/${discountId}`;
};
export const GET_DISCOUNT_PRICE_LIST = (discountId: string | number, priceListId: string | number) => {
    return `/v2/b2b/discounts/${discountId}/price/list/${priceListId}`
};
