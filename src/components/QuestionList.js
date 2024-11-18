// QuestionList.js
import React from "react";

const QuestionList = ({ questions, deleteQuestion, updateCorrectAnswer }) => {
  return (
    <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h2>{question.prompt}</h2>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => updateCorrectAnswer(question.id, Number(e.target.value))}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {`Answer ${index + 1}`}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
