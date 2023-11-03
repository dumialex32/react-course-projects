export default function Question({ question, index }) {
  console.log(question);
  return (
    <div className="question-container">
      <h3 className="question">{question[index].question}</h3>
    </div>
  );
}
