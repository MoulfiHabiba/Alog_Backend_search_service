-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "flightClass" TEXT NOT NULL
);
INSERT INTO "new_Flight" ("arrivalTime", "departureTime", "description", "flightClass", "from", "id", "to") SELECT "arrivalTime", "departureTime", "description", "flightClass", "from", "id", "to" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
PRAGMA foreign_key_check("Flight");
PRAGMA foreign_keys=ON;
