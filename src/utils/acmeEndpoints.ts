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
export const LIST_EVENT_TEMPLATES_SUMMARIES = "/v2/b2b/event/templates/summaries";
export const GET_EVENT_TEMPLATE = (id: string | number) => { return `/v2/b2b/event/template/${id}`; };

// Membership endpoints
export const GET_MEMBERSHIP = "/v2/b2b/memberships";

// Membership Card endpoints
export const LIST_MEMBERSHIP_CARDS = "/v2/b2b/membership/cards";

// Membership Summary endpoints
export const GET_MEMBERSHIP_SUMMARIES = "/v2/b2b/membership/summaries";

// Orders Management - Orders endpoints
export const GET_ORDER = "/v2/b2c/orders";
export const GET_ORDERS_FOR_EVENT = "/v2/b2c/orders/event";

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
export const LIST_EVENT_TEMPLATES_SUMMARIES_B2C = "/v2/b2c/event/templates/summaries";
export const LIST_TEMPLATE_TIMES = (id: string | number) => { return `/v2/b2c/event/templates/${id}/times`; };
export const GET_EVENT_TEMPLATE_B2C = (id: string | number) => { return `/v2/b2c/event/templates/${id}`; };
export const GET_ACTIVITY_CALENDAR_FOR_TEMPLATE = (id: string | number) => { return `/v2/b2c/event/templates/${id}/calendar`; }