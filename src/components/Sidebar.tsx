import { Box, Heading, Link, Tag, VStack } from "@chakra-ui/react";
import { type Topic } from "@prisma/client";

type Props = {
  topics: Topic[] | undefined;
};

export default function Sidebar({ topics }: Props) {
  return (
    <VStack>
      <Heading size="md">Recommended Topics</Heading>
      <Box textAlign="center">
        {topics?.map((topic) => (
          <Link key={topic.id} href={`/topic/${topic.id}`}>
            <Tag
              px={4}
              m={1}
              ml={0}
              size="lg"
              borderRadius="xl"
              colorScheme="twitter"
            >
              {topic.name}
            </Tag>
          </Link>
        ))}
      </Box>
    </VStack>
  );
}
