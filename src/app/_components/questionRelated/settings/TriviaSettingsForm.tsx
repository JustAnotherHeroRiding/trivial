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
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";

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

type FieldConfig = {
  name: keyof getQuestionsParams;
  label: string;
  placeholder: string;
  type: "text" | "number" | "select";
  options?: string[]; // for select fields
  description?: string;
};

const fieldConfigs: FieldConfig[] = [
  {
    name: "limit",
    label: "Limit",
    placeholder: "Enter limit",
    type: "number",
    description: "The maximum number of questions.",
  },
  {
    name: "categories",
    label: "Categories",
    placeholder: "Enter categories",
    type: "text",
    description: "Separate categories with commas.",
  },
  {
    name: "difficulty",
    label: "Difficulty",
    placeholder: "Enter Difficulty",
    type: "select",
    options: ["Easy", "Medium", "Hard"],
    description: "Easy, Medium or Hard",
  },
  {
    name: "region",
    label: "Region",
    placeholder: "Enter region",
    type: "text",
    description: "Specify the region for the questions.",
  },
  {
    name: "tags",
    label: "Tags",
    placeholder: "Enter tags",
    type: "text",
    description: "Separate tags with commas.",
  },
  {
    name: "types",
    label: "Types",
    placeholder: "Enter types",
    type: "text",
    description: "Specify the types of questions.",
  },
  {
    name: "session",
    label: "Session",
    placeholder: "Enter session",
    type: "text",
    description: "Session identifier for the question set.",
  },
  {
    name: "preview",
    label: "Preview",
    placeholder: "Enter preview",
    type: "text",
    description: "Specify if a preview is needed.",
  },
  {
    name: "language",
    label: "Language",
    placeholder: "Enter language",
    type: "text",
    description: "Specify the language for the questions.",
  },
];
// ... Add other field configurations as per your schema

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
          {fieldConfigs.map((config) => (
            <DynamicFormField key={config.name} config={config} />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
}

type DynamicFormFieldProps = {
  config: FieldConfig;
};

export const DynamicFormField = ({ config }: DynamicFormFieldProps) => {
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
    <FormField
      control={form.control}
      name={config.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{config.label}</FormLabel>
          <FormControl>
            {config.type === "select" ? (
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={config.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {config.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                {...field}
                type={config.type}
                placeholder={config.placeholder}
              />
            )}
          </FormControl>
          <FormDescription className="mt-2">
            {config.description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
