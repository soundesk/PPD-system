import { useState } from 'react';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';

export default function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizScore(null);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const handleReset = () => {
    setShowQuiz(false);
    setQuizScore(null);
  };

  return (
    <div className="min-h-screen">
      {!showQuiz && quizScore === null && (
        <>
          <Hero onStartQuiz={handleStartQuiz} />
          <InfoSection onStartQuiz={handleStartQuiz} />
        </>
      )}
      
      {showQuiz && quizScore === null && (
        <Quiz onComplete={handleQuizComplete} onBack={handleReset} />
      )}
      
      {quizScore !== null && (
        <Results score={quizScore} onReset={handleReset} />
      )}
    </div>
  );
}
