import { Card } from "./@/components/ui/card";
import { Answer } from "./Answer";

export interface QuestionSingle {
  id: string;
  category: string;
  difficulty: string;
  isNiche: boolean;
  question: { text: string };
  correctAnswer: string;
  type: string;
  tags: string[];
  regions: string[];
  incorrectAnswers: string[];
}
interface QuestionCardProps {
  question: QuestionSingle;
}

export function QuestionCard({ question }: QuestionCardProps) {
    const allAnswers = [
      ...question.incorrectAnswers.map(answer => ({ text: answer, isCorrect: false })),
      { text: question.correctAnswer, isCorrect: true }
    ];
  
    allAnswers.sort(() => Math.random() - 0.5);
  
    return (
      <Card className="p-4">
        <h1>{question.question.text}</h1>
        {allAnswers.map((answer, index) => (
          <Answer key={index} text={answer.text} isCorrect={answer.isCorrect} />
        ))}
      </Card>
    );
  }
