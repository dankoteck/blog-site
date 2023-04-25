import { getReadTime } from "@/utils/story";
import { type Prisma } from "@prisma/client";

function createTopics(
  index: "01" | "02"
): Prisma.StoryTopicCreateWithoutStoryInput[] {
  const topics = {
    "01": [
      { topic: { create: { name: "Technology" } } },
      { topic: { create: { name: "Science" } } },
      { topic: { create: { name: "React" } } },
    ],
    "02": [
      { topic: { create: { name: "Programming" } } },
      { topic: { create: { name: "Security" } } },
      { topic: { create: { name: "Tips & Tricks" } } },
      { topic: { create: { name: "Tutorials" } } },
    ],
  };

  return topics[index];
}

function createStory(): Prisma.StoryCreateWithoutAuthorInput[] {
  const lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  return [
    {
      title: "The first story",
      content: lorem,
      readingTime: getReadTime(lorem).humanizedDuration,
      topics: {
        create: createTopics("01"),
      },
    },
    {
      title: "The second story",
      content: lorem,
      readingTime: getReadTime(lorem).humanizedDuration,
      topics: {
        create: createTopics("02"),
      },
    },
  ];
}

export function createAuthor(userId: string): Prisma.AuthorCreateInput {
  return {
    user: { connect: { id: userId } },
    bio: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    username: "@lekhoa",
    stories: {
      create: createStory(),
    },
  };
}
