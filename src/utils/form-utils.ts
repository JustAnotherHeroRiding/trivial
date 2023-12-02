import { type getQuestionsParams } from "~/server/api/routers/trivia";

export type FieldConfig = {
  name: keyof getQuestionsParams;
  label: string;
  placeholder: string;
  type: "text" | "number" | "select";
  options?: string[]; // for select fields
  description?: string;
};

export const defaultQuestionParamValues = {
  limit: 5,
  categories: "",
  difficulty: "",
  region: "",
  tags: "",
  types: "",
  session: "",
  preview: "",
  language: "",
};

export const fieldConfigs: FieldConfig[] = [
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
