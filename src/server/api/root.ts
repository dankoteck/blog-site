import { createTRPCRouter } from "@/server/api/trpc";
import storyRouter from "./routers/story";
import topicRouter from "./routers/topic";
import authorRouter from "./routers/author";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  story: storyRouter,
  topic: topicRouter,
  author: authorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
