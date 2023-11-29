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
import Input from "postcss/lib/input";
import {
  FormProvider,
  useFormContext,
  type UseFormReturn,
  type FieldValues
} from "react-hook-form";
import type * as z from "zod";
import { type getQuestionsSchema } from "~/server/api/routers/trivia";

interface TriviaSettingsFormProps {
  formSubmit: (formData: z.infer<typeof getQuestionsSchema>) => Promise<void>;
  form: UseFormReturn<FieldValues, undefined>;
}
export function TriviaSettingsForm({ formSubmit }: TriviaSettingsFormProps) {
  const { register, handleSubmit, formState: { errors } } = useFormContext();

  const onSubmit = async (data) => {
    await formSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={register("limit", { valueAsNumber: true })}
        name="limit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Limit</FormLabel>
            <FormControl>
              <input {...field} type="number" placeholder="Enter limit" />
            </FormControl>
            <FormMessage>{errors.limit?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Add similar blocks for other fields: categories, difficulty, region, etc. */}
      {/* Example for 'categories' field */}
      <FormField
        control={register("categories")}
        name="categories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categories</FormLabel>
            <FormControl>
              <input {...field} type="text" placeholder="Enter categories" />
            </FormControl>
            <FormMessage>{errors.categories?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* ... Repeat for other fields as per getQuestionsSchema ... */}

      <Button type="submit">Submit</Button>
    </Form>
  );
}