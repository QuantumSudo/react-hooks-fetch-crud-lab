// src/components/App.js
import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const createQuestion = (newQuestion) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]))
      .catch((err) => console.error("Error creating question:", err));
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((err) => console.error("Error deleting question:", err));
  };

  const updateCorrectAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions(
          questions.map((question) =>
            question.id === updatedQuestion.id ? updatedQuestion : question
          )
        );
      })
      .catch((err) => console.error("Error updating correct answer:", err));
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <h1>Quiz Questions</h1>
      <button onClick={toggleForm}>
        {isFormVisible ? "Cancel" : "New Question"}
      </button>

      {isFormVisible && <QuestionForm createQuestion={createQuestion} />}

      <button onClick={() => setIsFormVisible(false)}>View Questions</button>

      <QuestionList
        questions={questions}
        deleteQuestion={deleteQuestion}
        updateCorrectAnswer={updateCorrectAnswer}
      />
    </div>
  );
}

export default App;
