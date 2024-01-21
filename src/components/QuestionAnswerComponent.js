import React, { useState } from 'react';
import QuestionViewComponent from './QuestionViewComponent';
import UserAnswerViewComponent from './UserAnswerViewComponent';

function QuestionAnswerComponent(props) {
  const { question, answers, person } = props;
  const [answerSelected, setAnswerSelected] = useState(null);

  const handleAnswerChange = (selectedOption) => {
    setAnswerSelected(selectedOption.name);

    props.onAnswerChange(selectedOption);
};

  return (
    <div className="QuestionAnswerContainer">
      <QuestionViewComponent
        question={question}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        selectedAnswer={person}
      />

      {answerSelected !== null && <UserAnswerViewComponent answer={answerSelected} />}
    </div>
  );
}

export default QuestionAnswerComponent;