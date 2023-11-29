import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//import type * as z from "zod";

import {
  type getQuestionsParams,
  getQuestionsSchema,
} from "~/server/api/routers/trivia";
import { TriviaSettingsForm } from "./TriviaSettingsForm";
import { api } from "~/trpc/server";

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(getQuestionsSchema),
  });

  const formSubmit = async (formData: getQuestionsParams) => {
    "use server";
    try {
      const result = await api.trivia.getQuestions.query(formData);
      // Handle result
      console.log("Questions fetched", result);
    } catch (error) {
      // Handle error
      console.error("Fetch Failed", error);
    }
  };

  return <TriviaSettingsForm formSubmit={formSubmit} form={form} />;
}
