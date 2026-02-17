export const siteConfig = {
  name: "iLee LLC",
  description: "Reliable bottled water sourcing & delivery + light logistics. Serving the Tri-State Area.",
  contact: {
    email: "ileellcrealty@gmail.com", // LOCKED - Admin contact
    phone: "718-908-2598", // LOCKED - Admin contact
    address: "New York, NY",
  },
  links: {
    instagram: "https://instagram.com/ileemoves", // Placeholder
    googleReviews: "https://google.com/", // Placeholder
  },
  announcement: "Tri-State Delivery | Express (48 hrs) available for +$75",
  expressFee: {
    enabled: true, // LOCKED - Always enabled
    type: "flat" as const,
    value: 75, // LOCKED - $75 express fee
  },
  deliveryTiming: {
    standard: "Typically up to 4 business days (may be sooner depending on delivery queue).",
    express: "Within 48 hours (prioritized).",
    confirmationNote: "All orders are confirmed before dispatch.",
  },
}
