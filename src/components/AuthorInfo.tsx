import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import type { Author, User } from "@prisma/client";

import Link from "./Link";

type Props = {
  author: Author & {
    user: User;
  };
};

export default function AuthorInfo({ author }: Props) {
  return (
    <Link href={`/${author.username ?? ""}`}>
      <HStack spacing={2}>
        <Avatar
          w={10}
          h={10}
          name={author.username ?? ""}
          src={author.user.image ?? ""}
        />
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="sm" fontWeight="500">
            {author.user.name}
          </Text>
          <Text fontSize="sm" fontWeight="500" color="gray.400">
            {author.username}
          </Text>
        </VStack>
      </HStack>
    </Link>
  );
}
