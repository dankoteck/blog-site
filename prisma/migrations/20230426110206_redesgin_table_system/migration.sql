/*
  Warnings:

  - You are about to drop the `_authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_authors2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_authors";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_authors2";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_AuthorBlocked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AuthorBlocked_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AuthorBlocked_B_fkey" FOREIGN KEY ("B") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AuthorFollow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AuthorFollow_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AuthorFollow_B_fkey" FOREIGN KEY ("B") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AuthorSubscribe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AuthorSubscribe_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AuthorSubscribe_B_fkey" FOREIGN KEY ("B") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorBlocked_AB_unique" ON "_AuthorBlocked"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorBlocked_B_index" ON "_AuthorBlocked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorFollow_AB_unique" ON "_AuthorFollow"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorFollow_B_index" ON "_AuthorFollow"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorSubscribe_AB_unique" ON "_AuthorSubscribe"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorSubscribe_B_index" ON "_AuthorSubscribe"("B");
