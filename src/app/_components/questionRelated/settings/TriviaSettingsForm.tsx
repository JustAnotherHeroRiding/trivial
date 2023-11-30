"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../../@/components/ui/form";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { type FieldValues } from "react-hook-form";
import type { getQuestionsParams } from "~/server/api/routers/trivia";
import { triviaSettingsFormSubmit } from "~/app/api/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardTitle } from "../../@/components/ui/card";

const getQuestionsSchema = z.object({
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

export function TriviaSettingsForm() {
  const onSubmit = async (data: FieldValues) => {
    await triviaSettingsFormSubmit(data as getQuestionsParams);
  };
  const form = useForm({
    resolver: zodResolver(getQuestionsSchema),
    defaultValues: {
      limit: "",
      categories: "",
      difficulty: "",
      region: "",
      tags: "",
      types: "",
      session: "",
      preview: "",
      language: "",
    },
  });

  return (
    // We can set a component for each field
    <Card className="p-4">
      <CardTitle className="mb-4 text-2xl font-bold">Trivia Settings</CardTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            //control={{register("limit", { valueAsNumber: true })}}
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Limit</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter limit" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add similar blocks for other fields: categories, difficulty, region, etc. */}
          {/* Example for 'categories' field */}
          <FormField
            //control={register("categories")}
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter categories"
                  />
                </FormControl>
                <FormDescription className="mt-2">
                  Separate categories with commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ... Repeat for other fields as per getQuestionsSchema ... */}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
}
