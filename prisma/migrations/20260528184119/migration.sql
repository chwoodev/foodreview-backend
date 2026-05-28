/*
  Warnings:

  - Added the required column `imageData` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageData" TEXT NOT NULL,
    "sumTaste" INTEGER NOT NULL DEFAULT 0,
    "sumAmount" INTEGER NOT NULL DEFAULT 0,
    "sumPrice" INTEGER NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Restaurant" ("id", "name", "reviewCount", "sumAmount", "sumPrice", "sumTaste") SELECT "id", "name", "reviewCount", "sumAmount", "sumPrice", "sumTaste" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
