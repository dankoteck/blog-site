/*
  Warnings:

  - You are about to drop the `AuthorFollowsTopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlockedAuthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FollowsAuthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryBlocked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryInAuthorBookmarked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryInAuthorCollections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryInAuthorPinned` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryReaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscribeAuthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StoryToTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AuthorFollowsTopic";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BlockedAuthor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FollowsAuthor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StoryBlocked";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StoryInAuthorBookmarked";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StoryInAuthorCollections";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StoryInAuthorPinned";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StoryReaction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SubscribeAuthor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_StoryToTopic";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_StoryReaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StoryReaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Reaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StoryReaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TopicStory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TopicStory_A_fkey" FOREIGN KEY ("A") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TopicStory_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_authors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_authors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_authors_B_fkey" FOREIGN KEY ("B") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_authors2" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_authors2_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_authors2_B_fkey" FOREIGN KEY ("B") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StoryBlocked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StoryBlocked_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StoryBlocked_B_fkey" FOREIGN KEY ("B") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StoryBookmarked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StoryBookmarked_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StoryBookmarked_B_fkey" FOREIGN KEY ("B") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StoryCollections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StoryCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StoryCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StoryPinned" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StoryPinned_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StoryPinned_B_fkey" FOREIGN KEY ("B") REFERENCES "Story" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TopicAuthorFollowed" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TopicAuthorFollowed_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TopicAuthorFollowed_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_StoryReaction_AB_unique" ON "_StoryReaction"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryReaction_B_index" ON "_StoryReaction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TopicStory_AB_unique" ON "_TopicStory"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicStory_B_index" ON "_TopicStory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_authors_AB_unique" ON "_authors"("A", "B");

-- CreateIndex
CREATE INDEX "_authors_B_index" ON "_authors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_authors2_AB_unique" ON "_authors2"("A", "B");

-- CreateIndex
CREATE INDEX "_authors2_B_index" ON "_authors2"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoryBlocked_AB_unique" ON "_StoryBlocked"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryBlocked_B_index" ON "_StoryBlocked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoryBookmarked_AB_unique" ON "_StoryBookmarked"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryBookmarked_B_index" ON "_StoryBookmarked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoryCollections_AB_unique" ON "_StoryCollections"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryCollections_B_index" ON "_StoryCollections"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoryPinned_AB_unique" ON "_StoryPinned"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryPinned_B_index" ON "_StoryPinned"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TopicAuthorFollowed_AB_unique" ON "_TopicAuthorFollowed"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicAuthorFollowed_B_index" ON "_TopicAuthorFollowed"("B");
