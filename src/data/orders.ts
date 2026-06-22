export type OrderInfo = {
  status: string;
  delivered: boolean;
};

export const orders: Record<string, OrderInfo> = {
  "111": { status: "Shipped. Arriving tomorrow.", delivered: false },
  "222": { status: "Processing. Ships in 24 hours.", delivered: false },
  "333": { status: "Delivered.", delivered: true },
};

export const shippingInfo = {
  standard: "Standard shipping: 3-5 business days.",
  expedited: "Expedited shipping: 1-2 business days.",
};
