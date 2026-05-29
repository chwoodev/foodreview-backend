-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- CreateTable
CREATE TABLE "Stat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sumTaste" INTEGER NOT NULL DEFAULT 0,
    "sumAmount" INTEGER NOT NULL DEFAULT 0,
    "sumPrice" INTEGER NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "menuId" INTEGER,
    "restaurantId" INTEGER,
    CONSTRAINT "Stat_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Stat_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Move existing aggregate values into Stat.
INSERT INTO "Stat" ("sumTaste", "sumAmount", "sumPrice", "reviewCount", "menuId")
SELECT "sumTaste", "sumAmount", "sumPrice", "reviewCount", "id" FROM "Menu";

INSERT INTO "Stat" ("sumTaste", "sumAmount", "sumPrice", "reviewCount", "restaurantId")
SELECT "sumTaste", "sumAmount", "sumPrice", "reviewCount", "id" FROM "Restaurant";

CREATE TABLE "new_Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageData" TEXT NOT NULL
);
INSERT INTO "new_Restaurant" ("id", "imageData", "name")
SELECT "id", "imageData", "name" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";

CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    CONSTRAINT "Menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("id", "name", "restaurantId")
SELECT "id", "name", "restaurantId" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";

-- CreateIndex
CREATE UNIQUE INDEX "Stat_menuId_key" ON "Stat"("menuId");
CREATE UNIQUE INDEX "Stat_restaurantId_key" ON "Stat"("restaurantId");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
