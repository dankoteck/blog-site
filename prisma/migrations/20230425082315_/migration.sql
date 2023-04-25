-- CreateTable
CREATE TABLE "AuthorFollowsTopic" (
    "authorId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    PRIMARY KEY ("authorId", "topicId"),
    CONSTRAINT "AuthorFollowsTopic_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AuthorFollowsTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
