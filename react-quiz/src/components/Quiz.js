import Question from "./Question";
import Answer from "./Answer";

export function Quiz({ question, index, dispatch, answer }) {
  return (
    <div className="quiz-container">
      <Question question={question} index={index} />

      <AnswerList>
        {question[index].options.map((option, i) => (
          <Answer
            key={option}
            correctOption={question[index].correctOption}
            dispatch={dispatch}
            option={option}
            answerIndex={i}
            answer={answer}
          />
        ))}
      </AnswerList>
    </div>
  );
}

function AnswerList({ children }) {
  return <ul className="answer-list">{children}</ul>;
}
