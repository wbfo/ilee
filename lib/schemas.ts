import * as z from "zod"

export const orderFormSchema = z.object({
    // Customer
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    email: z.string().email().optional().or(z.literal("")),

    // Delivery
    address1: z.string().min(5, "Address is required"),
    address2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().default("NY"),
    zip: z.string().min(5, "ZIP is required"),

    deliveryType: z.enum(["On-Demand", "Scheduled", "Recurring"]),
    deliverySpeed: z.enum(["Standard", "Express"]),

    // Scheduled Delivery Fields
    scheduledDate: z.string().optional(),
    scheduledTime: z.enum(["Morning", "Afternoon", "Evening"]).optional(),

    // Recurring Delivery Fields
    recurringFrequency: z.enum(["Weekly", "Bi-Weekly", "Monthly"]).optional(),
    recurringDay: z.string().optional(), // e.g., "Monday" - could be enum but string is flexible
    recurringTime: z.enum(["Morning", "Afternoon", "Evening"]).optional(),

    notes: z.string().optional(),

    // Order Details
    brand: z.enum(["Poland Spring", "Nestlé Pure Life", "Member’s Mark", "Other"]),
    otherBrand: z.string().optional(),

    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    size: z.enum(["16.9oz bottles", "1L", "5-gallon", "Other"]),

    dispenserRental: z.enum(["Yes", "No"]).optional(),
}).refine((data) => {
    if (data.brand === "Other" && !data.otherBrand) {
        return false
    }
    return true
}, {
    message: "Please specify the brand",
    path: ["otherBrand"],
}).refine((data) => {
    if (data.deliveryType === "Scheduled" && !data.scheduledDate) {
        return false
    }
    return true
}, {
    message: "Please select a date",
    path: ["scheduledDate"],
}).refine((data) => {
    if (data.deliveryType === "Recurring" && (!data.recurringFrequency || !data.recurringDay)) {
        return false
    }
    return true
}, {
    message: "Please complete recurring delivery details",
    path: ["recurringFrequency"], // Highlight frequency as proxy
})

export type OrderFormValues = z.infer<typeof orderFormSchema>

export const reviewSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email for verification").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone number is required for verification").optional().or(z.literal("")),
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, "Please share more about your experience"),
    deliveryType: z.enum(["Standard", "Express"]).optional(),
    orderId: z.string().optional(),
}).refine(data => data.email || data.phone, {
    message: "Either email or phone is required for verification",
    path: ["email"], // Attach error to email
})

export type ReviewFormValues = z.infer<typeof reviewSchema>

export const logisticsFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Phone is required"),
    email: z.string().email("Invalid email"),

    serviceType: z.enum(["Transportation", "Delivery Assistance", "Event Logistics", "Other"]),
    pickupAddress: z.string().optional(),
    dropoffAddress: z.string().optional(),
    notes: z.string().min(10, "Please provide some details about your needs"),
})

export type LogisticsFormValues = z.infer<typeof logisticsFormSchema>

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const checkoutSchema = z.object({
    // Customer
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    email: z.string().email().optional().or(z.literal("")),

    // Delivery Address
    address1: z.string().min(5, "Address is required"),
    address2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().default("NY"),
    zip: z.string().min(5, "ZIP is required"),

    // Delivery Options
    deliverySpeed: z.enum(["Standard", "Express"]),
    isRecurring: z.boolean().default(false),

    // Recurring Details (Conditional)
    recurringFrequency: z.enum(["Weekly", "Bi-Weekly", "Monthly"]).optional(),
    recurringDay: z.string().optional(),
    recurringTime: z.enum(["Morning", "Afternoon", "Evening"]).optional(),

    notes: z.string().optional(),
}).refine((data) => {
    if (data.isRecurring && (!data.recurringFrequency || !data.recurringDay)) {
        return false
    }
    return true
}, {
    message: "Please complete recurring delivery details",
    path: ["recurringFrequency"],
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>

