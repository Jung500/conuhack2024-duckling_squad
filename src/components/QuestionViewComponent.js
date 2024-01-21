import { React, useState } from 'react';

import '../styles/ViewComponent.css';

function QuestionViewComponent(props) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const answers = props.answers;

    const handleAnswerChange = (event) => {
        const selectedId = parseInt(event.target.value, 10); // Parse the value as an integer
        const selectedOption = answers.find((answer) => answer.id === selectedId);
        setSelectedAnswer(selectedOption);
    
        // Pass the selected option back to the parent component
        props.onAnswerChange(selectedOption);
      };

    return (
        <div className="QuestionViewContainer">
            <p>{props.question}</p>
            <form>
                {answers.map((answer) => (
                <div key={answer.id}>
                    <label>
                    <input
                        type="radio"
                        name="answer"
                        value={answer.id}
                        onChange={handleAnswerChange}
                        checked={selectedAnswer && selectedAnswer.id === answer.id}
                        disabled={selectedAnswer !== null}
                    />
                    {answer.name}
                    </label>
                </div>
                ))}
            </form>
        </div>
    );
}

export default QuestionViewComponent;