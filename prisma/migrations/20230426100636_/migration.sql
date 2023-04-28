/*
  Warnings:

  - You are about to drop the column `storyId` on the `Topic` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "StoryTopic" (
    "storyId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    PRIMARY KEY ("storyId", "topicId"),
    CONSTRAINT "StoryTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoryTopic_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Topic" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Topic";
DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
