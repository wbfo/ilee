export type PurchaseType = "Cases" | "Half Pallet" | "Full Pallet" | "Mixed Pallet"
export type Category = "water-beverages" | "facility-office" | "construction-materials" | "bulk-pallets"

export interface Product {
    id: string
    slug: string
    name: string
    brand: string
    category: Category
    purchaseType: PurchaseType
    price: number // Includes standard delivery
    priceLabel?: string // Overrides price display if set
    packDetails: string
    description: string
    image?: string
    inStock: boolean
    tags?: string[]
    sourceUrl?: string
}

export const products: Product[] = [
    {
        id: "niagara-24pk-full-pallet",
        slug: "niagara-purified-water-16oz-24pk-full-pallet",
        name: "Niagara Purified Drinking Water (16.9 oz) 24pk - Full Pallet",
        brand: "Niagara",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 490.00,
        packDetails: "Full Pallet • 24 bottles per case • 84 cases • 2,016 bottles",
        description: "Premium purified drinking water in 24-pack cases. Ideal for high-volume needs, events, or office stocking. Standard delivery included.",
        image: "/products/niagara-24pk.jpg",
        inStock: true,
        tags: ["water", "purified", "pallet"],
    },
    {
        id: "niagara-40pk-full-pallet",
        slug: "niagara-purified-water-16oz-40pk-full-pallet",
        name: "Niagara Purified Drinking Water (16.9 oz) 40pk - Full Pallet",
        brand: "Niagara",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 490.00,
        packDetails: "Full Pallet • 40 bottles per case • 48 cases • 1,920 bottles",
        description: "Cost-effective 40-pack cases of Niagara purified water. Great value for bulk buyers. Standard delivery included.",
        image: "/products/niagara-40pk.png",
        inStock: true,
        tags: ["water", "purified", "pallet", "value"],
    },
    {
        id: "pure-life-full-pallet",
        slug: "pure-life-16oz-full-pallet",
        name: "Pure Life (16.9 oz) - Full Pallet",
        brand: "Pure Life",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 525.00,
        packDetails: "Full Pallet • 40 bottles per case • 48 cases • 1,920 bottles",
        description: "Nestlé Pure Life purified water. Enhanced with minerals for a crisp, refreshing taste. Standard delivery included.",
        image: "/products/pure-life-pallet.jpg",
        inStock: true,
        tags: ["water", "purified", "nestle"],
    },
    {
        id: "beverage-variety-pallet",
        slug: "beverage-variety-pallet",
        name: "Beverage Variety Pallet - MM, Coca Cola, Diet Coke, Sprite",
        brand: "Mixed Brands",
        category: "water-beverages",
        purchaseType: "Mixed Pallet",
        price: 759.99,
        packDetails: "Mixed pallet • Member’s Mark 16.9oz 40pk (24 cases) + Coca Cola 12oz 35pk (7 cases) + Diet Coke 12oz 35pk (7 cases) + Sprite 12oz 35pk (7 cases)",
        description: "The ultimate office or event starter pack. Includes water and a selection of popular sodas. Standard delivery included.",
        image: "/products/variety-pallet.jpg",
        inStock: true,
        tags: ["soda", "mixed", "coke", "sprite"],
    },
    // NEW PRODUCTS
    {
        id: "poland-spring-full-pallet",
        slug: "poland-spring-natural-spring-water-16-9-oz-full-pallet",
        name: "Poland Spring Natural Spring Water (16.9 oz) - Full Pallet",
        brand: "Poland Spring",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 499.99,
        packDetails: "Full Pallet • 40 bottles per case • 48 cases • 1,920 bottles",
        description: "100% natural spring water sourced from Maine. A refreshing and trusted choice for offices and events.",
        image: "/products/poland-spring-pallet.png",
        inStock: true,
        sourceUrl: "https://waterpallets.com/search-products/Poland-Spring-Natural-Spring-Water-16-9-Full-Pallet-p723508202",
        tags: ["water", "spring", "natural"],
    },
    {
        id: "members-mark-full-pallet",
        slug: "members-mark-purified-water-16-9-oz-full-pallet",
        name: "Member’s Mark Purified Water (16.9 oz) - Full Pallet",
        brand: "Member's Mark",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 450.00,
        packDetails: "Full Pallet • 40 bottles per case • 48 cases • 1,920 bottles",
        description: "Exceptional value purified water. Perfect for high-volume consumption and daily hydration needs.",
        image: "/products/members-mark-pallet.png",
        inStock: true,
        sourceUrl: "https://waterpallets.com/store/Members-Mark-16-9-oz-Full-Pallet-p587424920",
        tags: ["water", "purified", "value"],
    },
    {
        id: "kirkland-signature-full-pallet",
        slug: "kirkland-signature-purified-water-16-9-oz-full-pallet",
        name: "Kirkland Signature Purified Water (16.9 oz) - Full Pallet",
        brand: "Kirkland",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 475.00,
        packDetails: "Full Pallet • 40 bottles per case • 48 cases • 1,920 bottles",
        description: "High-quality purified water with minerals added for taste. A consistent and popular choice.",
        image: "/products/kirkland-pallet.png",
        inStock: true,
        sourceUrl: "https://waterpallets.com/store/Kirkland-Signature-16-9-oz-Full-Pallet-p632319748",
        tags: ["water", "purified", "costco"],
    },
    {
        id: "generic-water-pallet",
        slug: "generic-mixed-brand-water-full-pallet",
        name: "Generic / Mixed Brand Water - Full Pallet",
        brand: "Generic",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 0,
        priceLabel: "Call for quote",
        packDetails: "Full Pallet • Varies by availability",
        description: "Cost-effective water solution featuring available market brands. Call for specific brand availability.",
        image: "/products/generic-water-pallet.png",
        inStock: true,
        tags: ["water", "generic", "mixed"],
    },
    {
        id: "mexican-coca-cola-pallet",
        slug: "mexican-coca-cola-pallet",
        name: "Mexican Coca-Cola - Pallet",
        brand: "Coca-Cola",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 0,
        priceLabel: "Call for quote",
        packDetails: "Glass Bottles • Cane Sugar • Pallet qty varies",
        description: "Classic Coca-Cola made with real cane sugar. Imported in iconic glass bottles.",
        image: "/products/mexican-coke-pallet.png",
        inStock: true,
        tags: ["soda", "coke", "sugar"],
    },
    {
        id: "members-mark-copy-paper",
        slug: "members-mark-multipurpose-copy-paper-full-pallet",
        name: "Member’s Mark Multipurpose Copy Paper - Full Pallet",
        brand: "Member's Mark",
        category: "facility-office",
        purchaseType: "Full Pallet",
        price: 1999.99,
        packDetails: "40 Cases • 500 Sheets/Ream • 10 Reams/Case",
        description: "High-quality multipurpose paper for all office printing needs. Bright, jam-free performance.",
        image: "/products/copy-paper-pallet.png",
        inStock: true,
        sourceUrl: "https://waterpallets.com/store/",
        tags: ["paper", "office", "copy"],
    },
    {
        id: "armstrong-ceiling-tiles",
        slug: "armstrong-ceiling-tiles-pallet",
        name: "Armstrong Ceiling Tiles - Pallet",
        brand: "Armstrong",
        category: "construction-materials",
        purchaseType: "Full Pallet",
        price: 0,
        priceLabel: "Call for quote",
        packDetails: "Full Pallet • Standard 2x2 or 2x4 available",
        description: "Professional-grade acoustic ceiling tiles. Ideal for commercial and office renovation projects.",
        image: "/products/ceiling-tiles-pallet.png",
        inStock: true,
        tags: ["ceiling", "tiles", "construction"],
    },
    {
        id: "morton-water-softener",
        slug: "morton-clean-protect-water-softener-pellets-full-pallet",
        name: "Morton Clean & Protect Water Softener Pellets (44lb) - Full Pallet",
        brand: "Morton",
        category: "facility-office",
        purchaseType: "Full Pallet",
        price: 699.99,
        packDetails: "Full Pallet • 44lb Bags • 63 Bags/Pallet",
        description: "Premium water softener pellets to extend the life of appliances and pipes. Clean & Protect formula.",
        image: "/products/morton-salt-pallet.png",
        inStock: true,
        sourceUrl: "https://waterpallets.com/store/",
        tags: ["salt", "softener", "facility"],
    },
    {
        id: "generic-salt-pellets",
        slug: "generic-water-softener-salt-pellets-full-pallet",
        name: "Generic Water Softener Salt Pellets - Full Pallet",
        brand: "Generic",
        category: "facility-office",
        purchaseType: "Full Pallet",
        price: 0,
        priceLabel: "Call for quote",
        packDetails: "Full Pallet • 40lb or 50lb Bags",
        description: "Standard grade water softener salt pellets. Reliable and cost-effective bulk solution.",
        image: "/products/generic-salt-pallet.png",
        inStock: true,
        tags: ["salt", "softener", "generic"],
    },
    {
        id: "premium-play-sand",
        slug: "premium-play-sand-pallet",
        name: "Premium Play Sand - Pallet",
        brand: "Generic",
        category: "construction-materials",
        purchaseType: "Full Pallet",
        price: 0,
        priceLabel: "Call for quote",
        packDetails: "Full Pallet • 50lb Bags • 49 Bags/Pallet",
        description: "Clean, washed, and screened play sand. Safe for playgrounds, sandboxes, and landscaping.",
        image: "/products/play-sand-pallet.png",
        inStock: true,
        tags: ["sand", "play", "landscaping"],
    },
    {
        id: "gatorade-variety-pack-pallet",
        slug: "gatorade-variety-pack-pallet-20oz-54-cases",
        name: "Gatorade Variety Pack Pallet (20 oz) - 54 Cases",
        brand: "Gatorade",
        category: "water-beverages",
        purchaseType: "Full Pallet",
        price: 1499.99,
        packDetails: "Full Pallet • 20 oz bottles • 54 cases • 1,296 bottles",
        description: "Bulk wholesale electrolyte sports drink variety pack. Includes Fruit Punch, Lemon-Lime, and Orange flavors. Perfect for vending machines, offices, or sports teams.",
        image: "/products/gatorade-pallet.png",
        inStock: true,
        tags: ["gatorade", "electrolyte", "sports drink", "pallet", "bulk"],
    },
]

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: Category | null): Product[] {
    if (!category) return products
    return products.filter(p => p.category === category)
}

export function getProductsByBrand(brand: string | null): Product[] {
    if (!brand) return products
    return products.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
}

export function getProductsByPurchaseType(type: PurchaseType | null): Product[] {
    if (!type) return products
    return products.filter(p => p.purchaseType === type)
}
