// import Image from "next/image";
import { Box, HStack, Img, Tag, Text, VStack } from "@chakra-ui/react";
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

function ListItem({ item }: ItemProps) {
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
      <HStack spacing={8} alignItems="flex-start">
        {/* Thumbnail */}
        <Img
          w="64"
          h="64"
          borderRadius="md"
          alt={`thumbnail-${item.title}`}
          src={item.thumbnailURL ?? ""}
        />

        <VStack alignItems="flex-start" spacing={4}>
          <HStack w="full">
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
            <Text fontSize="sm" color="gray.500">
              &bull;
            </Text>

            {/* Story created at datetime */}
            <Text fontSize="sm" color="gray.500">
              {moment(item.createdAt).format("ddd MM")}
            </Text>
          </HStack>

          {/* Link to story details */}
          <Link href={`/story/${item.id}`}>
            <Text pb={2} fontSize="xl" fontWeight="bold" noOfLines={2}>
              {item.title}
            </Text>

            <Text fontSize="md" noOfLines={3}>
              {item.content}
            </Text>
          </Link>

          {/* Author info */}
          <Box
            borderTop={1}
            borderTopColor="gray.200"
            borderTopStyle="solid"
            w="full"
            pt={4}
          >
            <AuthorInfo author={item.author} />
          </Box>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default function ListStories({ items }: Props) {
  return (
    <VStack alignItems="flex-start">
      {items?.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </VStack>
  );
}
