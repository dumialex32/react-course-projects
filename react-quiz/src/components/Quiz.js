import Question from "./Question";
import Answer from "./Answer";
import Progress from "./Progress";
import AnswerList from "./AnswerList";

export function Quiz({
  question,
  index,
  dispatch,
  answer,
  questionLength,
  points,
  maxPoints,
}) {
  return (
    <div className="quiz-container">
      <Progress
        questionLength={questionLength}
        index={index}
        answer={answer}
        points={points}
        maxPoints={maxPoints}
      />
      <Question question={question} index={index} />

      <AnswerList>
        {question[index].options.map((option, i) => (
          <Answer
            key={option}
            option={option}
            optionIndex={i}
            correctOption={question[index].correctOption}
            answer={answer}
            dispatch={dispatch}
            points={question[index].points}
          />
        ))}
      </AnswerList>
    </div>
  );
}
