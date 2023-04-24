-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StoryOnTopic" (
    "storyId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    PRIMARY KEY ("storyId", "topicId"),
    CONSTRAINT "StoryOnTopic_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoryOnTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StoryOnReaction" (
    "storyId" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,

    PRIMARY KEY ("storyId", "reactionId"),
    CONSTRAINT "StoryOnReaction_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoryOnReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "Reaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StoryBlockedByAuthor" (
    "storyId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    PRIMARY KEY ("storyId", "authorId"),
    CONSTRAINT "StoryBlockedByAuthor_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoryBlockedByAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StoryInAuthorCollections" (
    "storyId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    PRIMARY KEY ("storyId", "authorId"),
    CONSTRAINT "StoryInAuthorCollections_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoryInAuthorCollections_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StoryInAuthorBookmarked" (
    "storyId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    PRIMARY KEY ("storyId", "authorId"),
    CONSTRAINT "StoryInAuthorBookmarked_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoryInAuthorBookmarked_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StoryInAuthorPinned" (
    "storyId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    PRIMARY KEY ("storyId", "authorId"),
    CONSTRAINT "StoryInAuthorPinned_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoryInAuthorPinned_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "viewed" INTEGER NOT NULL,
    "thumbnailURL" TEXT NOT NULL,
    "readingTime" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Story_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarURL" TEXT NOT NULL,
    "bio" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BlockedAuthor" (
    "blockedAuthorId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "BlockedAuthor_blockedAuthorId_fkey" FOREIGN KEY ("blockedAuthorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscribe" (
    "subscribeId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Subscribe_subscribeId_fkey" FOREIGN KEY ("subscribeId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Follow" (
    "followedById" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    PRIMARY KEY ("followedById", "followingId"),
    CONSTRAINT "Follow_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Author_username_key" ON "Author"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
