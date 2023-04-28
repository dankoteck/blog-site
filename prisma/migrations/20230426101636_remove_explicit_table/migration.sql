/*
  Warnings:

  - You are about to drop the `StoryTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StoryTopic";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_StoryToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StoryToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StoryToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_StoryToTopic_AB_unique" ON "_StoryToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryToTopic_B_index" ON "_StoryToTopic"("B");
