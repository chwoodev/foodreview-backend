-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Auth" (
    "userId" INTEGER NOT NULL PRIMARY KEY,
    "passwordHash" TEXT NOT NULL,
    "refreshToken" TEXT,
    CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Move existing credentials out of User.
INSERT INTO "Auth" ("userId", "passwordHash", "refreshToken")
SELECT "id", "passwordHash", "refreshToken" FROM "User";

INSERT INTO "new_User" ("id", "isAdmin", "username") SELECT "id", "isAdmin", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
