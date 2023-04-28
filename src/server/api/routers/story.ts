import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const storyRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.story.findMany({});
  }),

  // TODO: implement this later, now it's just a placeholder (getting first 5 items)
  trending: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.story.findMany({
      take: 5,
      include: {
        author: {
          include: {
            user: true,
          },
        },
        topics: true,
        // blockedByAuthor: true,
      },
    });
  }),
});

export default storyRouter;
