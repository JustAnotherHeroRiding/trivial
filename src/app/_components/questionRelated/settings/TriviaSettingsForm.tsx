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
import {
  type FieldConfig,
  fieldConfigs,
  defaultQuestionParamValues,
} from "~/utils/form-utils";
import { cn } from "../../@/lib/utils";

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
    console.log("Submitting");
    await triviaSettingsFormSubmit(data as getQuestionsParams);
  };
  const form = useForm({
    resolver: zodResolver(getQuestionsSchema),
    defaultValues: defaultQuestionParamValues,
  });

  return (
    <Card className="p-4">
      <CardTitle className="mb-4 text-2xl font-bold">Trivia Settings</CardTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-flow-dense items-center justify-center gap-4 space-y-8 sm:grid-cols-2 md:grid-cols-3">
            {fieldConfigs.map((config, index) => (
              <DynamicFormField
                key={config.name}
                config={config}
                className={index === 0 ? "mt-8" : ""}
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
};

export const DynamicFormField = ({
  config,
  className,
}: DynamicFormFieldProps) => {
  const form = useForm({
    resolver: zodResolver(getQuestionsSchema),
    defaultValues: defaultQuestionParamValues,
  });

  return (
    <FormField
      control={form.control}
      name={`defaultValues.${config.name}`}
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
