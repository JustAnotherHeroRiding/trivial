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
import { type FieldValues, type Control } from "react-hook-form";
import type { getQuestionsParams } from "~/server/api/routers/trivia";
import { triviaSettingsFormSubmit } from "~/actions";
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
import {
  type FieldConfig,
  fieldConfigs,
  defaultQuestionParamValues,
} from "~/utils/form-utils";
import { cn } from "../../@/lib/utils";
import { useToast } from "../../@/components/ui/use-toast";

const getQuestionsSchema = z.object({
  limit: z.number().optional(),
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
  const { toast } = useToast();

  async function onSubmit(
    formData: FieldValues,
    event: React.BaseSyntheticEvent | undefined,
  ) {
    if (event) {
      event.preventDefault();
    }
    toast({
      className:
        "shadow-md flex flex-col w-fit items-center justify-center bg-zinc-900 dark:bg-zinc-800 border border-zinc-300",
      title: "Form Submitted",
      description: "Preparing your questions...",
    });
    // Do i really need to fetch the questions here? I can just pass the query params
    // The data is not being passed correctly
     const fetchedQuestions = await triviaSettingsFormSubmit(
      formData as getQuestionsParams,
    ); 
    // So the form is now working and correctly passing the url props
    // However the trpc call needs some worm I dont think it's passing the url queries correctly
    console.log(formData, "Query params from component");
    console.log(fetchedQuestions, "Fetched questions from component");
  }

  const defaultValues: Partial<getQuestionsParams> = defaultQuestionParamValues;

  const form = useForm({
    resolver: zodResolver(getQuestionsSchema),
    defaultValues,
  });

  return (
    <Card className="p-4 shadow-md dark:border-zinc-400 dark:shadow-gray-600">
      <CardTitle className="mb-4 text-2xl font-bold">Trivia Settings</CardTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-flow-dense items-center justify-center gap-4 space-y-8 sm:grid-cols-2 md:grid-cols-3">
            {fieldConfigs.map((config, index) => (
              <DynamicFormField
                key={config.name}
                config={config}
                className={index === 0 ? "mt-8" : ""}
                control={form.control}
              />
            ))}
          </div>

          <Button type="submit" className="ml-auto">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}

type DynamicFormFieldProps = {
  config: FieldConfig;
  className: string | undefined;
  control: Control<FieldValues>;
};

export const DynamicFormField = ({
  config,
  className,
  control,
}: DynamicFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={config.name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>{config.label}</FormLabel>
          <FormControl>
            {config.type === "select" ? (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value as string}
              >
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
