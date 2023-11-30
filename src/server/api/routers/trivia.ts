import { z } from "zod";
import { db } from "~/server/db";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type QuestionSingle } from "~/app/_components/questionRelated/questionCard";

const url = "https://the-trivia-api.com/v2/questions";
export const getQuestionsSchema = z.object({
  limit: z.number(),
  categories: z.string().optional(),
  difficulty: z.string().optional(),
  region: z.string().optional(),
  tags: z.string().optional(),
  types: z.string().optional(),
  session: z.string().optional(),
  preview: z.string().optional(),
  language: z.string().optional(),
});


export interface GetQuestionsParams {
  limit: number;
  categories?: string;
  difficulty?: string;
  region?: string;
  tags?: string;
  types?: string;
  session?: string;
  preview?: string;
  language?: string;
}

export type getQuestionsParams = z.infer<typeof getQuestionsSchema>;


export const triviaRouter = createTRPCRouter({
  /* https://the-trivia-api.com/docs/v2/
  Api docs */
  test: publicProcedure.query(() => {
    return "Hello from trivia";
  }),
  getQuestions: publicProcedure
    .input(getQuestionsSchema)
    .query(async ({ input }) => {
      // Convert all input fields to strings
      const inputAsString = Object.fromEntries(
        Object.entries(input).map(([key, value]) => [key, String(value)]),
      );

      // Constructing the query string from the input object
      const queryParams = new URLSearchParams(inputAsString).toString();
      const requestUrl = `${url}?${queryParams}`;

      try {
        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = (await response.json()) as QuestionSingle[]; // Use await here
        const transformedData  = data.map(({ id, question, ...rest }) => ({
          externalId: id,
          questionText: question.text,
          ...rest,
        }));
        await db.question.createMany({ data: transformedData });
        return data; 
      } catch (err) {
        console.log(err);
        throw new Error("Error fetching trivia questions");
      }
    }), // Closing brace for getQuestions procedure
    
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
