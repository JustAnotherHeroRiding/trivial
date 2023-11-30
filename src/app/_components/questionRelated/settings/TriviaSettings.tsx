/* import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//import type * as z from "zod";

import { getQuestionsSchema } from "~/server/api/routers/trivia";
import { TriviaSettingsForm } from "./TriviaSettingsForm";

export function TriviaSettings() {
  const form = useForm({
    resolver: zodResolver(getQuestionsSchema),
  });

  return <TriviaSettingsForm form={form} />;
}
 */