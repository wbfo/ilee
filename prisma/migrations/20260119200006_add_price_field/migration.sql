-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "palletType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "casesPerPallet" INTEGER NOT NULL,
    "bottlesPerCase" INTEGER NOT NULL,
    "bottleSize" TEXT NOT NULL,
    "totalBottles" INTEGER NOT NULL,
    "weight" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "imageUrl" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("bottleSize", "bottlesPerCase", "brand", "casesPerPallet", "category", "createdAt", "description", "dimensions", "featured", "id", "imageUrl", "inStock", "name", "palletType", "slug", "totalBottles", "updatedAt", "weight") SELECT "bottleSize", "bottlesPerCase", "brand", "casesPerPallet", "category", "createdAt", "description", "dimensions", "featured", "id", "imageUrl", "inStock", "name", "palletType", "slug", "totalBottles", "updatedAt", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
