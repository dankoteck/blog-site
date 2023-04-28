import { Container, Grid, GridItem } from "@chakra-ui/react";
import { createServerSideHelpers } from "@trpc/react-query/server";

import Sidebar from "@/components/Sidebar";
import TrendingStories from "@/components/TrendingStories";
import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { api } from "@/utils";
import SuperJSON from "superjson";

export async function getStaticProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: createInnerTRPCContext(),
  });

  // All prefetches goes here
  await helpers.story.trending.prefetch();
  await helpers.topic.all.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 1,
  };
}

export default function Home() {
  const { data: trendingStories } = api.story.trending.useQuery();
  const { data: allTopics } = api.topic.all.useQuery();

  return (
    <Container maxW="container.xl" centerContent>
      <Grid w="full" h="100vh" templateColumns="repeat(12, 1fr)">
        <GridItem
          colSpan={4}
          borderRight={1}
          borderRightStyle="solid"
          borderRightColor="gray.300"
        >
          <Sidebar topics={allTopics} />
        </GridItem>

        <GridItem colSpan={8} p={8} pt={0}>
          <TrendingStories items={trendingStories} />
        </GridItem>
      </Grid>
    </Container>
  );
}
