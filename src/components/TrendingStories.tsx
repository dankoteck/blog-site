// import Image from "next/image";
import { HStack, Heading, Img, Tag, Text, VStack } from "@chakra-ui/react";
import type { Author, Story, Topic, User } from "@prisma/client";
import moment from "moment";
import AuthorInfo from "./AuthorInfo";
import Link from "./Link";

type StoryItem = Story & {
  topics: Topic[];
  author: Author & {
    user: User;
  };
};

type Props = {
  items: StoryItem[] | undefined;
};

type ItemProps = {
  item: StoryItem;
};

function TrendingItem({ item }: ItemProps) {
  return (
    <VStack
      key={item.id}
      p={7}
      spacing={4}
      alignItems="flex-start"
      _notLast={{
        borderBottom: 1,
        borderBottomColor: "gray.200",
        borderBottomStyle: "solid",
      }}
    >
      <AuthorInfo author={item.author} />

      {/* Goto story details */}
      <Link href={`/story/${item.id}`}>
        <VStack spacing={8}>
          <Img
            borderRadius="3xl"
            alt={`thumbnail-${item.title}`}
            src={(item.thumbnailURL as string) ?? ""}
          />

          <VStack alignItems="flex-start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              {item.title}
            </Text>

            <Text noOfLines={4}>{item.content}</Text>
          </VStack>
        </VStack>
      </Link>

      <HStack w="full" className="!mt-8">
        {/* Story created at datetime */}
        <Text fontSize="sm" color="gray.500">
          {moment(item.createdAt).format("ddd MM, YYYY")}
        </Text>

        {/* Dot entity */}
        <span className="text-sm text-slate-600">&bull;</span>

        {/* List of tags (topics) */}
        {item.topics?.map((topic) => (
          <Link display="flex" key={topic.id} href={`/topic/${topic.id}`}>
            <Tag
              w="fit-content"
              size="sm"
              borderRadius="xl"
              colorScheme="twitter"
            >
              {topic.name}
            </Tag>
          </Link>
        ))}

        {/* Dot entity */}
        <span className="text-sm text-slate-600">&bull;</span>

        {/* Estimated reading time */}
        <Text justifyContent="flex-end" fontSize="sm">
          {item.readingTime} read
        </Text>
      </HStack>
    </VStack>
  );
}

export default function TrendingStories({ items }: Props) {
  return (
    <VStack alignItems="flex-start">
      {/* Header */}
      <VStack alignItems="flex-start">
        <Heading>Trending</Heading>
        <Text fontSize="xl">What people are interested right now</Text>
      </VStack>

      {items?.map((item) => (
        <TrendingItem item={item} key={item.id} />
      ))}
    </VStack>
  );
}
