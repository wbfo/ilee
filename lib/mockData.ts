
export interface Review {
    id: string;
    name: string;
    rating: number; // 1-5
    text: string;
    deliveryType?: "Standard" | "Express";
    status: "Approved" | "Pending" | "Rejected";
    createdAt: string;
    orderId?: string;
}

export interface Order {
    id: string;
    customer: string;
    status: "Pending Confirmation" | "Confirmed" | "Dispatched" | "Delivered";
    total: number;
    items: string;
    deliverySpeed: "Standard" | "Express";
    expressFee?: number; // $75 for Express orders
    date: string;
    invoiceSentAt?: string;
    invoiceMethod?: "Square" | "Zelle" | "Card" | "Other";
}

export const initialReviews: Review[] = [
    {
        id: "1",
        name: "Sarah J.",
        rating: 5,
        text: "Incredible service! The Express delivery really works—got my water in less than 24 hours. Worth the $75 fee!",
        deliveryType: "Express",
        status: "Approved",
        createdAt: "2023-10-15T10:00:00Z",
    },
    {
        id: "2",
        name: "Mike T.",
        rating: 4,
        text: "Good reliable delivery. The driver was very helpful carrying the jugs upstairs.",
        deliveryType: "Standard",
        status: "Approved",
        createdAt: "2023-10-12T14:30:00Z",
    },
    {
        id: "3",
        name: "Jessica L.",
        rating: 5,
        text: "Love supporting a local business. Always on time.",
        deliveryType: "Standard",
        status: "Approved",
        createdAt: "2023-09-28T09:15:00Z",
    },
    {
        id: "4",
        name: "David B.",
        rating: 3,
        text: "Delivery was okay but a bit late.",
        status: "Pending", // For admin demo
        createdAt: "2023-10-18T11:00:00Z",
    }
];

export const initialOrders: Order[] = [
    {
        id: "ORD-001",
        customer: "Alice Smith",
        status: "Pending Confirmation",
        total: 120.00, // $45 base + $75 express fee
        items: "3x 5-Gallon Jugs",
        deliverySpeed: "Express",
        expressFee: 75,
        date: "2023-10-19T08:00:00Z",
    },
    {
        id: "ORD-002",
        customer: "Bob Jones",
        status: "Confirmed",
        total: 120.00,
        items: "10x Case 16.9oz",
        deliverySpeed: "Standard",
        date: "2023-10-18T15:00:00Z",
        invoiceSentAt: "2023-10-18T16:00:00Z",
        invoiceMethod: "Square",
    },
    {
        id: "ORD-003",
        customer: "Charlie Day",
        status: "Pending Confirmation",
        total: 135.00, // $60 base + $75 express fee
        items: "4x 5-Gallon Jugs",
        deliverySpeed: "Express",
        expressFee: 75,
        date: "2023-10-19T09:30:00Z",
    }
];
