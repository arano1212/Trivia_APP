import React, { useState, useEffect } from 'react'
import Button from './Button'

const TriviaApp = () => {
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const fetchTrivia = async () => {
    try {
      const URL = 'https://opentdb.com/api.php?amount=10'
      const response = await fetch(URL)
      if (response.ok) {
        const data = await response.json()
        setQuestions(((data.results)))
        setCurrentQuestionIndex(0)
        setScore(0)
      } else {
        console.log(`response status code: ${response.status}, 0k? ${response.ok}`)
        const alternativeData = await response.json()
        console.log(alternativeData)
      }
    } catch (error) {
      console.error('Error fetch', error)
    }
  }
  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex]
    const correctAnswer = currentQuestion.correct_answer

    if (selectedAnswer === correctAnswer) {
      setScore(score + 100)
    }

    const nextQuestionIndex = currentQuestionIndex + 1

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex)
    } else {
      setQuestions([])
    }
  }

  const resetTrivia = () => {
    fetchTrivia()
  }

  useEffect(() => {
    fetchTrivia()
  }, [])

  if (questions.length === 0) {
    return (
      <div>
        <p>SCORE: {score}</p>
        <p>No hay mas Preguntas, genera una nueva Trivia </p>
        <Button
          onClick={resetTrivia}
          text='Genera una Nueva Trivia'
        />
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  const estilo = {
    backgroundColor: 'rgb(230, 230, 230)'
  }

  return (
    <>
      <div style={estilo}>
        <p>Score: {score}</p>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.incorrect_answers.map((answer, answerIndex) => (
            <li key={answerIndex}>
              <Button onClick={() => handleAnswer(answer)} text={answer} />
            </li>
          ))}
          <li>
            <Button onClick={() => handleAnswer(currentQuestion.correct_answer)} text={currentQuestion.correct_answer} />
          </li>
        </ul>
      </div>
    </>
  )
}

export default TriviaApp
