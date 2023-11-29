import { z } from "zod";
import { db } from "~/server/db";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  image: z.string().optional(),
  password: z.string(),
});

export type getUsersParams = z.infer<typeof signUpSchema>;

export const usersRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).query(async ({ input }) => {
    if (await db.user.findUnique({ where: { email: input.email } })) {
      return "Email already in use";
    }

    await db.user.create({ data: input });
    return "User created";
  }),
  getUsers: publicProcedure.query(async () => {
    const users = db.user.findMany();

    return users;
  }),

  getUserById: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ input }) => {
      const user = await db.user.findUnique({ where: { id: input.userId } });
      if (!user) {
        throw new Error("Error fetching trivia questions");
      }
      return user;
    }),

  editUser: protectedProcedure
    .input(z.object({ userId: z.string().min(1), currentUser: z.string() }))
    .query(async ({ input }) => {
      if (input.userId !== input.currentUser) {
        throw new Error("Error editing user");
      }
      const user = await db.user.findUnique({ where: { id: input.userId } });
      if (!user) {
        throw new Error(`Could not find user with id ${input.userId}`);
      }
      // add editing logic here to change profile picture, email etc
      return user;
    }),
});
