import { IPaginationResponseSettings } from "./pagination";

export interface ListEventsPayload {
    list: Event[];
}

export interface Event {
    id: string;
    name: string;
    description: string;
    templateId: string;
    emailConfirmationMessage: string;
    capacity: number;
    startTime: string;
    endTime: string;
    resources: Resource[];
    priceList: PriceList;
    resourceDetails: any[];
    scheduleId: string;
    salesRestrictions: string[];
    ticketDetails: TicketDetails;
    manuallyDeleted: boolean;
    fieldStatus: FieldStatus;
    originalFields: { startTime: string; endTime: string; flexPays: any };
    emailCancellationMessage: string;
    state: string;
    ticketConfig: { printerConfigs: any[]; assigned: boolean };
    customFields: { name: string; value: string }[];
    offSchedule: boolean;
    colorCategory: { backgroundColor: string; textColor: string };
    images: {
        id: string;
        primary: boolean;
        thumbnail: string;
        highRes: string;
        screen: string;
        preview: string;
    }[];
    soldQuantity: number;
    salesChannels: { name: string; channel: string; enabled: boolean }[];
    type: string;
    checkInCount: number;
    available: boolean;
    admissionType: string;
    lastModified: string;
    eventResourceSummary: EventResourceSummary;
}

interface EventResourceSummaryValue {
    resourceCategory: string;
    totalRequestsCount: number;
    fulfilledRequestsCount: number;
    resourceNames: string[];
}

interface EventResourceSummary {
    people: EventResourceSummaryValue;
    place: EventResourceSummaryValue;
    equipment: EventResourceSummaryValue;
    totalRequestsCount: number;
    fulfilledRequestsCount: number;
    resourceFulfillmentStatus: string;
    hasResourceRequests: boolean;
}

interface FieldStatusValue {
    modified: boolean;
    locked: boolean;
}

interface FieldStatus {
    name: FieldStatusValue;
    description: FieldStatusValue;
    emailConfirmationMessage: FieldStatusValue;
    capacity: FieldStatusValue;
    startTime: FieldStatusValue;
    endTime: FieldStatusValue;
    priceList: FieldStatusValue;
    resources: FieldStatusValue;
    ticketDetails: FieldStatusValue;
    images: FieldStatusValue;
    shortDescription: FieldStatusValue;
    flexPays: FieldStatusValue;
    emailCancellationMessage: FieldStatusValue;
    ticketConfig: FieldStatusValue;
    orderForms: FieldStatusValue;
    customFields: FieldStatusValue;
    ticketDurationDays: FieldStatusValue;
    modified: boolean;
}

interface TicketDetails {
    ticketDurationDays: number;
    checkInWindow: {
        minutesBefore: number;
        minutesAfter: number;
        blockScan: boolean;
        autoRebook: boolean;
    };
    postStartPurchase: {
        allowLateTicketPurchase: boolean;
        minutesAfter: number;
    };
    purchaseAvailability: {
        timeFrame: string;
        minutes: number;
    };
    ticketPrintLines: string[];
    doNotPrint: boolean;
    expireFromEventDate: boolean;
    hideEventDate: boolean;
}

interface PriceList {
    prices: Price[];
    priceListId: string;
}

interface Price {
    personType: {
        id: string;
        name: string;
        description: string;
        active: boolean;
        type: string;
        displayOrder: number;
    };
    price: number;
    salesChannels: {
        name: string;
        channel: string;
        enabled: boolean;
    }[];
    displayOrder: number;
    discountedPrice: number;
    discount: number;
}

interface Resource {
    resourceTemplateId: string;
    resourceTemplateName: string;
    type: string;
    quantity: number;
    resourceCategory: string;
    values: any[];
    resourceStartTime: string;
    resourceEndTime: string;
    eventScheduleResourceRequestId: string;
    notes: string;
    eventResourceId: string;
    eventResourceRequestType: string;
    eventResourceRequestId: string;
}

export interface ListEventSummariesPayload {
    list: EventSummary[];
}

export interface EventSummary {
    id: string;
    templateId: string;
    startTime: string;
    endTime: string;
    name: string;
    sold: number;
    available: number;
    checkedIn: number;
    reserved: number;
    type: string;
    admissionType: string;

    fieldStatus: { [key: string]: { modified: boolean; locked: boolean } }[];
    originalFields: { startTime: string; endTime: string; flexPays: any };
    state: string;
    scheduleName: string;
    customFields: { name: string; value: string }[];

    offSchedule: boolean;
    colorCategory: { backgroundColor: string; textColor: string };
}

export interface EventTemplateSummariesPayload {
    list: EventTemplateSummary[];
    pagination: IPaginationResponseSettings;
}

export interface EventTemplateSummary {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    primaryImage: Images;
    admissionType: "generalAdmission" | "standard";
    startTime: string;
    endTime: string;
    priceLists: {
        id: string;
        name: string;
        description: string;
        prices: PriceList["prices"];
        startTime: string;
    }[];
    reviewState: "draft" | "published";
    soldQuantity: number;
    ticketDetails: TicketDetails;
    customFields: { name: string; value: string }[];
    colorCategory: { backgroundColor: string; textColor: string };
    ratings: number;
    stars: number;
}

export interface Images {
    id: string;
    primary: boolean;
    thumbnail: string;
    highRes: string;
    screen: string;
    preview: string;
}
