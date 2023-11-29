"use client";

import { useState } from "react";
import { Button } from "./@/components/ui/button";

interface AnswerProps {
  text: string;
  isCorrect: boolean;
}

export function Answer({ text, isCorrect }: AnswerProps) {
  const [correctAnswerClicked, setCorrectAnswerClicked] = useState(false);

  const checkAnswer = () => {
    if (isCorrect) {
      console.log("correct");
      setCorrectAnswerClicked(true);
    } else {
      console.log("incorrect");
    }
  };
  return (
    <>
      <Button onClick={checkAnswer} variant={"default"}>
        <h1>{text}</h1>
      </Button>
      {correctAnswerClicked && (
        <h1 className="text-green-500">Correct Answer!</h1>
      )}
    </>
  );
}
