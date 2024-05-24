-- CreateTable
CREATE TABLE "Flight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "class" TEXT NOT NULL
);
