import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
    {
        slug: "niagara-purified-full-pallet",
        name: "Niagara Purified Drinking Water",
        brand: "Niagara",
        category: "Water & Beverages",
        palletType: "Full Pallet",
        description: "High-quality purified water suitable for all hydration needs. Eco-friendly packaging.",
        casesPerPallet: 84, // Est standard
        bottlesPerCase: 24,
        bottleSize: "16.9oz",
        totalBottles: 2016,
        weight: "2,000 lbs",
        dimensions: "48x40x60 inches",
        price: 469.99,
        imageUrl: "/images/niagara-full.jpg", // Placeholder
    },
    {
        slug: "poland-spring-full-pallet",
        name: "Poland Spring Natural Spring Water",
        brand: "Poland Spring",
        category: "Water & Beverages",
        palletType: "Full Pallet",
        description: "100% natural spring water sourced from Maine. Crisp and refreshing taste.",
        casesPerPallet: 84,
        bottlesPerCase: 24,
        bottleSize: "16.9oz",
        totalBottles: 2016,
        weight: "2,200 lbs",
        dimensions: "48x40x60 inches",
        price: 499.99,
        imageUrl: "/images/poland-spring-full.jpg",
    },
    {
        slug: "nestle-pure-life-full-pallet",
        name: "Nestlé Pure Life Purified Water",
        brand: "Nestlé Pure Life",
        category: "Water & Beverages",
        palletType: "Full Pallet",
        description: "Purified water enhanced with minerals for taste.",
        casesPerPallet: 84,
        bottlesPerCase: 24,
        bottleSize: "16.9oz",
        totalBottles: 2016,
        weight: "2,100 lbs",
        dimensions: "48x40x60 inches",
        price: 449.99,
        imageUrl: "/images/nestle-full.jpg",
    },
    {
        slug: "nestle-pure-life-half-pallet",
        name: "Nestlé Pure Life Purified Water",
        brand: "Nestlé Pure Life",
        category: "Water & Beverages",
        palletType: "Half Pallet",
        description: "Half pallet configuration of Nestlé Pure Life, perfect for smaller storage spaces.",
        casesPerPallet: 42,
        bottlesPerCase: 24,
        bottleSize: "16.9oz",
        totalBottles: 1008,
        weight: "1,050 lbs",
        dimensions: "48x40x30 inches",
        price: 229.99,
        imageUrl: "/images/nestle-half.jpg",
    },
    {
        slug: "nestle-pure-life-cases",
        name: "Nestlé Pure Life 10-Case Bundle",
        brand: "Nestlé Pure Life",
        category: "Water & Beverages",
        palletType: "Cases",
        description: "Convenient 10-case bundle for office or small event needs.",
        casesPerPallet: 10,
        bottlesPerCase: 24,
        bottleSize: "16.9oz",
        totalBottles: 240,
        weight: "250 lbs",
        dimensions: "Varied",
        price: 99.99,
        imageUrl: "/images/nestle-cases.jpg",
    },
    {
        slug: "niagara-cases",
        name: "Niagara 10-Case Bundle",
        brand: "Niagara",
        category: "Water & Beverages",
        palletType: "Cases",
        description: "10-case bundle of Niagara Purified Water. Great value.",
        casesPerPallet: 10,
        bottlesPerCase: 24,
        bottleSize: "16.9oz",
        totalBottles: 240,
        weight: "240 lbs",
        dimensions: "Varied",
        price: 89.99,
        imageUrl: "/images/niagara-cases.jpg",
    },
    {
        slug: "members-mark-half-pallet",
        name: "Member’s Mark Purified Water",
        brand: "Member’s Mark",
        category: "Water & Beverages",
        palletType: "Half Pallet",
        description: "Club store quality purified water.",
        casesPerPallet: 40,
        bottlesPerCase: 40,
        bottleSize: "16.9oz",
        totalBottles: 1600,
        weight: "1,800 lbs",
        dimensions: "48x40x35 inches",
        price: 209.99,
        imageUrl: "/images/members-mark-half.jpg",
    },
    {
        slug: "kirkland-half-pallet",
        name: "Kirkland Signature Purified Water",
        brand: "Kirkland",
        category: "Water & Beverages",
        palletType: "Half Pallet",
        description: "Premium quality purified water.",
        casesPerPallet: 40,
        bottlesPerCase: 40,
        bottleSize: "16.9oz",
        totalBottles: 1600,
        weight: "1,800 lbs",
        dimensions: "48x40x35 inches",
        price: 209.99,
        imageUrl: "/images/kirkland-half.jpg",
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: p,
            create: p,
        })
        console.log(`Upserted product with id: ${product.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
