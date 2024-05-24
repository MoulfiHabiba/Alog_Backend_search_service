/*
  Warnings:

  - You are about to drop the column `class` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `flightClass` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "flightClass" TEXT NOT NULL
);
INSERT INTO "new_Flight" ("arrivalTime", "departureTime", "description", "from", "id", "to") SELECT "arrivalTime", "departureTime", "description", "from", "id", "to" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
PRAGMA foreign_key_check("Flight");
PRAGMA foreign_keys=ON;
