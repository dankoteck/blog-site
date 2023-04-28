import {
  Avatar,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { TagIcon } from "@heroicons/react/20/solid";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import SuperJSON from "superjson";

import ListStories from "@/components/ListStories";
import Sidebar from "@/components/Sidebar";

import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { prisma } from "@/server/db";

import { api } from "@/utils";
import { useSession } from "next-auth/react";

export async function getStaticPaths() {
  const topics = await prisma.topic.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: topics.map((topic) => ({
      params: {
        id: topic.id,
      },
    })),
    // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: createInnerTRPCContext(),
  });
  const id = context.params?.id as string;

  // All prefetches goes here
  await helpers.topic.byId.prefetch(id);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export default function TopicPosts({
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: topicData } = api.topic.byId.useQuery(id);
  const { data: session } = useSession();
  const utils = api.useContext();
  const toggleFollowingTopic = api.author.subscribeTopic.useMutation({
    async onMutate() {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.topic.byId.cancel();

      // Get the data from the queryCache
      const prevData = utils.topic.byId.getData();

      // Optimistically update the data with our new post
      // utils.topic.byId.setData(undefined, (old) => [...old, newPost]);

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    // onError(err, newPost, ctx) {
    //   // If the mutation fails, use the context-value from onMutate
    //   utils.topic.byId.setData(undefined, ctx.prevData);
    // },
    // onSettled() {
    //   // Sync with server once mutation has settled
    //   utils.topic.byId.invalidate({});
    // },
  });
  const name = topicData?.name ?? "";
  const stories = topicData?.stories ?? [];
  const authorFollowings = topicData?.authorFollowings ?? [];
  const user = session?.user;
  const isFollowing = authorFollowings.some(
    (author) => author.userId === user?.id
  );

  const onToggleFollow = () => {
    toggleFollowingTopic.mutate(id);
  };

  return (
    <Container maxW="container.xl" centerContent>
      <Grid w="full" h="100vh" templateColumns="repeat(12, 1fr)">
        <GridItem
          colSpan={4}
          borderRight={1}
          borderRightStyle="solid"
          borderRightColor="gray.300"
        >
          <Sidebar
            //   topics={relatedTopics}
            topics={[]}
          />
        </GridItem>

        <GridItem colSpan={8} p={8}>
          {/* Header */}
          <VStack alignItems="flex-start">
            <HStack spacing={4}>
              <Avatar
                width="12"
                height="12"
                icon={<TagIcon className="h-8 w-8" />}
              />
              <Heading>{name}</Heading>
              <Button
                size="sm"
                borderRadius="xl"
                colorScheme="green"
                variant={isFollowing ? "outline" : "solid"}
                onClick={onToggleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                size="sm"
                borderRadius="xl"
                colorScheme="green"
                variant="outline"
              >
                Start writing
              </Button>
            </HStack>

            <ListStories items={stories} />
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
