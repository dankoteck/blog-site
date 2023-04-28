import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const topicRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({});
  }),
  byId: publicProcedure.input(z.string().cuid()).query(({ ctx, input: id }) => {
    return ctx.prisma.topic.findUnique({
      where: { id },
      include: {
        authorFollowings: {
          select: {
            userId: true,
            id: true,
          },
        },
        stories: {
          include: {
            topics: true,
            author: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }),
});

export default topicRouter;
