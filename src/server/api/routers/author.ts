import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const authorRouter = createTRPCRouter({
  subscribeTopic: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ ctx, input: topicId }) => {
      const { id } = ctx.session.user;

      const author = await ctx.prisma.author.findUnique({
        where: { userId: id },
        include: { followingTopics: true },
      });

      if (!author) {
        throw new Error("Author not found");
      }

      const alreadyHasTopic =
        author.followingTopics.findIndex((topic) => topic.id === topicId) > -1;

      await ctx.prisma.author.update({
        where: { id: author.id },
        data: {
          followingTopics: {
            ...(alreadyHasTopic
              ? {
                  disconnect: {
                    id: topicId,
                  },
                }
              : {
                  connect: {
                    id: topicId,
                  },
                }),
          },
        },
      });

      return true;
    }),
});

export default authorRouter;
