"use server"
import { type getQuestionsParams } from "~/server/api/routers/trivia";
import { api } from "~/trpc/server";

export const triviaSettingsFormSubmit = async (formData: getQuestionsParams) => {
    try {
      const result = await api.trivia.getQuestions.query(formData);
      // Handle result
      console.log("Questions fetched", result);
    } catch (error) {
      // Handle error
      console.error("Fetch Failed", error);
    }
  };